/**
 * Created by akin on 22/09/15.
 */
"use strict";
define([
    "jquery",
    "three"],
    function (
        $,
        THREE) {
        var deferVar = Symbol();
        var targetVar = Symbol();
        class Camera {
            constructor(config) {
                this[deferVar] = $.Deferred();
                this[targetVar] = null;

                this.init(config);
            }

            // On ViewTarget resize, emit event.
            construct() {
                var self = this.self;
                return self.deferred.promise();
            }
        }
        return Camera;
    });
