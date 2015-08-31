/**
 * Created by akin on 31/08/15.
 */
define(function () {
    function Application(config){
        this.element = config.element;

        this.element.innerHTML = "AAA";

        return this;
    }

    return Application;
});
