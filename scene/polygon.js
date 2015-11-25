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
        class Polygon extends Base {
            constructor(config) {
                super(config);
            }

            apply() {
                this.destroyGraphics();

                var geom = new THREE.Geometry();
                for (var i = 0; i < this.mesh.length; ++i) {
                    geom.vertices.push(this.mesh[i]);
                }
                geom.vertices.push(this.mesh[0]);
                var graphics = new THREE.Line(geom, this.material);

                if (this.object == null) {
                    return;
                }

                this.graphics = graphics;
                this.object.add(this.graphics);
            }
        }
        return Polygon;
    });
