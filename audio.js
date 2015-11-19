/**
 * Created by akin on 30.8.2015.
 */
define(
    [
        './audio/instance',
        './audio/system',
        './audio/jukebox'],
    function (
        Instance,
        System,
        Jukebox) {
        return {
            Instance: Instance,
            System: System,
            Jukebox: Jukebox,
        }
    });
