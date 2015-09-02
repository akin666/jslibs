/**
 * Created by akin on 02/09/15.
 */
define(["system"], function (System) {
    function Application(config){
        this.element = config.element;

        // ThreeJS test app
        this.width = this.element[0].innerWidth;
        this.height = this.element[0].innerHeight;
        this.aspect = this.width / this.height;
        this.fov = 75;
        this.near = 0.1;
        this.far = 1000;

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );

        this.scene = new THREE.Scene();

        this.scene.add( cube );

        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );

        camera.position.z = 5;
        return this;
    }

    Application.prototype.initRenderer = function() {

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.width, this.height );
        this.element.append( this.renderer.domElement );
    }

    Application.prototype.logicUpdate = function(config){
    }

    Application.prototype.drawUpdate = function(config){
    }

    Application.prototype.update = function() {
        this.updateID = requestAnimationFrame( this.update.bind(this) );
        this.time.apply();

        var delta = this.time.getDelta();
        if( delta > this.maxSimulationTime ) {
            delta = 0.0;
        }

        this.logicUpdate({
            delta: delta
        });
        this.drawUpdate({
        });
    }

    Application.prototype.exit = function() {
        cancelAnimationFrame(this.updateID);
        this.updateID = null;
    }

    return Application;
});
