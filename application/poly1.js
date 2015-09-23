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
            -halfW,
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

        this.camera.position.z = 1.0;

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

        var un = 20;
        this.poly = new Scene.Polygon({
            scene: this.scene,
            mesh: [
                {x: -un, y: un, z:0 },
                {x:  un, y: un, z:0 },
                {x:  un, y:-un, z:0 },
                {x: -un, y:-un, z:0 },
            ],
            position: {
                x: -20,
                y: -60,
            },
            material: new THREE.LineBasicMaterial( {
                color: 0xFF99BB,
            })
        });

        // start simulation right away...
        this.update();

        return this;
    }

    // specify inheritance
    Application.prototype = Object.create( Simulation.prototype );

    Application.prototype.pointerClick = function(config) {
        this.keyInput.bind();

        var point = this.screenToScene(config);

        this.poly.addPoint({
            x: point.x ,
            y: point.y ,
            z: 0
        });
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

    Application.prototype.screenToScene = function(point)
    {
        return {
            x: point.x - (this.width / 2.0),
            y: -point.y + (this.height / 2.0)
        };
    }

    Application.prototype.pointerMove = function(config) {
        if (config.button == null || config.button.length > 0) {
            var data = this.mousePosition[config.button[0]];
            if (config.type == "move" )
            {
                data.delta.x = config.x - data.origo.x;
                data.delta.y = config.y - data.origo.y;
            }

            var point = this.screenToScene(config);

            this.poly.position( point );
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
