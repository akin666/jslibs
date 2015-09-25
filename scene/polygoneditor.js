/**
 * Created by akin on 22/09/15.
 */

define(["three", "../system/math", "./polygon", "./point", "./actionpoint"], function (THREE, Math, Polygon, Point, ActionPoint) {
    function Editor(config){
        this.self = {};

        var self = this.self;

        self.polygon = new Polygon();
        self.point = new Point();

        this.init(config);
        return this;
    }

    Editor.prototype.position = function(val)
    {
        var self = this.self;

        self.point.position(val);
        return self.polygon.position(val);
    }

    Editor.prototype.mesh = function(val)
    {
        var self = this.self;

        self.point.mesh(val);
        return self.polygon.mesh(val);
    }

    Editor.prototype.addPoint = function(point)
    {
        var self = this.self;

        self.point.addPoint(point);
        self.polygon.addPoint(point);
    }

    Editor.prototype.addPointAt = function(index, point)
    {
        var self = this.self;

        self.point.addPointAt(point);
        self.polygon.addPointAt(point);
    }

    Editor.prototype.setPointAt = function(index, point)
    {
        var self = this.self;

        self.point.setPointAt(index, point);
        self.polygon.setPointAt(index, point);
    }

    Editor.prototype.apply = function()
    {
        var self = this.self;

        self.point.apply();
        self.polygon.apply();
    }

    Editor.prototype.nearestAction = function(config)
    {
        // Line
        // Vertex
        return null;
    }

    Editor.prototype.pointAction = function(config)
    {
        var self = this.self;

        var action = new ActionPoint({
            target: self.polygon,
            point: config.position,
            index: config.lineToSplit
        });

        return action;
    }

    Editor.prototype.init = function(config) {
        var self = this.self;

        self.polygon = config.polygon;

        self.point.init({
            scene: self.polygon.scene(),
            attach: self.polygon.attach(),
            mesh: self.polygon.mesh(),
            position: self.polygon.position(),
            material: new THREE.PointsMaterial( {
                color: 0xFF99FF,
                size: 5.0,
                sizeAttenuation: false
            })
        });
    }

    return Editor;
});
