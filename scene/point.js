/**
 * Created by akin on 22/09/15.
 */
"use strict";
define([
        "three",
        "../system/math",
        "./base"],
    function (
        THREE,
        Math,
        Base) {
        class Point extends Base {
            constructor(config) {
                super(config);
            }

            apply() {
                this.destroyGraphics();

                var geom = new THREE.Geometry();
                for (var i = 0; i < this.mesh.length; ++i) {
                    geom.vertices.push(this.mesh[i]);
                }
                var object = new THREE.Points(geom, this.material);

                if (object == null) {
                    return;
                }

                this.graphics = object;
                this.object.add(this.graphics);
            }
        }
        return Point;
    });
