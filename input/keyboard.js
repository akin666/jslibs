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
    }

    Input.prototype.bind = function() {
        this.apply($(document));
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

        // pry off previous bindings..
        element.off("keydown");
        element.off("keyup");
        element.off("keypress");

        if( target.keyAction != null  ) {
            element.on("keydown", function (event) {
                    target.keyAction({
                        down: 1.0,
                        key: String.fromCharCode(event.keyCode),
                        code: event.keyCode,
                        time: event.timeStamp,
                        state: {
                        }
                    });
                }
            );
            element.on("keyup", function (event) {
                    target.keyAction({
                        down: 0.0,
                        key: String.fromCharCode(event.keyCode),
                        code: event.keyCode,
                        time: event.timeStamp,
                        state: {
                        }
                    });
                }
            );
        }
        if( target.keyPress != null  ) {
            element.on("keypress", function (event) {
                    target.keyPress({
                        key: String.fromCharCode(event.keyCode),
                        code: event.keyCode,
                        time: event.timeStamp,
                        state: {
                        }
                    });
                }
            );
        }
    }

    return Input;
});
