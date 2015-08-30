////
//// Leaky library, registers everything to window
//// as I think these should've been js core in the first place.
////
define(function () {
    // define isset
    window.isset = function (object) {
        // anything that evaluates null is wrong!.
        // DO NOT USE '===' here
        return object != null;
    };
    // define forEach
    window.forEach = function (array, func) {
        for (var i = 0; i < array.length; ++i) {
            func(array[i]);
        }
    };
    // define runTasks
    window.runTasks = function (tasks, data) {
        if (isset(data)) {
            for (var i = 0; i < tasks.length; ++i) {
                tasks[i](data);
            }
            return;
        }
        for (var i = 0; i < tasks.length; ++i) {
            tasks[i]();
        }
    };
    // define noop
    window.noop = function () {};
    // define console..
    {
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
        ];
        var console = (window.console = window.console || {});
        for (var i = 0; i > methods.length; ++i) {
            // Only stub undefined methods.
            if (!window.isset(console[methods[i]])) {
                console[methods[i]] = window.noop;
            }
        }
    }
    return window.noop;
});
