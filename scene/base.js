/**
 * Created by akin on 22/09/15.
 *
 * Object that has a dynamic 'graphics' child.
 */

define(["three", "../system/math"], function (THREE, Math) {
    function Base(config){
        this.self = {
            attached: false,
            object: new THREE.Object3D(),
            graphics: null
        };
        this.init(config);
        return this;
    }

    Base.prototype.destroy = function() {
        var self = this.self;
        if(self.object != null) {
            if(self.parent != null) {
                self.parent.remove(self.object);
            }
            self.object = null;
        }
    }

    Base.prototype.destroyGraphics = function() {
        var self = this.self;
        if(self.graphics != null) {
            self.object.remove(self.graphics);
            self.graphics = null;
        }
    }

    Base.prototype.attach = function(val) {
        if(val == null) {
            return;
        }
        var self = this.self;

        if(val)
        {
            if( self.object.parent == null ) {
                self.parent.add(self.object);
            }
        }
        else
        {
            if( self.object.parent != null ) {
                self.parent.remove(self.object);
            }
        }
    }

    Base.prototype.position = function(val) {
        var self = this.self;
        if(val == null) {
            return self.object.position;
        }
        self.object.position.x = val.x;
        self.object.position.y = val.y;
        self.object.position.z = val.z;

        return val;
    }

    Base.prototype.parent = function(val) {
        var self = this.self;
        if(val == null) {
            return self.parent;
        }

        if(val === self.object.parent) {
            return val;
        }

        this.detach();
        self.parent = val;
        this.attach();

        return val;
    }

    Base.prototype.object = function() {
        var self = this.self;
        return self.object;
    }

    Base.prototype.mesh = function(val) {
        var self = this.self;
        if(val == null) {
            return self.mesh;
        }
        self.mesh = val;

        this.apply();

        return val;
    }

    Base.prototype.material = function(val)
    {
        var self = this.self;
        if(val == null) {
            return self.material;
        }
        self.material = val;

        this.apply();
        return val;
    }

    Base.prototype.type = function() {
        return 'none';
    }

    Base.prototype.toLocal = function(point) {
        if(point == null) {
            return null;
        }

        point.applyMatrix4(new THREE.Matrix4().getInverse(this.self.object.matrix));
        return point;
    }

    Base.prototype.addPoint = function(first, point) {
        if( (first instanceof THREE.Vector3) ) {
            this.self.mesh.push(first);
        }
        else {
            if (point == null) {
                return;
            }
            this.self.mesh.splice(first, 0, point);
        }
        this.apply();
    }

    Base.prototype.setPoint = function(index, point) {
        if(point == null) {
            return;
        }

        this.self.mesh[index] = point;

        this.apply();
    }

    Base.prototype.removePoint = function(index) {
        this.self.mesh.splice(index, 1);

        this.apply();
    }

    Base.prototype.getPoint = function(index) {
        var self = this.self;
        if( self.mesh == null ) {
            return null;
        }

        var len = self.mesh.length;
        while(index < 0) index += len;
        while(index >= len) index -= len;

        return self.mesh[index];
    }

    Base.prototype.size = function() {
        var self = this.self;
        if( self.mesh == null ) {
            return 0;
        }
        return self.mesh.length;
    }

    Base.prototype.init = function(config) {
        var self = this.self;
        this.destroyGraphics();

        if( config == null ) {
            return;
        }

        if( config.position != null ) {
            self.object.position = config.position;
        }

        self.parent = config.parent;
        self.mesh = config.mesh;
        self.material = config.material;

        // Rectify mesh.
        if( !(self.mesh[0] instanceof THREE.Vector3) ) {
            var mesh = self.mesh;
            self.mesh = [];
            for (var i = 0; i < mesh.length; ++i) {
                var vertex = mesh[i];
                self.mesh.push(
                    new THREE.Vector3(vertex.x, vertex.y, vertex.z)
                );
            }
        }

        this.apply();

        if( config.attach == null || config.attach === true ) {
            this.attach(true);
        }

        return self.object;
    }

    return Base;
});
