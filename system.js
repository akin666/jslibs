/**
 * Created by akin on 30.8.2015.
 */
define(
    [
        './system/instance',
        './system/music',
        './system/log',
        './system/math',
    ] ,
    function (
        Instance,
        Music,
        Log,
        Math
    ) {
        return {
            Instance: Instance,
            Music: Music,
            Log: Log,
            Math: Math,
        }
    });
