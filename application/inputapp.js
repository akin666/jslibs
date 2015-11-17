/**
 * Created by akin on 02/09/15.
 */
"use strict";
define([
    "./simulation",
    "input"],
    function (
        Simulation,
        Input) {
        class Application extends Simulation {
            constructor(config) {
                super(config);

                this.width = this.element.width();
                this.height = this.element.height();

                this.canvas = $('<canvas/>');

                this.background = "#AADDFF";

                this.tapColor = "#6699FF";
                this.tapHoldColor = "#FF9966";
                this.touchColor = "#66FF66";

                this.mouseColor = [
                    "#00AA99",
                    "#00CCBB",
                    "#00EEDD",
                    "#00FFFF",
                ];

                var canvas = this.canvas[0];
                canvas.width = this.width;
                canvas.height = this.height;

                this.element.append(this.canvas);
                this.clearCanvas();

                this.touchInput = new Input.Touch({
                    element: this.canvas,
                    target: this
                });
                this.mouseInput = new Input.Mouse({
                    element: this.canvas,
                    target: this
                });
                this.keyInput = new Input.Keyboard({
                    element: this.canvas,
                    target: this
                });
            }

            pointerClick(config) {
                this.keyInput.bind();
            }

            pointerMove(config) {
                var canvas = this.canvas[0];
                var ctx = canvas.getContext("2d");

                if (config.button == null || config.button.length > 0) {
                    ctx.fillStyle = this.mouseColor[config.button[0]];
                    ctx.fillRect(
                        config.x - 1,
                        config.y - 1,
                        2,
                        2);
                }
            }

            pointerAction(config) {
                if (config.type == "end") {
                    this.keyInput.unbind();
                }
                else if (config.type == "cancel") {
                    this.keyInput.unbind();
                }
                else if (config.type == "continue") {
                    this.keyInput.bind();
                }
            }

            clearCanvas() {
                var canvas = this.canvas[0];
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = this.background;

                ctx.fillRect(
                    0,
                    0,
                    this.width,
                    this.height);
            }

            keyPress(config) {
                console.log("InputApp: key: " + config.key + " code: " + config.code);
            }

            logicUpdate(config) {
            }

            drawUpdate(config) {
            }
        }

        return Application;
    });
