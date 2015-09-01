/**
 * Created by akin on 30.8.2015.
 */
define(
    [
        './entity/instance',
        './entity/music',
        './system/log',
        './system/math',
        './system/time',
    ] ,
    function (
        Instance,
        Music,
        Log,
        Math,
        Time
    ) {
        return {
            Instance: Instance,
            Music: Music,
            Log: Log,
            Math: Math,
            Time: Time,
        }
    });
