/**
 * Created by akin on 31/08/15.
 */
define(["system"], function (System) {
    function Application(config){
        this.element = config.element;

        this.time = new System.Time();
        this.updateID = null;

        this.maxSimulationTime = 1000;

        return this;
    }

    Application.prototype.logicUpdate = function(config){
    }

    Application.prototype.drawUpdate = function(config){
    }

    Application.prototype.skippedUpdate = function(config){
        console.log("Skipped " + config.delta + " seconds.")
    }

    Application.prototype.update = function() {
        this.updateID = requestAnimationFrame( this.update.bind(this) );
        this.time.apply();

        var delta = this.time.getDelta();
        if( delta > this.maxSimulationTime ) {
            this.skippedUpdate({
                delta: delta * 0.001,
                ms: delta
            });
            delta = 0.0;
        }

        this.logicUpdate({
            delta: delta * 0.001,
            ms: delta
        });
        this.drawUpdate({
        });
    }

    Application.prototype.exit = function() {
        cancelAnimationFrame(this.updateID);
        this.updateID = null;
    }

    return Application;
});
