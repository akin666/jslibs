/**
 * Created by akin on 22/09/15.
 *
 * Object that has a dynamic 'graphics' child.
 */
"use strict";
define([
    "three",
    "../system/math"],
    function (
        THREE,
        Math) {
        var attachedVar = Symbol();
        var objectVar = Symbol();
        var graphicVar = Symbol();
        var parentVar = Symbol();
        var meshVar = Symbol();
        var materialVar = Symbol();
        class Base {
            constructor(config) {
                this[attachedVar] = false;
                this[objectVar] = new THREE.Object3D();
                this[graphicVar] = null;
                this[parentVar] = null;
                this[meshVar] = null;
                this[materialVar] = null;
                this.init(config);
            }

            get attached() {
                return this[attachedVar];
            }

            set attached(val) {
                this[attachedVar] = val;
            }

            get parent() {
                return this[parentVar];
            }

            set parent(val) {
                this.detach();
                this[parentVar] = val;
                this.attach();
            }

            get object() {
                writable: true;
                return this[objectVar];
            }

            set object(val) {
                this[objectVar] = val;
            }

            get graphic() {
                return this[graphicVar];
            }

            set graphic(val) {
                this[graphicVar] = val;
            }

            get mesh() {
                return this[meshVar];
            }

            set mesh(val) {
                this[meshVar] = val;
                this.apply();
            }

            get material() {
                return this[materialVar];
            }

            set material(val) {
                this[materialVar] = val;
                this.apply();
            }

            destroy() {
                if (this.object != null) {
                    if (this.parent != null) {
                        this.parent.remove(this.object);
                    }
                    this.object = null;
                }
            }

            destroyGraphics() {
                if (this.graphic != null) {
                    this.object.remove(this.graphics);
                    this.graphics = null;
                }
            }

            attach(val) {
                if (val == null) {
                    return;
                }

                if (val) {
                    if (this.object.parent == null) {
                        this.parent.add(this.object);
                    }
                }
                else {
                    if (this.object.parent != null) {
                        this.parent.remove(this.object);
                    }
                }
            }

            detach() {
                this.attach(false);
            }

            position(val) {
                if (val == null) {
                    return this.object.position;
                }
                this.object.position.x = val.x;
                this.object.position.y = val.y;
                this.object.position.z = val.z;

                return val;
            }

            type() {
                return 'none';
            }

            toLocal(point) {
                if (point == null) {
                    return null;
                }

                point.applyMatrix4(new THREE.Matrix4().getInverse(this.object.matrix));
                return point;
            }

            addPoint(first, point) {
                if ((first instanceof THREE.Vector3)) {
                    this.mesh.push(first);
                }
                else {
                    if (point == null) {
                        return;
                    }
                    this.mesh.splice(first, 0, point);
                }
                this.apply();
            }

            setPoint(index, point) {
                if (point == null) {
                    return;
                }

                this.mesh[index] = point;
                this.apply();
            }

            removePoint(index) {
                this.mesh.splice(index, 1);
                this.apply();
            }

            getPoint(index) {
                if (this.mesh == null) {
                    return null;
                }

                var len = this.mesh.length;
                while (index < 0) index += len;
                while (index >= len) index -= len;

                return this.mesh[index];
            }

            size() {
                if (this.mesh == null) {
                    return 0;
                }
                return this.mesh.length;
            }

            init(config) {
                this.destroyGraphics();

                if (config == null) {
                    return;
                }

                if (config.position != null) {
                    this.object.position.set(
                        config.position.x,
                        config.position.y,
                        config.position.z
                    );
                }

                this[parentVar] = config.parent;
                this[meshVar] = config.mesh;
                this[materialVar] = config.material;

                // Rectify mesh.
                if (!(this.mesh[0] instanceof THREE.Vector3)) {
                    var mesh = this.mesh;
                    this.mesh = [];
                    for (var i = 0; i < mesh.length; ++i) {
                        var vertex = mesh[i];
                        this.mesh.push(
                            new THREE.Vector3(vertex.x, vertex.y, vertex.z)
                        );
                    }
                }

                this.apply();

                if (config.attach == null || config.attach === true) {
                    this.attach(true);
                }

                return this.object;
            }
        }
        return Base;
    });
