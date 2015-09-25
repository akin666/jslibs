/**
 * Created by akin on 22/09/15.
 */
define(["three", "../system/math", "./line"], function (THREE, Math, Line) {
    function Action(config){
        this.self = {
            target: null,
            line: new Line()
        };
        this.init(config);
        return this;
    }

    Action.prototype.destroy = function() {
        var self = this.self;
        if( self.line != null) {
            self.line.destroy();
        }
    }

    Action.prototype.move = function(val) {
        var self = this.self;
        var i = self.line.count();
        if( i <= 0 ) {
            return;
        }
        else if( i === 1 ) {
            i = 0;
        }
        else if( i === 2 ) {
            i = 1;
        }
        else {
            i -= 2;
        }

        self.line.setPointAt(i , val);
    }

    Action.prototype.commit = function() {
    }

    Action.prototype.revert = function() {
    }

    Action.prototype.init = function(config) {
        var self = this.self;
        this.destroy();
        if(config == null) {
            return;
        }

        self.target = config.target;
        self.index = config.index;

        var a = self.target.getPointAt( self.index );
        var b = config.point;
        var c = self.target.getPointAt( self.index +1 );

        var mesh = [
        ];

        if( a != null ) {
            mesh.push(a);
        }
        if( b != null ) {
            mesh.push(b);
        }
        if( c != null ) {
            mesh.push(c);
        }

        self.line.init({
            scene: self.target.scene(),
            attach: true,
            mesh: mesh,
            material: new THREE.LineBasicMaterial( {
                color: 0xFFAAAA,
            }),
            position: self.target.position()
        });
    }

    return Action;
});
