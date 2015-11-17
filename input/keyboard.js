/**
 * Created by akin on 5.9.2015.
 */
"use strict";
define([
    "jquery",
    "jquery-mobile"],
    function (
        $) {
        class Input {
            constructor(config) {
                this.setup(config);
            }

            setup(config) {
                if (config == null) {
                    return;
                }
                this.element = config.element;
                this.target = config.target;
            }

            bind() {
                this.apply($(document));
            }

            unbind() {
                if (this.bound == null) {
                    return;
                }
                this.bound.off("click");
                this.bound.off("dblclick");
                this.bound.off("hover");
                this.bound.off("mousemove");
                this.bound.off("mouseout");
                this.bound.off("mouseleave");
                this.bound.off("mouseenter");
                this.bound.off("mouseover");
                this.bound.off("mousedown");
                this.bound.off("mouseup");
                this.bound = null;
            }

            apply(element) {
                var target = this.target;
                this.unbind();

                if (element == null) {
                    return;
                }

                if (target == null) {
                    return;
                }
                this.bound = element;

                // pry off previous bindings..
                element.off("keydown");
                element.off("keyup");
                element.off("keypress");

                if (target.keyAction != null) {
                    element.on("keydown", function (event) {
                            target.keyAction({
                                down: 1.0,
                                key: String.fromCharCode(event.keyCode),
                                code: event.keyCode,
                                time: event.timeStamp,
                                state: {}
                            });
                        }
                    );
                    element.on("keyup", function (event) {
                            target.keyAction({
                                down: 0.0,
                                key: String.fromCharCode(event.keyCode),
                                code: event.keyCode,
                                time: event.timeStamp,
                                state: {}
                            });
                        }
                    );
                }
                if (target.keyPress != null) {
                    element.on("keypress", function (event) {
                            target.keyPress({
                                key: String.fromCharCode(event.keyCode),
                                code: event.keyCode,
                                time: event.timeStamp,
                                state: {}
                            });
                        }
                    );
                }
            }
        }

        return Input;
    });
