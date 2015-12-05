/**
 * Created by akin on 16/11/15.
 */
"use strict";
define(
    function () {
        var dataVar = Symbol();

        class Loader {
            constructor() {
                // "private"
                this[dataVar]= {};
            }

            get data() {
                return this[dataVar];
            }

            get name() {
                return "generic";
            }

            add(loader) {
                data[loader.name] = loader;
            }

            remove(name) {
                delete data[name];
            }

            create(config) {
                var factory = data[config.type];
                if( factory === undefined ) {
                    return undefined;
                }
                return factory.create(config);
            }
        }
        return Loader;
    });
