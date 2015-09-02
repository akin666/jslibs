/**
 * Created by akin on 02/09/15.
 */
define(["three", "./simulation"], function (THREE, Simulation) {
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

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.width, this.height );
        this.element.append( this.renderer.domElement );

        camera.position.z = 5;
        return this;
    }

    Application.prototype.logicUpdate = function(config){
    }

    Application.prototype.drawUpdate = function(config){
        this.renderer.render( scene, camera );
    }

    return Application;
});
