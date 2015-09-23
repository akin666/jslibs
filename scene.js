/**
 * Created by akin on 30.8.2015.
 */
define(
    [
        './scene/polygon',
        './scene/line',
    ] ,
    function (
        Polygon,
        Line
    ) {
        return {
            Polygon: Polygon,
            Line: Line
        }
    });
