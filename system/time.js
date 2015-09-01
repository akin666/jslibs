/**
 * Created by akin on 1.9.2015.
 */
define(function () {
    function Time(config){
        this.reset();
        return this;
    }

    Time.prototype.reset = function() {
        this.time = new Date();
        this.old = this.time;
    }

    Time.prototype.apply = function() {
        this.old = this.time;
        this.time = new Date();
    }

    Time.prototype.getDelta = function () {
        return this.time - this.old;
    }

    return Time;
});
