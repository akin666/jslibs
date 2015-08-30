/**
 * Created by akin on 30.8.2015.
 */
define(
    [
        './system/instance',
        './system/music'
    ] ,
    function (
        Instance,
        Music
    ) {
        return {
            Instance: Instance,
            Music: Music,
        }
    });
