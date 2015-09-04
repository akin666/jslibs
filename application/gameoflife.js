/**
 * Created by akin on 31/08/15.
 */
define(["./simulation", "system"], function (Simulation, System) {
    function Application(config){
        Simulation.call( this , config );

        this.width = parseInt(this.element.attr("data-width"));
        this.height = parseInt(this.element.attr("data-height"));
        this.cellSize = 3.0;

        this.remaining = 0.0;
        this.spending = 100;

        this.off = "#223344";
        this.on= "#AAAAFF";

        // 1) any live cell with fewer than 2 neighbours dies.
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
        var araw = this.a.raw();
        var braw = this.b.raw();
        for( var i = 0 ; i < araw.length ; ++i ) {
            var tt = Math.random() > 0.66;

            araw[i] = (tt ? 1.0 : 0.0 );
            braw[i] = (tt ? 0.0 : 1.0 );
        }
        // Hack, im too lazy to do the 4 special corners..
        var max = this.height * this.width;
        araw[0] = braw[0];
        araw[this.width -1] = braw[this.width -1];
        araw[max - this.width] = braw[max - this.width];
        araw[max - 1] = braw[max - 1];
    }

    var simuFunction = function(self , neighbours) {
        if( self === 1.0 ) {
            // 1) any live cell with fewer than 2 neighbours dies.
            // 3) any live cell with more than 3 neighbours dies
            if (neighbours >= 2.0 && neighbours <= 3.0) {
                return 1.0;
            }
        }
        // 4) any dead cell with 3 neighbours becomes live cell
        else {
            if( neighbours === 3.0 ) {
                return 1.0;
            }
        }
        return 0.0;
    }

    var calculateNeighbours = function(arr, top, center, bottom , x) {
        return  arr[ top    + x - 1] +
                arr[ center + x - 1] +
                arr[ bottom + x - 1] +
                arr[ top    + x    ] +
                arr[ bottom + x    ] +
                arr[ top    + x + 1] +
                arr[ center + x + 1] +
                arr[ bottom + x + 1];
    }

    Application.prototype.simulate = function() {
        var old = this.array;
        if( old === this.a ) {
            this.array = this.b;
        }
        else {
            this.array = this.a;
        }

        var prev = old.raw();
        var current = this.array.raw();

        // simple square, no portal logics..
        for( var y = 1 ; y < (this.height-1) ; ++y ) {
            var top = (y-1) * this.width;
            var center = y * this.width;
            var bottom = (y+1) * this.width;
            for( var x = 1 ; x < (this.width-1) ; ++x ) {
                var neighbours = calculateNeighbours(prev , top , center , bottom , x);

                current[ center + x ] = simuFunction(prev[ center + x ], neighbours);
            }
        }

        var first = 0;
        var second = this.width;
        var last = (this.height - 1) * this.width;
        var secondlast = (this.height - 2) * this.width;
        for( var x = 1 ; x < (this.width-1) ; ++x ) {
            // top bottom
            var topNeighbours = calculateNeighbours(prev , last , first , second , x);
            var bottomNeighbours = calculateNeighbours(prev , secondlast , last , first , x);

            current[ first + x ] = simuFunction(prev[ first + x ], topNeighbours);
            current[ last + x ] = simuFunction(prev[ last + x ], bottomNeighbours);
        }

        var left = 0;
        var right = 0;
        for( var y = 1 ; y < (this.height-1) ; ++y ) {
            // left right
            left = y * this.width;
            right = left + (this.width - 1);


            // AB...C
            // DE...F
            // GH...I
            // ......
            //
            // A+B+C + E+F + G+H+I
            var leftNeighbours = prev[ left - this.width ] + prev[ left - this.width + 1 ] + prev[ left - 1 ] +
                    prev[ left + 1 ] + prev[ left + this.width - 1 ] +
                    prev[ left + this.width ] + prev[ left + this.width + 1 ] + prev[ left + this.width + this.width - 1];

            // C...BA
            // F...ED
            // I...HG
            // ......
            //
            // A+B+C + E+F + G+H+I
            var rightNeighbours = prev[ right - this.width ] + prev[ right - this.width - 1 ] + prev[ right - this.width - this.width + 1 ] +
                prev[ right - 1 ] + prev[ right - this.width + 1 ] +
                prev[ right + this.width ] + prev[ right + this.width - 1 ] + prev[ right + 1];

            current[ left ] = simuFunction(prev[ left ], leftNeighbours);
            current[ right ] = simuFunction(prev[ right ], rightNeighbours);
        }

        // 4 corners special..
    }

    Application.prototype.logicUpdate = function(config){
        this.remaining += config.ms;

        for( ; this.remaining > this.spending ; this.remaining -= this.spending ) {
            this.simulate();
        }
    }

    Application.prototype.clearCanvas = function() {
        var canvas = this.canvas[0];
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = current[y * this.width + x] == 0 ? this.off : this.on;

        ctx.fillRect(
            tx,
            ty,
            this.cellSize  ,
            this.cellSize );
    }


    Application.prototype.drawUpdate = function(config){
        var canvas = this.canvas[0];

        var ctx = canvas.getContext("2d");

        var tx,ty;

        var old = this.a.raw();
        if( this.array === this.a ) {
            old = this.b.raw();
        }

        var current = this.array.raw();
        for( var y = 0 ; y < this.height ; ++y ) {
            ty = y * this.cellSize;
            for( var x = 0 ; x < this.width ; ++x ) {
                tx = x * this.cellSize;

                var pos = y * this.width + x;

                var val1 = current[pos];
                var val2 = old[pos];

                // optimization.. draw only change.
                // no change?
                if( val1 === val2 ) {
                    continue;
                }

                ctx.fillStyle = current[y * this.width + x] == 0 ? this.off : this.on;

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
