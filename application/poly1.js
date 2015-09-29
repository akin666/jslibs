/**
 * Created by akin on 02/09/15.
 */
define(["three", "system", "scene", "./simulation", "input"], function (THREE, System, Scene, Simulation, Input) {
    function Application(config){
        Simulation.call( this , config );

        // ThreeJS test app
        this.width = this.element.width();
        this.height = this.element.height();
        this.aspect = this.width / this.height;
        this.fov = 75;
        this.near = 0.1;
        this.far = 1000;

        this.scene = new THREE.Scene();

        var halfW = this.width / 2.0;
        var halfH = this.height / 2.0;

        this.camera = new THREE.OrthographicCamera(
            -halfW,
             halfW,
             halfH,
            -halfH,
            this.near,
            this.far
        );

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize( this.width, this.height );
        this.element.append( this.renderer.domElement );

        this.camera.position.z = 1.0;

        var un = 20;

        this.polygon = new Scene.Polygon({
            parent: this.scene,
            attach: true,
            mesh: [
                new THREE.Vector3( -un, un, 0 ),
                new THREE.Vector3(  un, un, 0 ),
                new THREE.Vector3(  un,-un, 0 ),
                new THREE.Vector3( -un,-un, 0 ),
            ],
            material: new THREE.LineBasicMaterial( {
                color: 0xFFFFFF,
            }),
            position: new THREE.Vector3( -20, -60, 0 )
        });

        this.editor = new Scene.PolygonEditor({
            polygon: this.polygon,
            element: $(this.renderer.domElement)
        });

        this.action = null;

        // start simulation right away...
        this.update();

        return this;
    }

    // specify inheritance
    Application.prototype = Object.create( Simulation.prototype );

    Application.prototype.logicUpdate = function(config){
    }

    Application.prototype.drawUpdate = function(config){
        this.renderer.render( this.scene, this.camera );
    }

    return Application;
});
