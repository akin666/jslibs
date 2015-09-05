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

        if( target.onTouch != null  ) {
            element.on("touchstart", function (event) {
                    //event.stopPropagation();
                    target.onTouch({
                        state: "start",
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("touchend", function (event) {
                    target.onTouch({
                        state: "end",
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("touchmove", function (event) {
                    target.onTouch({
                        state: "move",
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
        }
        if( target.onTap != null  ) {
            element.on("tap", function (event) {
                    target.onTap({
                        hold: false,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("taphold", function (event) {
                    target.onTap({
                        hold: true,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
        }
        if( target.onSwipe != null  ) {
            element.on("swipe", function (event) {
                    target.onSwipe({
                        direction: null,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("swipeleft", function (event) {
                    target.onSwipe({
                        direction: "left",
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("swiperight", function (event) {
                    target.onSwipe({
                        direction: "right",
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
        }
        if( target.onScroll != null  ) {
            element.on("scrollstart", function(event) {
                    target.onScroll({
                        state: "start",
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("scrollstop", function (event) {
                    target.onScroll({
                        state: "end",
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
        }
    }

    return Input;
});
