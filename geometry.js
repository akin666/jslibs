/**
 * Created by akin on 16/11/15.
 */
"use strict";
define([
    "three"],
    function (THREE) {
        class Rectangle {
            constructor(config) {
                this.dimensions = new THREE.Vector3(0,0,0);

                this.setup(config);
            }

            setup(config) {
                var x = parseFloat(config.x);
                var y = parseFloat(config.y);
                var z = parseFloat(config.z);

                if( x !== NaN ) this.dimensions.x = x;
                if( y !== NaN ) this.dimensions.y = y;
                if( z !== NaN ) this.dimensions.z = z;
            }
        }
        return Rectangle;
    });

define(
    function () {
        class Sphere {
            constructor(config) {
                this.radius = 0;

                this.setup(config);
            }

            setup(config) {
                var r = parseFloat(config.radius);
                if( r !== NaN ) this.radius = r;
            }
        }
        return Sphere;
    });
