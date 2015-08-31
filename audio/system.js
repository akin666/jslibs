/**
 * Created by akin on 30.8.2015.
 */
define(function () {
    function System(){
        this.JUKEBOX = "jukebox";
        this.INSTANCE = "instance";
        this.SOURCE = "instance";
        this.PLAYER = "instance";

        return this;
    }

    // create audio objects
    System.prototype.create = function(config){
        // type: jukebox, instance
        // layer: string
    }

    // release resource
    System.prototype.release = function(config){
    }

    // get information about the current state
    System.prototype.info = function(config){
    }

    // set system
    System.prototype.set = function(config){
    }

    // set volumes
    System.prototype.volume = function(config){
    }

    // pause playback
    System.prototype.pause = function(config){
    }

    // play/resume playback
    System.prototype.play = function(config){
    }

    // stop playback
    System.prototype.stop = function(config){
    }

    return System;
});
