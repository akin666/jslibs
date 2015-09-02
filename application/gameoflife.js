/**
 * Created by akin on 31/08/15.
 */
define(["./simulation", "system"], function (Simulation, System) {
    function Application(config){
        Simulation.call( this , config );

        this.width = parseInt(this.element.attr("data-width"));
        this.height = parseInt(this.element.attr("data-height"));
        this.cellSize = 4.1;

        this.remaining = 0.0;
        this.spending = 100;

        // 2) any live cell with 2 or 3 neighbours lives on
        // 3) any live cell with more than 3 neighbours dies
        // 4) any dead cell with 3 neighbours becomes live cell

        this.canvas = $('<canvas/>');

        var canvas = this.canvas[0];
        canvas.width  = this.width * this.cellSize;
        canvas.height =  this.height * this.cellSize;

        this.element.append(this.canvas);

        this.a = new System.Array2D({
            width: this.width,
            height: this.height
        });
        this.b = new System.Array2D({
            width: this.width,
            height: this.height
        });

        this.array = this.a;

        this.randomize();

        // start simulation right away...
        this.update();

        return this;
    }

    // specify inheritance
    Application.prototype = Object.create( Simulation.prototype );

    Application.prototype.randomize = function() {
        var raw = this.array.raw();
        for( var i = 0 ; i < raw.length ; ++i ) {
            raw[i] = (Math.random() > 0.66 ? 1.0 : 0.0 );
        }
    }

    Application.prototype.simulate = function() {
        var old = this.array;
        if( old === this.a ) {
            this.array = this.b;
        }
        else {
            this.array = this.a;
        }

        for( var y = 0 ; y < this.height ; ++y ) {
            for( var x = 0 ; x < this.width ; ++x ) {
                var neightbours =
                    old.cell(x -1 , y - 1 ) +
                    old.cell(x -1 , y ) +
                    old.cell(x -1 , y + 1 ) +
                    old.cell(x    , y - 1 ) +
                    old.cell(x    , y + 1 ) +
                    old.cell(x +1 , y - 1) +
                    old.cell(x +1 , y ) +
                    old.cell(x +1 , y + 1);
                var self = old.cell(x, y);

                var value = 0.0;

                if( self === 1.0 ) {
                    // 1) any live cell with fewer than 2 neighbours dies.
                    // 3) any live cell with more than 3 neighbours dies
                    if (neightbours < 2.0 || neightbours > 3.0) {
                        value = 0.0;
                    }
                    // 2) any live cell with 2 or 3 neighbours lives on
                    else if (neightbours <= 3.0) {
                        value = 1.0;
                    }
                }
                // 4) any dead cell with 3 neighbours becomes live cell
                else if( neightbours === 3.0 ) {
                    value = 1.0;
                }

                this.array.cell(x,y,value);
            }
        }
    }

    Application.prototype.logicUpdate = function(config){
        this.remaining += config.delta;

        for( ; this.remaining > this.spending ; this.remaining -= this.spending ) {
            this.simulate();
        }
    }

    Application.prototype.drawUpdate = function(config){
        var canvas = this.canvas[0];

        var ctx = canvas.getContext("2d");

        var dark = "#223344";
        var white= "#AAAAFF";

        var tx,ty;

        for( var y = 0 ; y < this.height ; ++y ) {
            ty = y * this.cellSize;
            for( var x = 0 ; x < this.width ; ++x ) {
                tx = x * this.cellSize;

                ctx.fillStyle = this.array.cell(x,y) == 0 ? dark : white;

                ctx.fillRect(
                    tx,
                    ty,
                    this.cellSize  ,
                    this.cellSize );
            }
        }
    }

    return Application;
});
