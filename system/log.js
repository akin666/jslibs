/**
 * Created by akin on 30.8.2015.
 */
define(function () {
    return function (config) {
        if( !config ) {
            return;
        }
        var msg = "";
        if( config.type ) {
            msg += config.type + ": ";
        }
        msg += config.message;

        console.log( msg );
    };
});
