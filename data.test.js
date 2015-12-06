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

                var vec3 = new THREE.Vector3(100,100,10);
                var content = target.read({
                    "type": "position",
                    "x": vec3.x,
                    "y": vec3.y,
                    "z": vec3.z
                });

                // content should be threejs vector3
                assert.ok( (content instanceof THREE.Vector3) && vec3.equals(content),"Position Vector3 serialization.");
            }
        };

        return test;
    });
