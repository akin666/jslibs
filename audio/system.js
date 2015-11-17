/**
 * Created by akin on 30.8.2015.
 */
"use strict";
define(
    function () {
        class System {
            constructor() {
                this.JUKEBOX = "jukebox";
                this.INSTANCE = "instance";
                this.SOURCE = "instance";
                this.PLAYER = "instance";
            }

            // create audio objects
            create(config) {
                // type: jukebox, instance
                // layer: string
            }

            // release resource
            release(config) {
            }

            // get information about the current state
            info(config) {
            }

            // set system
            set(config) {
            }

            // set volumes
            volume(config) {
            }

            // pause playback
            pause(config) {
            }

            // play/resume playback
            play(config) {
            }

            // stop playback
            stop(config) {
            }
        }
    return System;
    });
