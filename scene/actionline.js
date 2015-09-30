/**
 * Created by akin on 22/09/15.
 */
define(["three", "../system/math", "./line", "./actionbase"], function (THREE, Math, Line, ActionBase) {
    function Action(config){
        ActionBase.call( this , config );
        return this;
    }

    // specify inheritance
    Action.prototype = Object.create( ActionBase.prototype );

    Action.prototype.destroy = function() {
        var self = this.self;
        if( self.line != null) {
            self.line.destroy();
        }
    }

    Action.prototype.move = function(val) {
        var self = this.self;

        var index = this.getClosestIndex(val);

        var a = self.target.getPointAt( index );
        var b = self.target.getPointAt( index + 1 );

        self.line.setPointAt(0 , a);
        self.line.setPointAt(1 , b);
    }

    Action.prototype.getClosestIndex = function(point) {
        // 3d.. get .. maybe reduce to 2D ..
        var self = this.self;
        return Math.findClosestLine(point , self.target.mesh() );
    }

    Action.prototype.commit = function(config) {
        var self = this.self;

        config.index = this.getClosestIndex(config.point);

        self.deferred.resolve(config);
    }

    Action.prototype.init = function(config) {
        var self = this.self;
        if(config == null) {
            return;
        }
        self.target = config.target;

        var index = this.getClosestIndex(config.point);

        var a = self.target.getPointAt( index );
        var b = self.target.getPointAt( index + 1 );

        var mesh = [
        ];

        if( a != null ) {
            mesh.push(a);
        }
        if( b != null ) {
            mesh.push(b);
        }

        var lconfig = {
            parent: self.target.object(),
            mesh: mesh,
            material: new THREE.LineBasicMaterial({
                color: 0xFF00FF,
                linewidth: 2.0
            })
        };

        if( self.line == null ) {
            self.line = new Line(lconfig);
        }
        else {
            self.line.init(lconfig);
        }
    }

    return Action;
});
