/**
 * Created by akin on 02/09/15.
 */
define(["./simulation"], function (Simulation) {
    function Application(config){
        Simulation.call( this , config );

        return this;
    }

    // specify inheritance
    Application.prototype = Object.create( Simulation.prototype );

    Application.prototype.logicUpdate = function(config){
    }

    Application.prototype.drawUpdate = function(config){
    }

    return Application;
});
