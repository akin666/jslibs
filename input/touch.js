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

                this.bind();
            }

            bind() {
                this.apply(this.element);
            }

            bind() {
                this.apply(this.element);
            }

            unbind() {
                if (this.bound == null) {
                    return;
                }
                this.bound.off("tap");
                this.bound.off("taphold");
                this.bound.off("touchstart");
                this.bound.off("touchend");
                this.bound.off("touchmove");
                this.bound.off("swipe");
                this.bound.off("swipeleft");
                this.bound.off("swiperight");
                this.bound.off("scrollstart");
                this.bound.off("scrollstop");
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

                element.off("tap");
                element.off("taphold");
                element.off("touchstart");
                element.off("touchend");
                element.off("touchmove");
                element.off("swipe");
                element.off("swipeleft");
                element.off("swiperight");
                element.off("scrollstart");
                element.off("scrollstop");

                if (target.pointerAction != null) {
                    element.on("touchstart", function (event) {
                            //event.stopPropagation();
                            target.pointerAction({
                                type: "start",
                                id: 1,
                                x: event.offsetX,
                                y: event.offsetY,
                            });
                        }
                    );

                    element.on("touchend", function (event) {
                            target.pointerAction({
                                type: "end",
                                id: 1,
                                x: event.offsetX,
                                y: event.offsetY,
                            });
                        }
                    );
                }
                if (target.pointerMove != null) {
                    element.on("touchmove", function (event) {
                            target.pointerMove({
                                type: "move",
                                id: 1,
                                button: null,
                                x: event.offsetX,
                                y: event.offsetY,
                            });
                        }
                    );
                }
                if (target.pointerClick != null) {
                    element.on("tap", function (event) {
                            event.preventDefault();
                            event.stopPropagation();

                            target.pointerClick({
                                button: null,
                                hold: false,
                                double: false,
                                x: event.offsetX,
                                y: event.offsetY,
                            });
                        }
                    );
                    element.on("taphold", function (event) {
                            event.preventDefault();
                            event.stopPropagation();

                            target.pointerClick({
                                button: null,
                                hold: true,
                                double: false,
                                x: event.offsetX,
                                y: event.offsetY,
                            });
                        }
                    );
                }
                if (target.pointerSwipe != null) {
                    element.on("swipe", function (event) {
                            target.pointerSwipe({
                                direction: null,
                                x: event.offsetX,
                                y: event.offsetY,
                            });
                        }
                    );
                    element.on("swipeleft", function (event) {
                            target.pointerSwipe({
                                direction: -1.0,
                                x: event.offsetX,
                                y: event.offsetY,
                            });
                        }
                    );
                    element.on("swiperight", function (event) {
                            target.pointerSwipe({
                                direction: 1.0,
                                x: event.offsetX,
                                y: event.offsetY,
                            });
                        }
                    );
                }
                if (target.pointerScroll != null) {
                    element.on("scrollstart", function (event) {
                            target.pointerScroll({
                                type: "start",
                                x: event.offsetX,
                                y: event.offsetY,
                            });
                        }
                    );
                    element.on("scrollstop", function (event) {
                            target.pointerScroll({
                                type: "end",
                                x: event.offsetX,
                                y: event.offsetY,
                            });
                        }
                    );
                }
            }
        }
        return Input;
    });
