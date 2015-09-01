/**
 * Created by akin on 31/08/15.
 */
define(function () {
    function Application(config){
        var element = config.element;
        this.element = element[0];

        this.element.innerHTML = "Gameoflife";

        this.width = element.attr("data-width");
        this.height = element.attr("data-height");

        /*
        1) any live cell with fewer than 2 neighbours dies.
        2) any live cell with 2 or 3 neighbours lives on
        3) any live cell with more than 3 neighbours dies
        4) any dead cell with 3 neighbours becomes live cell
         */

        return this;
    }

    return Application;
});
