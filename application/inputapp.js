/**
 * Created by akin on 02/09/15.
 */
define(["./simulation","input"], function (Simulation, Input) {
    function Application(config){
        Simulation.call( this , config );

        this.width = this.element.width();
        this.height = this.element.height();

        this.canvas = $('<canvas/>');

        this.background = "#AADDFF";

        this.tapColor= "#6699FF";
        this.tapHoldColor= "#FF9966";
        this.touchColor= "#66FF66";

        this.mouseColor = [
            "#00AA99",
            "#00CCBB",
            "#00EEDD",
            "#00FFFF",
        ];

        var canvas = this.canvas[0];
        canvas.width  = this.width;
        canvas.height =  this.height;

        this.element.append(this.canvas);
        this.clearCanvas();

        this.touchInput = new Input.Touch({
            element: this.canvas,
            target: this
        });

        this.mouseInput = new Input.Mouse({
            element: this.canvas,
            target: this
        });

        return this;
    }

    // specify inheritance
    Application.prototype = Object.create( Simulation.prototype );

    Application.prototype.pointerMove = function(config) {
        var canvas = this.canvas[0];
        var ctx = canvas.getContext("2d");

        if (config.button == null || config.button.length > 0 ) {
            ctx.fillStyle = this.mouseColor[config.button[0]];
            ctx.fillRect(
                config.x - 1,
                config.y - 1,
                2,
                2);
        }
    }

    Application.prototype.clearCanvas = function() {
        var canvas = this.canvas[0];
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = this.background;

        ctx.fillRect(
            0,
            0,
            this.width  ,
            this.height );
    }

    Application.prototype.logicUpdate = function(config){
    }

    Application.prototype.drawUpdate = function(config){
    }

    return Application;
});
