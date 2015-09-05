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
        if( target.onKey != null  ) {
            element.on("keydown", function (event) {
                    target.onKey({
                        press: false,
                        down: true,
                    });
                }
            );
            element.on("keyup", function (event) {
                    target.onKey({
                        press: false,
                        down: false,
                    });
                }
            );
            element.on("keypress", function (event) {
                    target.onKey({
                        press: true,
                        down: false,
                    });
                }
            );
        }
    }

    return Input;
});