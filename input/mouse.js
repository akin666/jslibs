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

        this.bind();
    }

    Input.prototype.bind = function() {
        this.apply(this.element);
    }

    Input.prototype.unbind = function() {
        if( this.bound == null ) {
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

    Input.prototype.apply = function(element) {
        var target = this.target;
        this.unbind();

        if( element == null ) {
            return;
        }

        if (target == null) {
            return;
        }
        this.bound = element;

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

        if( target.pointerClick != null  ) {
            element.on("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    target.pointerClick({
                        button: event.which,
                        hold: false,
                        double: false,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("dblclick", function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    target.pointerClick({
                        button: event.which,
                        hold: false,
                        double: true,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
        }
        if( target.pointerButton != null  ) {
            element.on("mousedown", function (event) {
                    target.pointerButton({
                        down: 1.0,
                        button: event.which,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("mouseup", function (event) {
                    target.pointerButton({
                        down: 0.0,
                        button: event.which,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
        }
        if( target.pointerAction != null ) {
            element.on("mouseout", function (event) {
                    target.pointerAction({
                        type: "cancel",
                        id: 1,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("mouseleave", function (event) {
                    target.pointerAction({
                        type: "cancel",
                        id: 1,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("mouseenter", function (event) {
                    target.pointerAction({
                        type: "continue",
                        id: 1,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
        }
        if( target.pointerMove != null  ) {
            element.on("hover", function (event) {
                    var buttons = [];
                    if( event.which != 0 ) {
                        buttons.push( event.which );
                    }
                    target.pointerHover({
                        type: "hover",
                        id: 1,
                        button: buttons,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
            element.on("mousemove", function (event) {
                    var buttons = [];
                    if( event.which != 0 ) {
                        buttons.push( event.which );
                    }
                    target.pointerMove({
                        type: "move",
                        id: 1,
                        button: buttons,
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            );
        }
    }

    return Input;
});
