/**
 * Created by akin on 5.9.2015.
 */
define(["jquery","jquery-mobile"], function ($) {
    function Input(config){
        this.setup(config);
        return this;
    }

    Input.prototype.setup = function(config) {
        if( config == null ) {
            return;
        }
        this.element = config.element;
        this.target = config.target;

        var element = this.element;
        var target = this.target;
        if (target == null) {
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
            return;
        }

        if( target.pointerAction != null  ) {
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
        if( target.pointerMove != null  ) {
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
        if( target.pointerClick != null  ) {
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
        if( target.pointerSwipe != null  ) {
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
        if( target.pointerScroll != null  ) {
            element.on("scrollstart", function(event) {
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

    return Input;
});
