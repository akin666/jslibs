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

    Application.prototype.pointerButton = function(config) {
        var button = config.button;
        if( button == 0 ) {
            return;
        }

        var data = this.mousePosition[button];
        if( config.down ) {
            data.origo.x = config.x;
            data.origo.y = config.y;
            data.delta.x = 0;
            data.delta.y = 0;
        }
        else {
            // "commit"
            data.value.x += data.delta.x;
            data.value.y += data.delta.y;
            data.delta.x = 0;
            data.delta.y = 0;
        }
    }

    Application.prototype.pointerAction = function(config) {
        if (config.type == "end") {
            for (var i = 0; i < this.mousePosition.length; ++i) {
                // "commit"
                var data = this.mousePosition[i];

                data.value.x += data.delta.x;
                data.value.y += data.delta.y;
                data.delta.x = 0;
                data.delta.y = 0;
            }
        }
        else if (config.type == "cancel") {
            for (var i = 0; i < this.mousePosition.length; ++i) {
                // "commit"
                var data = this.mousePosition[i];

                data.delta.x = 0;
                data.delta.y = 0;
            }
        }
        else if( config.type == "continue" ) {
            for (var i = 0; i < this.mousePosition.length; ++i) {
                // "commit"
                var data = this.mousePosition[i];

                data.origo.x = config.x;
                data.origo.y = config.y;
                data.delta.x = 0;
                data.delta.y = 0;
            }
        }
    }

    Application.prototype.pointerMove = function(config) {
        if (config.button == null || config.button.length > 0) {
            var data = this.mousePosition[config.button[0]];
            if (config.type == "move" )
            {
                data.delta.x = config.x - data.origo.x;
                data.delta.y = config.y - data.origo.y;
            }
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
