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
        if( target == null ) {
            element.off("click");
            element.off("dblclick");
            element.off("hover");
            element.off("mousemove");
            element.off("mouseout");
            element.off("mouseleave");
            element.off("mouseenter");
            element.off("mouseover");
            element.off("mousedown");
            element.off("mouseup");
            return;
        }

        if( target.onClick != null  ) {
            element.on("click", function (event) {
                    target.onClick({
                        button: event.which,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("dblclick", function (event) {
                    target.onClick({
                        button: event.which,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
        }
        if( target.onMouse != null  ) {
            /*
            element.on("hover", function (event) {
                    target.onMouse({
                        type: "move",
                        down: false,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            */
            element.on("mousemove", function (event) {
                    target.onMouse({
                        type: "move",
                        button: event.which,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("mouseout", function (event) {
                    target.onMouse({
                        type: "out",
                        button: event.which,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("mouseleave", function (event) {
                    target.onMouse({
                        type: "leave",
                        button: event.which,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("mouseenter", function (event) {
                    target.onMouse({
                        type: "enter",
                        button: event.which,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("mouseover", function (event) {
                    target.onMouse({
                        type: "over",
                        button: event.which,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("mousedown", function (event) {
                    target.onMouse({
                        type: "down",
                        button: event.which,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("mouseup", function (event) {
                    target.onMouse({
                        type: "up",
                        button: event.which,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
        }
    }

    return Input;
});