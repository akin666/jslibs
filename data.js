/**
 * Created by akin on 6.12.2015.
 */
"use strict";
define(["three"],
    function (THREE) {
        class Data {
            _readTyped(item) {
                switch(item.type) {
                    case 'position' : {
                        // ?x,?y,?z
                        var x = parseFloat(item.x);
                        var y = parseFloat(item.y);
                        var z = parseFloat(item.z);

                        if( isNaN(x) ) x = 0.0;
                        if( isNaN(y) ) y = 0.0;
                        if( isNaN(z) ) z = 0.0;

                        return new THREE.Vector3(x,y,z);
                    }
                    default:
                        break;
                }
                return undefined;
            }

            _readUnTyped(item) {
            }


            read(item) {
                if( item.type !== undefined ) {
                    return this._readTyped(item);
                }
                this._readUnTyped(item);
            }

            write(item) {
                var data = {};

                return data;
            }
        }
        return Data;
    });
