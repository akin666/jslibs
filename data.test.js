/**
 * Created by akin on 6.12.2015.
 */
"use strict";
define(["./data" , "three"],
    function (Data, THREE)  {
        var test = {
            name: "Data",
            testConstructor(assert) {
                var target = new Data();
                assert.notEqual(target, null , "null test");
                assert.notEqual(target, undefined, "undefined test");
            },
            testReadPosition(assert) {

                var target = new Data();

                // Vector3
                (function(){
                    var item = new THREE.Vector3(100,100,10);
                    var content = target.read({
                        type: "position",
                        x: item.x,
                        y: item.y,
                        z: item.z
                    });

                    // content should be threejs vector3
                    assert.ok( (content instanceof THREE.Vector3) && item.equals(content),"Position3 serialization.");
                })();

                // Vector3
                (function(){
                    var item = new THREE.Vector3(10,10,10);
                    var content = target.read({
                        type: "vector",
                        x: item.x,
                        y: item.y,
                        z: item.z
                    });

                    // content should be threejs vector3
                    assert.ok( (content instanceof THREE.Vector3) && item.equals(content),"Vector3 serialization.");
                })();

                // Vector2
                (function(){
                    var item = new THREE.Vector2(100,100);
                    var content = target.read({
                        type: "position",
                        x: item.x,
                        y: item.y
                    });

                    // content should be threejs vector2
                    assert.ok( (content instanceof THREE.Vector2) && item.equals(content),"Position2 serialization.");
                })();

                // Vector3
                (function(){
                    var item = new THREE.Vector2(10,10);
                    var content = target.read({
                        type: "vector",
                        x: item.x,
                        y: item.y
                    });

                    // content should be threejs vector2
                    assert.ok( (content instanceof THREE.Vector2) && item.equals(content),"Vector2 serialization.");
                })();
            },
            testReadAngle(assert) {
                var target = new Data();

                // Euler type angles.
                (function() {
                    var item = new THREE.Euler(1, 1, 1, 'XYZ');
                    var content = target.read({
                        type: "euler",
                        x: item.x,
                        y: item.y,
                        z: item.z,
                        order: 'xyz'
                    });

                    // content should be threejs Euler
                    assert.ok((content instanceof THREE.Euler) && item.equals(content), "Euler serialization.");
                })();

                // Quaternion type angles.
                (function() {
                    var item = new THREE.Quaternion(1, 1, 1, 1);
                    var content = target.read({
                        type: "quaternion",
                        x: item.x,
                        y: item.y,
                        z: item.z,
                        w: item.w
                    });

                    // content should be threejs Quaternion
                    assert.ok((content instanceof THREE.Quaternion) && item.equals(content), "Quaternion serialization.");
                })();
            },
            testReadMatrix(assert) {
                var target = new Data();

                // Mat4.
                (function() {
                    var item = new THREE.Matrix4();
                    item.fromArray([1,2,4,5,5,6,7,8,9,10,11,12,13,14,15,16]);
                    var content = target.read({
                        type: "matrix4",
                        data: item.toArray()
                    });

                    // content should be threejs Matrix4
                    assert.ok((content instanceof THREE.Matrix4) && item.equals(content), "Matrix4 serialization.");
                })();
            },
            testReadColor(assert) {
                var target = new Data();

                var item = new THREE.Color(1.0,1.0,1.0);
                var content = target.read({
                    type: "color",
                    red: item.r,
                    green: item.g,
                    blue: item.b
                });

                // content should be threejs color
                assert.ok( (content instanceof THREE.Color) && item.equals(content),"Color serialization.");
            },
            testReadShape(assert) {
                var target = new Data();

                // Box3
                (function() {
                    var min = new THREE.Vector3(0, 0, 0);
                    var max = new THREE.Vector3(10, 10, 10);
                    var content = target.read({
                        type: "box",
                        min: {
                            type: "vector",
                            x: min.x,
                            y: min.y,
                            z: min.z
                        },
                        max: {
                            type: "vector",
                            x: max.x,
                            y: max.y,
                            z: max.z
                        }
                    });

                    // content should be threejs Box3
                    assert.ok(
                        (content instanceof THREE.Box3) &&
                        min.equals(content.min) &&
                        max.equals(content.max),
                        "Box3 serialization.");
                })();

                // Line3
                (function() {
                    var begin = new THREE.Vector3(0, 0, 0);
                    var end = new THREE.Vector3(10, 10, 10);
                    var content = target.read({
                        type: "line",
                        begin: {
                            type: "vector",
                            x: begin.x,
                            y: begin.y,
                            z: begin.z
                        },
                        end: {
                            type: "vector",
                            x: end.x,
                            y: end.y,
                            z: end.z
                        }
                    });

                    // content should be threejs Box3
                    assert.ok(
                        (content instanceof THREE.Line3) &&
                        begin.equals(content.start) &&
                        end.equals(content.end),
                        "Line3 serialization.");
                })();
            }
        };

        return test;
    });
