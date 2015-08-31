/**
 * Created by akin on 01/09/15.
 */
define([
        "jquery",
        "./gameoflife"
    ],
    function (
        $,
        GameOfLife
    ) {
    return {
        init: function (config) {
            var type = $(config.element).attr("type").toLowerCase();
            switch(type) {
                case "gameoflife" :
                    return new GameOfLife(config);
                default :
                    break;
            }
            return null;
        }
    };
});
