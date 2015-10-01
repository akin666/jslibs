/**
 * Created by akin on 22/09/15.
 */
define(["three", "system/math", "./line", "./actionbase"], function (THREE, Math, Line, ActionBase) {
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
        var i = self.line.size();
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

        self.line.setPoint(i , val);
    }

    Action.prototype.commit = function(config) {
        var self = this.self;

        config.index = self.index + 1;
        config.edit = self.edit;

        self.deferred.resolve(config);
    }

    Action.prototype.revert = function() {
    }

    Action.prototype.init = function(config) {
        var self = this.self;
        if(config == null) {
            return;
        }
        // config.edit? == true

        self.edit = config.edit;
        self.target = config.target;
        self.index = config.index;

        if(self.edit) {
            var a = self.target.getPoint( self.index - 1 );
        }
        else {
            var a = self.target.getPoint( self.index );
        }
        var b = config.point;
        var c = self.target.getPoint( self.index + 1 );

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

        var lconfig = {
            parent: self.target.object(),
            attach: true,
            mesh: mesh,
            material: new THREE.LineBasicMaterial( {
                color: 0xFFAAAA,
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
