/**
 * Created by akin on 1.9.2015.
 */
"use strict";
define(
    function () {
        class Time {
            constructor(config) {
                this.reset();
            }

            reset() {
                this.time = new Date();
                this.old = this.time;
            }

            apply() {
                this.old = this.time;
                this.time = new Date();
            }

            getDelta() {
                return this.time - this.old;
            }
        }
        return Time;
    });
