/**
 * Created by akin on 22/09/15.
 */
"use strict";
define([
    "three",
    "system/math",
    "system/settings",
    "input",
    "./polygon",
    "./point",
    "./actionpoint",
    "./actionline"],
    function (
        THREE,
        Math,
        Settings,
        Input,
        Polygon,
        Point,
        ActionPoint,
        ActionLine) {
        var actionVar = Symbol();
        var polygonVar = Symbol();
        var pointVar = Symbol();
        var elementVar = Symbol();
        var settingsVar = Symbol();
        var widthVar = Symbol();
        var heightVar = Symbol();
        class Editor {
            constructor(config) {
                this[actionVar] = null;
                this[polygonVar] = null;
                this[pointVar] = new Point();
                this[elementVar] = null;
                this[settingsVar] = null;
                this[widthVar] = null;
                this[heightVar] = null;

                this.init(config);
            }

            get action() {
                return this[actionVar];
            }

            set action(val) {
                this[actionVar] = val;
            }

            get polygon() {
                return this[polygonVar];
            }

            set polygon(val) {
                this[polygonVar] = val;
            }

            get point() {
                return this[pointVar];
            }

            set point(val) {
                this[pointVar] = val;
            }

            get element() {
                return this[elementVar];
            }

            set element(val) {
                this[elementVar] = val;
            }

            get width() {
                return this[widthVar];
            }

            set width(val) {
                this[widthVar] = val;
            }

            get height() {
                return this[heightVar];
            }

            set height(val) {
                this[heightVar] = val;
            }

            get settings() {
                return this[settingsVar];
            }

            set settings(val) {
                this[settingsVar] = val;
            }

            init(config) {
                var self = this.self;

                this.polygon = config.polygon;
                this.element = config.element;

                this.settings = config.settings;

                this.width = this.element.width();
                this.height = this.element.height();

                this.mouseInput = new Input.Mouse({
                    element: this.element,
                    target: this
                });
                this.touchInput = new Input.Touch({
                    element: this.element,
                    target: this
                });
                this.keyInput = new Input.Keyboard({
                    element: this.element,
                    target: this
                });

                var key = "PolygonEditorPointMaterial";
                var material = this.settings.get(
                    key,
                    new THREE.PointsMaterial({
                        color: 0xFF99FF,
                        size: 10.0,
                        sizeAttenuation: false
                    })
                );

                this.point.init({
                    parent: this.polygon.object(),
                    mesh: this.polygon.mesh(),
                    material: material
                });
            }

            screenToScene(point) {
                return new THREE.Vector3(
                    point.x - (this.width / 2.0),
                    -point.y + (this.height / 2.0),
                    0.0);
            }

            pointerClick(config) {
                this.keyInput.bind();
                var point = this.screenToScene(config);
            }

            pointerButton(config) {
                var button = config.button;
                if (button == 0) {
                    return;
                }
                var point = this.screenToScene(config);
                var point3 = new THREE.Vector3(
                    point.x,
                    point.y,
                    0.0);

                if (config.down) {
                    if (this.action != null) {
                        this.action.commit({
                            target: this.polygon,
                            point: point3
                        });
                    }
                }
                else {
                    // "commit"
                    if (this.action != null) {
                        this.action.commit({
                            target: this.polygon,
                            point: point3
                        });
                    }
                }
            }

            pointerAction(config) {
                if (config.type == "end") {
                    this.keyInput.unbind();
                }
                else if (config.type == "cancel") {
                    this.keyInput.unbind();
                }
                else if (config.type == "continue") {
                    this.keyInput.bind();
                }
            }

            pointerMove(config) {
                var point = this.screenToScene(config);
                var point3 = new THREE.Vector3(
                    point.x,
                    point.y,
                    0.0);

                if (config.button == null || config.button.length > 0) {
                }
                else {
                    if (this.action == null) {
                        var self = this;
                        // Yes, this, clusterfuck does it all.
                        var action = new ActionLine({
                            target: self.polygon,
                            point: point3
                        });
                        self.action = action;

                        action.promise().then(
                            function (config) {
                                // Success
                                // Clean previous action..
                                if (self.action != null) {
                                    self.action.destroy();
                                    self.action = null;
                                }

                                config.edit = false;
                                var index = Math.findClosestPoint(
                                    config.point,
                                    self.polygon.mesh()
                                );

                                // is the click close enough?
                                var p1 = self.polygon.getPoint(index);
                                var distance = config.point.distanceTo(p1);

                                if (distance <= 20) {
                                    config.edit = true;
                                    config.index = index;
                                }

                                var pointAction = new ActionPoint(config);
                                self.action = pointAction;

                                pointAction.promise().then(function (config) {
                                        // Success
                                        // Clean previous action..
                                        if (self.action != null) {
                                            self.action.destroy();
                                            self.action = null;
                                        }

                                        if (config.edit) {
                                            self.polygon.setPoint(config.index - 1, config.point);
                                            self.point.setPoint(config.index - 1, config.point);
                                        }
                                        else {
                                            self.polygon.addPoint(config.index, config.point);
                                            self.point.addPoint(config.index, config.point);
                                        }
                                    },
                                    function (config) {
                                        // Fail
                                    });
                            }, function (config) {
                                // Fail
                            });
                    }
                }

                if (this.action != null) {
                    this.action.move(point3);
                }
            }

            keyPress(config) {
                console.log("ThreeApp: key: " + config.key + " code: " + config.code);
            }
        }
        return Editor;
    });
