/**
 * Created by akin on 16/11/15.
 */
"use strict";
define([
    "three"],
    function (THREE) {
        class Loader {
            get name() {
                return "color";
            }

            create(config) {
                var r = parseFloat(config.red);
                var g = parseFloat(config.green);
                var b = parseFloat(config.blue);

                if( r === NaN ) r = 0;
                if( g === NaN ) g = 0;
                if( b === NaN ) b = 0;

                return new THREE.Color(r,g,b);
            }
        }
        return Loader;
    });
