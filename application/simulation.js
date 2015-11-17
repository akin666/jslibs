/**
 * Created by akin on 31/08/15.
 */
"use strict";
define([
    "system"],
    function (
        System) {
        class Application {
            constructor(config) {
                this.element = config.element;

                this.time = new System.Time();
                this.updateID = null;

                this.maxSimulationTime = 1000;
            }

            logicUpdate(config) {
            }

            drawUpdate(config) {
            }

            skippedUpdate(config) {
                console.log("Skipped " + config.delta + " seconds.");
            }

            update() {
                this.updateID = requestAnimationFrame(this.update.bind(this));
                this.time.apply();

                var delta = this.time.getDelta();
                if (delta > this.maxSimulationTime) {
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
                this.drawUpdate({});
            }

            exit() {
                cancelAnimationFrame(this.updateID);
                this.updateID = null;
            }
        }

        return Application;
    });
