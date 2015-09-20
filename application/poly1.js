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

        var geometry = new THREE.BoxGeometry( 200, 100, 50 );
        var material = new THREE.MeshBasicMaterial( {
            color: 0x0099BB,
            wireframe: true
        });
        this.cube = new THREE.Mesh( geometry, material );

        this.cube.position.z = -100;

        this.scene.add( this.cube );

        var halfW = this.width / 2.0;
        var halfH = this.height / 2.0;

        this.camera = new THREE.OrthographicCamera(
            -halfH,
             halfW,
             halfH,
            -halfH,
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
        this.touchInput = new Input.Touch({
            element: $(this.renderer.domElement),
            target: this
        });
        this.keyInput = new Input.Keyboard({
            element: $(this.renderer.domElement),
            target: this
        });

        this.addPoly({
            x: -20,
            y: -60,
            material: material,
        });

        // start simulation right away...
        this.update();

        return this;
    }

    // specify inheritance
    Application.prototype = Object.create( Simulation.prototype );

    Application.prototype.addPoly = function(config) {
        var rectLength = 120, rectWidth = 40;

        var shape = new THREE.Shape();
        shape.moveTo( 0  ,0 );
        shape.lineTo( 0, rectWidth );
        shape.lineTo( rectLength, rectWidth );
        shape.lineTo( rectLength, 0 );
        shape.lineTo( 0, 0 );

        var geom = new THREE.ShapeGeometry( shape );
        var mesh = new THREE.Mesh( geom, config.material ) ;

        mesh.position.x = config.x;
        mesh.position.y = config.y;

        this.scene.add( mesh );
    }

    Application.prototype.pointerClick = function(config) {
        this.keyInput.bind();
    }

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
            this.keyInput.unbind();
        }
        else if (config.type == "cancel") {
            for (var i = 0; i < this.mousePosition.length; ++i) {
                // "commit"
                var data = this.mousePosition[i];

                data.delta.x = 0;
                data.delta.y = 0;
            }
            this.keyInput.unbind();
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
            this.keyInput.bind();
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

    Application.prototype.keyPress = function(config) {
        console.log("ThreeApp: key: " + config.key + " code: " + config.code);
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