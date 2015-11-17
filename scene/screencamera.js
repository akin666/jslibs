/**
 * Created by akin on 22/09/15.
 *
 * special case of camera..
 * Camera renders to film,
 * ScreenCamera renders to screen.
 */
define(["jquery","three"], function ($,THREE) {
    function Camera(config){
        this.self = {
            target: null,
            deferred: $.Deferred()
        };
        this.init(config);
        return this;
    }

    // On ViewTarget resize, emit event.
    Camera.prototype.construct = function() {
        var self = this.self;
        return self.deferred.promise();
    }

    return Camera;
});
