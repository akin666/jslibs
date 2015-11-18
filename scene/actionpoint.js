/**
 * Created by akin on 22/09/15.
 */
"use strict";
define([
    "three",
    "system/math",
    "./line",
    "./actionbase"],
    function (
        THREE,
        Math,
        Line,
        ActionBase) {
        var lineVar = Symbol();
        var editVar = Symbol();
        var indexVar = Symbol();
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
                var i = this.line.size();
                if (i <= 0) {
                    return;
                }
                else if (i === 1) {
                    i = 0;
                }
                else if (i === 2) {
                    i = 1;
                }
                else {
                    i -= 2;
                }

                this.line.setPoint(i, val);
            }

            commit(config) {
                config.index = this[indexVar] + 1;
                config.edit = this[editVar];

                this.deferred.resolve(config);
            }

            revert() {
            }

            init(config) {
                if (config == null) {
                    return;
                }
                // config.edit? == true

                this.target = config.target;
                this[editVar] = config.edit;
                this[indexVar] = config.index;

                if (config.edit) {
                    var a = this.target.getPoint(config.index - 1);
                }
                else {
                    var a = this.target.getPoint(config.index);
                }
                var b = config.point;
                var c = this.target.getPoint(config.index + 1);

                var mesh = [];

                if (a != null) {
                    mesh.push(a);
                }
                if (b != null) {
                    mesh.push(b);
                }
                if (c != null) {
                    mesh.push(c);
                }

                var lconfig = {
                    parent: this.target.object(),
                    attach: true,
                    mesh: mesh,
                    material: new THREE.LineBasicMaterial({
                        color: 0xFFAAAA,
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
