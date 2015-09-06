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
            element.off("keydown");
            element.off("keyup");
            element.off("keypress");
            return;
        }
        if( target.keyAction != null  ) {
            element.on("keydown", function (event) {
                    target.keyAction({
                        down: 1.0,
                    });
                }
            );
            element.on("keyup", function (event) {
                    target.keyAction({
                        down: 0.0,
                    });
                }
            );
        }
        if( target.keyPress != null  ) {
            element.on("keypress", function (event) {
                    target.onKey({
                    });
                }
            );
        }
    }

    return Input;
});
