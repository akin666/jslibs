/**
 * Created by akin on 16/11/15.
 */
"use strict";
define([
    "three"],
    function (THREE) {
        class Loader {
            get name() {
                return "position";
            }

            create(config) {
                var x = parseFloat(config.x);
                var y = parseFloat(config.y);
                var z = parseFloat(config.z);

                if( x === NaN ) x = 0;
                if( y === NaN ) y = 0;
                if( z === NaN ) z = 0;

                return new THREE.Vector3(x,y,z);
            }
        }
        return Loader;
    });
