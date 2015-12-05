/**
 * Created by akin on 02/09/15.
 */
"use strict";
define([
    "jquery",
    "three",
    "system",
    "system/settings",
    "scene",
    "./simulation",
    "guilt/loader"],
    function (
        $,
        THREE,
        System,
        Settings,
        Scene,
        Simulation,
        GuiltLoader) {
        class Application extends Simulation {
            constructor(config) {
                super(config);

                this.settings = new Settings();

                var element = config.element;
                if( element != null ) {
                    var source = element.attr('source');
                    if( source !== undefined ) {
                        var app = this;
                        $.getJSON(source, function(data){
                            app.load(data);
                        });
                    }
                }

                // ThreeJS test app
                this.width = this.element.width();
                this.height = this.element.height();
                this.aspect = this.width / this.height;
                this.fov = 75;
                this.near = 0.1;
                this.far = 1000;

                console.log("Canvas size is " + this.width + "x" + this.height);

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

                this.renderer = new THREE.WebGLRenderer({
                    antialias: true
                });
                this.renderer.setSize(this.width, this.height);
                this.element.append(this.renderer.domElement);

                this.camera.position.z = 1.0;

                this.action = null;

                // start simulation right away...
                this.update();
            }

            load(config) {
                if (config == null) {
                    return;
                }
                if (config["//"] !== undefined) {
                    console.log(config["//"]);
                }
                if (config["items"] !== undefined) {
                    for (var i = 0; i < config.items.length; ++i) {
                        var item = config.items[i];
                    }
                }
            }


            logicUpdate(config) {
            }

            drawUpdate(config) {
                this.renderer.render(
                    this.scene,
                    this.camera
                );
            }
        }

        return Application;
    });
