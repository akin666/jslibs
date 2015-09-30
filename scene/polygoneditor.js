/**
 * Created by akin on 22/09/15.
 */

define([
    "three",
    "../system/math",
    "input",
    "./polygon",
    "./point",
    "./actionpoint",
    "./actionline"
], function (
    THREE,
    Math,
    Input,
    Polygon,
    Point,
    ActionPoint,
    ActionLine
) {
    function Editor(config){
        this.self = {};
        var self = this.self;

        self.action = null;
        self.polygon = null;
        self.point = new Point();

        this.init(config);
        return this;
    }

    Editor.prototype.init = function(config) {
        var self = this.self;

        self.polygon = config.polygon;
        self.element = config.element;

        self.width = self.element.width();
        self.height = self.element.height();

        this.mouseInput = new Input.Mouse({
            element: self.element,
            target: this
        });
        this.touchInput = new Input.Touch({
            element: self.element,
            target: this
        });
        this.keyInput = new Input.Keyboard({
            element: self.element,
            target: this
        });

        self.point.init({
            parent: self.polygon.object(),
            mesh: self.polygon.mesh(),
            material: new THREE.PointsMaterial( {
                color: 0xFF99FF,
                size: 5.0,
                sizeAttenuation: false
            })
        });
    }

    Editor.prototype.screenToScene = function(point)
    {
        var self = this.self;
        return new THREE.Vector3(
                point.x - (self.width / 2.0),
                -point.y + (self.height / 2.0),
                0.0 );
    }

    Editor.prototype.pointerClick = function(config) {
        this.keyInput.bind();

        var point = this.screenToScene(config);
    }

    Editor.prototype.pointerButton = function(config) {
        var button = config.button;
        if( button == 0 ) {
            return;
        }
        var point = this.screenToScene(config);
        var point3 = new THREE.Vector3(
            point.x,
            point.y,
            0.0 );

        var self = this.self;
        if( config.down ) {
            if( self.action != null ) {
                self.action.commit({
                    target: self.polygon,
                    point: point3
                });
            }
        }
        else {
            // "commit"
            if( self.action != null ){
                self.action.commit({
                    target: self.polygon,
                    point: point3
                });
            }
        }
    }

    Editor.prototype.pointerAction = function(config) {
        if (config.type == "end") {
            this.keyInput.unbind();
        }
        else if (config.type == "cancel") {
            this.keyInput.unbind();
        }
        else if( config.type == "continue" ) {
            this.keyInput.bind();
        }
    }

    Editor.prototype.pointerMove = function(config) {
        var point = this.screenToScene(config);
        var point3 = new THREE.Vector3(
            point.x,
            point.y,
            0.0 );
        var self = this.self;

        if (config.button == null || config.button.length > 0) {
        }
        else {
            if( self.action == null ) {
                var self = this.self;
                // Yes, this, clusterfuck does it all.
                var action = new ActionLine({
                    target: self.polygon,
                    point: point3
                });
                self.action = action;

                action.promise().then(function(config) {
                    // Success
                    // Clean previous action..
                    if( self.action != null ) {
                        self.action.destroy();
                        self.action = null;
                    }
                    var pointAction = new ActionPoint(config);
                    self.action = pointAction;

                    pointAction.promise().then(function(config) {
                        // Success
                        // Clean previous action..
                        if( self.action != null ) {
                            self.action.destroy();
                            self.action = null;
                        }

                        self.polygon.addPointAt(config.index , config.point);
                        self.point.addPointAt(config.index , config.point);
                    },
                    function(config) {
                        // Fail
                    });
                }, function(config){
                    // Fail
                });
            }
        }

        if( self.action != null ){
            self.action.move(point3);
        }
    }

    Editor.prototype.keyPress = function(config) {
        console.log("ThreeApp: key: " + config.key + " code: " + config.code);
    }

    return Editor;
});
