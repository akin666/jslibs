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


        var canvas = this.canvas[0];
        canvas.width  = this.width;
        canvas.height =  this.height;

        this.element.append(this.canvas);
        this.clearCanvas();

        this.touchInput = new Input.Touch({
            element: this.canvas,
            target: this
        });

        return this;
    }

    // specify inheritance
    Application.prototype = Object.create( Simulation.prototype );

    Application.prototype.onTap = function(config) {
        var canvas = this.canvas[0];
        var ctx = canvas.getContext("2d");

        if( config.hold ) {
            ctx.fillStyle = this.tapHoldColor;
            ctx.fillRect(
                config.x - 5,
                config.y - 5,
                10  ,
                10 );
        }
        else {
            ctx.fillStyle = this.tapColor;
            ctx.fillRect(
                config.x - 3,
                config.y - 3,
                6  ,
                6 );
        }
    }

    Application.prototype.onSwipe = function(config) {
    }

    Application.prototype.onScroll = function(config) {
    }

    Application.prototype.onTouch = function(config) {
        var canvas = this.canvas[0];
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = this.touchColor;
        ctx.fillRect(
            config.x - 3,
            config.y - 3,
            6  ,
            6 );
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
