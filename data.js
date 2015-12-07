/**
 * Created by akin on 6.12.2015.
 */
"use strict";
define(["three"],
    function (THREE) {
        class Data {
            _readTyped(item) {
                switch(item.type) {
                    case 'position' :
                    case 'vector' : {
                        // ?x,?y,?z
                        var x = parseFloat(item.x);
                        var y = parseFloat(item.y);
                        var z = parseFloat(item.z);

                        if( isNaN(x) ) x = 0.0;
                        if( isNaN(y) ) y = 0.0;
                        if( isNaN(z) ) {
                            return new THREE.Vector2(x,y);
                        }

                        return new THREE.Vector3(x,y,z);
                    }
                    case 'euler' : {
                        // ?x,?y,?z
                        var x = parseFloat(item.x);
                        var y = parseFloat(item.y);
                        var z = parseFloat(item.z);
                        var order = item.order;

                        if( isNaN(x) ) x = 0.0;
                        if( isNaN(y) ) y = 0.0;
                        if( isNaN(z) ) z = 0.0;
                        if( order === undefined || order === null ) {
                            order = 'XYZ';
                        }

                        order = order.toUpperCase();

                        return new THREE.Euler(x,y,z,order);
                    }
                    case 'quaternion' : {
                        // ?x,?y,?z
                        var x = parseFloat(item.x);
                        var y = parseFloat(item.y);
                        var z = parseFloat(item.z);
                        var w = parseFloat(item.w);

                        if( isNaN(x) || isNaN(y) || isNaN(z) || isNaN(w) ) {
                            throw "quaternion needs 4 values";
                        }

                        return new THREE.Quaternion(x,y,z,w);
                    }
                    case 'mat4' :
                    case 'matrix4' :
                    case 'matrix4x4' : {
                        var data = [];
                        if( item.data == null || !(item.data instanceof Array) ) {
                            return new THREE.Matrix4();
                        }

                        for( var i = 0 ; i < item.data.length ; ++i ) {
                            var num = parseFloat(item.data[i]);
                            if(isNaN(num)) {
                                throw "matrix4 needs number values";
                            }
                            data.push(num);
                        }


                        if( data.length === 16 ) {
                            var t = new THREE.Matrix4();
                            t.fromArray(data);
                            return t;
                        }

                        throw "matrix4 needs 16 values";
                    }
                    case 'color' : {
                        // ?r,?g,?b
                        var r = parseFloat(item.red);
                        var g = parseFloat(item.green);
                        var b = parseFloat(item.blue);

                        if( isNaN(r) ) r = 0.0;
                        if( isNaN(g) ) g = 0.0;
                        if( isNaN(b) ) b = 0.0;

                        return new THREE.Color(r,g,b);
                    }
                    case 'rectangle' :
                    case 'box' : {
                        // ?r,?g,?b
                        var min = this._readTyped(item.min);
                        var max = this._readTyped(item.max);

                        if( min instanceof THREE.Vector2 ) {
                            return new THREE.Box2( min , max );
                        }
                        return new THREE.Box3( min , max );
                    }
                    case 'line' : {
                        // ?r,?g,?b
                        var begin = this._readTyped(item.begin);
                        var end = this._readTyped(item.end);

                        return new THREE.Line3( begin , end );
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
