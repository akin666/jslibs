/**
 * Created by akin on 02/09/15.
 */
define(["./simulation"], function (Simulation) {
    function Application(config){
        Simulation.call( this , config );

        this.width = this.element.width();
        this.height = this.element.height();

        this.canvas = $('<canvas/>');

        this.background = "#AADDFF";
        this.color= "#6699FF";

        var canvas = this.canvas[0];
        canvas.width  = this.width;
        canvas.height =  this.height;

        this.element.append(this.canvas);
        this.clearCanvas();

        this.canvas.on("tap", this.onTap.bind(this) );

        return this;
    }

    // specify inheritance
    Application.prototype = Object.create( Simulation.prototype );

    Application.prototype.onTap = function(config) {
        var canvas = this.canvas[0];
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = this.color;

        ctx.fillRect(
            10,
            10,
            5  ,
            5 );
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
