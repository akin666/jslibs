/**
 * Created by akin on 22/09/15.
 */

define(["three", "../system/math", "./base"], function (THREE, Math, Base) {
    function Polygon(config){
        Base.call( this , config );

        return this;
    }

    // specify inheritance
    Polygon.prototype = Object.create( Base.prototype );

    Polygon.prototype.apply = function() {
        this.destroy();
        var self = this.self;

        var geom = new THREE.Geometry();
        for (var i = 0; i < self.mesh.length; ++i) {
            geom.vertices.push(self.mesh[i]);
        }
        geom.vertices.push(self.mesh[0]);
        var object = new THREE.Line( geom, self.material ) ;

        if(object == null) {
            return;
        }

        self.object = object;

        self.object.position.x = self.position.x;
        self.object.position.y = self.position.y;

        self.scene.add(self.object);
    }

    return Polygon;
});
