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
            {
                var geom = new THREE.Geometry();
                for (var i = 0; i < self.mesh.length; ++i) {
                    geom.vertices.push(self.mesh[i]);
                }
                object = new THREE.Line( geom, self.material ) ;
                break;
            }
            case 'polygon' :
            {
                var geom = new THREE.Geometry();
                for (var i = 0; i < self.mesh.length; ++i) {
                    geom.vertices.push(self.mesh[i]);
                }
                geom.vertices.push(self.mesh[0]);
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

        var matrix = new THREE.Matrix4().getInverse(self.object.matrix);

        var vec = new THREE.Vector3(
            point.x,
            point.y,
            point.z
        );

        vec.applyMatrix4(matrix);

        self.mesh.push(vec);

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

        // Rectify mesh.
        var mesh = self.mesh;
        self.mesh = [];
        for(var i = 0; i < mesh.length ; ++i) {
            var vertex = mesh[i];
            self.mesh.push(new THREE.Vector3(vertex.x, vertex.y, vertex.z));
        }

        this.apply();

        return self.object;
    }

    return SceneObject;
});
