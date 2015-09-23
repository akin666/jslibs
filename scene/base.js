/**
 * Created by akin on 22/09/15.
 */

define(["three", "../system/math"], function (THREE, Math) {
    function Base(config){
        this.self = {};
        this.init(config);
        return this;
    }

    Base.prototype.destroy = function() {
        var self = this.self;
        if(self.object != null) {
            if(self.scene != null) {
                self.scene.remove(self.object);
            }
            self.object = null;
        }
    }

    Base.prototype.position = function(val)
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

    Base.prototype.mesh = function(val)
    {
        if(val == null) {
            return this.self.mesh;
        }
        var self = this.self;
        self.mesh = val;

        this.apply();
        return val;
    }

    Base.prototype.material = function(val)
    {
        if(val == null) {
            return this.self.material;
        }
        var self = this.self;
        self.material = val;

        this.apply();
        return val;
    }

    Base.prototype.type = function()
    {
        return 'none';
    }

    Base.prototype.toLocal = function(point)
    {
        if(point == null) {
            return null;
        }

        point.applyMatrix4(new THREE.Matrix4().getInverse(this.self.object.matrix));
        return point;
    }

    Base.prototype.addPoint = function(point)
    {
        if(point == null) {
            return;
        }

        var vec = new THREE.Vector3(
            point.x,
            point.y,
            point.z
        );

        this.toLocal(vec);

        this.self.mesh.push(vec);

        this.apply();
    }

    Base.prototype.init = function(config) {
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
                'material',
                'position'
            ])) {
            console.log("Failed to initialize SceneObject.");
            return;
        }

        // Rectify mesh.
        if( !(self.mesh[0] instanceof THREE.Vector3) ) {
            var mesh = self.mesh;
            self.mesh = [];
            for (var i = 0; i < mesh.length; ++i) {
                var vertex = mesh[i];
                self.mesh.push(new THREE.Vector3(vertex.x, vertex.y, vertex.z));
            }
        }

        this.apply();

        return self.object;
    }

    return Base;
});
