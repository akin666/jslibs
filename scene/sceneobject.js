/**
 * Created by akin on 22/09/15.
 */

define(["three", "../system/math"], function (THREE, Math) {
    function SceneObject(config){
        this.self = {};
        this.init(config);
        return this;
    }

    SceneObject.prototype.destroy = function() {
        var self = this.self;
        if(self.object != null) {
            if(self.scene != null) {
                self.scene.remove(self.object);
            }
            self.object = null;
        }
    }

    SceneObject.prototype.apply = function() {
        this.destroy();
        var self = this.self;

        var object = null;
        switch(self.type)
        {
            case 'line' :
            case 'polygon' :
            {
                var geom = new THREE.Geometry();
                var vertex = null;
                for (var i = 0; i < self.mesh.length; ++i) {
                    vertex = self.mesh[i];
                    geom.vertices.push(new THREE.Vector3(vertex.x, vertex.y, vertex.z));
                }
                if( this.type != 'line' ) {
                    vertex = self.mesh[0];
                    geom.vertices.push(new THREE.Vector3(vertex.x, vertex.y, vertex.z));
                }
                object = new THREE.Line( geom, self.material ) ;
                break;
            }
            default :
                break;
        }

        if(object == null) {
            return;
        }

        self.object = object;

        self.object.position.x = self.position.x;
        self.object.position.y = self.position.y;

        self.scene.add(self.object);
    }

    SceneObject.prototype.position = function(val)
    {
        if(val == null) {
            return this.self.position;
        }
        var self = this.self;
        self.position = val;
        self.object.position.x = self.position.x;
        self.object.position.y = self.position.y;
        return val;
    }

    SceneObject.prototype.mesh = function(val)
    {
        if(val == null) {
            return this.self.mesh;
        }
        var self = this.self;
        self.mesh = val;

        this.apply();
        return val;
    }

    SceneObject.prototype.material = function(val)
    {
        if(val == null) {
            return this.self.material;
        }
        var self = this.self;
        self.material = val;

        this.apply();
        return val;
    }

    SceneObject.prototype.type = function(val)
    {
        if(val == null) {
            return this.self.type;
        }
        var self = this.self;
        self.type = val;

        this.apply();
        return val;
    }

    SceneObject.prototype.addPoint = function(point)
    {
        if(point == null) {
            return;
        }

        var self = this.self;

        var pp = [point.x,point.y,point.z];
        self.object.matrix.applyToVector3Array(pp);

        self.mesh.push({x: pp[0], y: pp[1], z: pp[2]});
        //self.mesh.push(point);

        this.apply();
    }

    SceneObject.prototype.init = function(config) {
        var self = this.self;
        this.destroy();

        // copy referenced properties from config.
        if(!(function(target,source,properties){
                for(var i = 0; i < properties.length ;++i) {
                    if(source[properties[i]] == null) {
                        console.log("No property called " + properties[i]);
                        return false;
                    }
                    target[properties[i]] = source[properties[i]];
                }
                return true;
            })(
                self,
                config,
                [
                'scene',
                'mesh',
                'type',
                'material',
                'position'
            ])) {
            console.log("Failed to initialize SceneObject.");
            return;
        }

        this.apply();

        return self.object;
    }

    return SceneObject;
});
