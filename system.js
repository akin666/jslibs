/**
 * Created by akin on 30.8.2015.
 */
define(
    [
        './entity/instance',
        './entity/music',
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
