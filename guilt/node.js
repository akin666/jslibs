/**
 * Created by akin on 16/11/15.
 */
"use strict";
define([
    "three"],
    function (THREE) {
        var nodeVar = Symbol();
        var nameVar = Symbol();

        class Node {
            constructor(settings) {
                // "private"
                this[nodeVar]= new THREE.Object3D();
                this[nameVar]= "";

                if(settings !== undefined) {
                    this.setup(settings);
                }
            }

            setup(settings) {
            }

            get name() {
                return this[nameVar];
            }

            set name(val) {
                this[nameVar] = val;
            }
        }

        return Node;
    });
