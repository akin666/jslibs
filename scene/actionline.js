/**
 * Created by akin on 22/09/15.
 */
"use strict";
define([
    "three",
    "../system/math",
    "./line",
    "./actionbase"],
    function (
        THREE,
        Math,
        Line,
        ActionBase) {
        var lineVar = Symbol();
        class Action extends ActionBase {
            constructor(config) {
                super(config);
            }

            destroy() {
                if (this[lineVar] != null) {
                    this[lineVar].destroy();
                }
            }

            get line() {
                return this[lineVar];
            }

            set line(val) {
                this[lineVar] = val;
            }

            move(val) {
                var index = this.getClosestIndex(val);

                var a = this.target.getPoint(index);
                var b = this.target.getPoint(index + 1);

                this.line.setPoint(0, a);
                this.line.setPoint(1, b);
            }

            getClosestIndex(point) {
                // 3d.. get .. maybe reduce to 2D ..
                return Math.findClosestLine(point, this.target.mesh);
            }

            commit(config) {
                config.index = this.getClosestIndex(config.point);
                this.deferred.resolve(config);
            }

            init(config) {
                if (config == null) {
                    return;
                }
                this.target = config.target;

                var index = this.getClosestIndex(config.point);

                var a = this.target.getPoint(index);
                var b = this.target.getPoint(index + 1);

                var mesh = [];

                if (a != null) {
                    mesh.push(a);
                }
                if (b != null) {
                    mesh.push(b);
                }

                var lconfig = {
                    parent: this.target.object,
                    mesh: mesh,
                    material: new THREE.LineBasicMaterial({
                        color: 0xFF00FF,
                        linewidth: 2.0
                    })
                };

                if (this.line == null) {
                    this.line = new Line(lconfig);
                }
                else {
                    this.line.init(lconfig);
                }
            }
        }
        return Action;
    });
