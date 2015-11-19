/**
 * Created by akin on 5.9.2015.
 */
define(
    [
        './input/keyboard',
        './input/mouse',
        './input/touch'],
    function (
        Keyboard,
        Mouse,
        Touch ) {
        return {
            Keyboard: Keyboard,
            Mouse: Mouse,
            Touch: Touch,
        }
    });
