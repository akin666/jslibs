/**
 * Created by akin on 31/08/15.
 */
define(["./simulation"], function (Simulation) {
    function Application(config){
        Simulation.call( this , config );

        this.width = this.element.attr("data-width");
        this.height = this.element.attr("data-height");

        // 1) any live cell with fewer than 2 neighbours dies.
        // 2) any live cell with 2 or 3 neighbours lives on
        // 3) any live cell with more than 3 neighbours dies
        // 4) any dead cell with 3 neighbours becomes live cell

        // start simulation right away...
        this.update();

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
