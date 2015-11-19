/**
 * Created by akin on 30.8.2015.
 */
define(
    [
        './scene/polygon',
        './scene/line',
        './scene/point',
        './scene/polygoneditor'],
    function (
        Polygon,
        Line,
        Point,
        PolygonEditor ) {
        return {
            Polygon: Polygon,
            Line: Line,
            Point: Point,
            PolygonEditor: PolygonEditor
        }
    });
