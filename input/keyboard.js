/**
 * Created by akin on 5.9.2015.
 */
define(["jquery","jquery-mobile"], function ($) {
    function Input(config){
        this.setup(config);
        return this;
    }

    Input.prototype.setup = function(config){
        this.element = config.element;

        var target = config.target;
        if( target == null ) {
            return;
        }
    }

    return Input;
});
