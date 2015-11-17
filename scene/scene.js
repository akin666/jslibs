/**
 * Created by akin on 22/09/15.
 */
define(["jquery","three"], function ($,THREE) {
    function Scene(config){
        this.self = {
            target: null,
            deferred: $.Deferred()
        };
        this.init(config);
        return this;
    }

    // On scene reconstruct, emit event.
    Scene.prototype.construct = function() {
        var self = this.self;
        return self.deferred.promise();
    }

    return Scene;
});
