/**
 * Created by akin on 02/09/15.
 */
define(["./simulation","jquery","jquery-mobile"], function (Simulation) {
    function Application(config){
        Simulation.call( this , config );

        this.width = this.element.width();
        this.height = this.element.height();

        this.canvas = $('<canvas/>');

        this.background = "#AADDFF";
        this.color= "#6699FF";
        this.err= "#FF9966";

        var canvas = this.canvas[0];
        canvas.width  = this.width;
        canvas.height =  this.height;

        this.element.append(this.canvas);
        this.clearCanvas();

        var that = this;
        this.canvas.on("tap", function(event) {
                if( that != null ) {
                    that.onTap({
                        hold: false,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            }
        );
        this.canvas.on("taphold", function(event) {
                if( that != null ) {
                    that.onTap({
                        hold: true,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            }
        );

        return this;
    }

    // specify inheritance
    Application.prototype = Object.create( Simulation.prototype );

    Application.prototype.onTap = function(config) {
        var canvas = this.canvas[0];
        var ctx = canvas.getContext("2d");

        if( config.hold ) {
            ctx.fillStyle = this.err;
            ctx.fillRect(
                config.x - 5,
                config.y - 5,
                10  ,
                10 );
        }
        else {
            ctx.fillStyle = this.color;
            ctx.fillRect(
                config.x - 3,
                config.y - 3,
                6  ,
                6 );
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
