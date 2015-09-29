/**
 * Created by akin on 22/09/15.
 */
define(["three", "../system/math", "./base"], function (THREE, Math, Base) {
    function Line(config){
        Base.call( this , config );

        return this;
    }

    // specify inheritance
    Line.prototype = Object.create( Base.prototype );

    Line.prototype.apply = function() {
        this.destroyGraphics();
        var self = this.self;

        var geom = new THREE.Geometry();
        for (var i = 0; i < self.mesh.length; ++i) {
            geom.vertices.push(self.mesh[i]);
        }
        var object = new THREE.Line( geom, self.material ) ;

        if(object == null) {
            return;
        }

        self.graphics = object;
        self.object.add(self.graphics);
    }

    return Line;
});
