/**
 * Created by akin on 02/09/15.
 */
define(["three", "./simulation"], function (THREE, Simulation) {
    function Application(config){
        Simulation.call( this , config );

        // ThreeJS test app
        this.width = this.element.width();
        this.height = this.element.height();
        this.aspect = this.width / this.height;
        this.fov = 75;
        this.near = 0.1;
        this.far = 1000;

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.cube = new THREE.Mesh( geometry, material );

        this.scene = new THREE.Scene();

        this.scene.add( this.cube );

        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.width, this.height );
        this.element.append( this.renderer.domElement );

        this.camera.position.z = 5;

        // start simulation right away...
        this.update();

        return this;
    }

    // specify inheritance
    Application.prototype = Object.create( Simulation.prototype );

    Application.prototype.logicUpdate = function(config){
        this.cube.rotation.x += 1.0 * config.delta;
        this.cube.rotation.y += 1.0 * config.delta;
    }

    Application.prototype.drawUpdate = function(config){
        this.renderer.render( this.scene, this.camera );
    }

    return Application;
});
