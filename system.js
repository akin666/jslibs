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
        './system/array2d',
        './system/serialize',
        './system/settings'],
    function (
        Instance,
        Music,
        Log,
        Math,
        Time,
        Array2D,
        Serialize,
        Settings ) {
        return {
            Instance: Instance,
            Music: Music,
            Log: Log,
            Math: Math,
            Time: Time,
            Array2D: Array2D,
            Serialize: Serialize,
            Settings: Settings
        }
    });
