/**
 * Created by akin on 02/09/15.
 */
define(["three", "./simulation", "input"], function (THREE, Simulation, Input) {
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

        var geometry = new THREE.BoxGeometry( 2, 2, 2 );
        var material = new THREE.MeshBasicMaterial( {
            color: 0x0099BB,
            wireframe: true
        });
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );

        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );


        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );

        this.mousePosition = [];
        for( var i = 0 ; i < 5 ; ++i ) {
            this.mousePosition.push({
                origo: {
                    x:0,
                    y:0
                },
                delta: {
                    x:0,
                    y:0
                },
                value: {
                    x:0,
                    y:0
                },
            });
        }

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize( this.width, this.height );
        this.element.append( this.renderer.domElement );

        this.camera.position.z = 5;

        this.mouseInput = new Input.Mouse({
            element: $(this.renderer.domElement),
            target: this
        });

        // start simulation right away...
        this.update();

        return this;
    }

    // specify inheritance
    Application.prototype = Object.create( Simulation.prototype );

    Application.prototype.onMouse = function(config) {
        var button = config.button;
        if( button <= 0 ) {
            return;
        }
        var data = this.mousePosition[button];
        switch(config.type)
        {
            case "down" : {
                data.origo.x = config.x;
                data.origo.y = config.y;
                data.delta.x = 0;
                data.delta.y = 0;
                break;
            }
            case "move" : {
                data.delta.x = config.x - data.origo.x;
                data.delta.y = config.y - data.origo.y;

                break;
            }
            case "leave" :
            case "up" : {
                // "commit"
                data.value.x += data.delta.x;
                data.value.y += data.delta.y;
                data.delta.x = 0;
                data.delta.y = 0;
                break;
            }
            default:
                break;
        }
        if(config.type=="down") {
            data.origo.x = config.x;
            data.origo.y = config.y;
            return;
        }
    }

    Application.prototype.logicUpdate = function(config){
        //this.cube.rotation.x += 1.0 * config.delta;
        //this.cube.rotation.y += 1.0 * config.delta;

        var data = this.mousePosition[1];
        this.cube.rotation.y = (data.value.x + data.delta.x) * 0.02;
        this.cube.rotation.x = (data.value.y + data.delta.y) * 0.02;
    }

    Application.prototype.drawUpdate = function(config){
        this.renderer.render( this.scene, this.camera );
    }

    return Application;
});
