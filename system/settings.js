/**
 * Created by akin on 1.9.2015.
 */
"use strict";
define([
    "./serialize"],
    function (
        Serialize)  {
        var dataVar = Symbol();
        var serializerVar = Symbol();
        class Settings {
            constructor(config) {
                this[dataVar] = null;
                this[serializerVar] = new Serialize();
            }

            set data(val) {
                this[dataVar] = val;
            }

            get data() {
                return this[dataVar];
            }

            set serializer(val) {
                this[serializerVar] = val;
            }

            get serializer() {
                return this[serializerVar];
            }

            import(config) {
            }

            export() {
            }

            get(key, expectedDefaultValue) {
                var current = this.data[key];
                if (current == null) {
                    return expectedDefaultValue;
                }

                // unserialize etc.
                if (current.serialized) {
                    return this.serializer.unserialize(current.value);
                }
                return current.value;
            }

            set(key, value) {
                if (key == null) {
                    return value;
                }

                // The data is in complex class, lets try to transform it into POD class.
                var result = {
                    value: value,
                    serialized: false
                };
                var data = this.serializer.serialize(value);
                if (data != null) {
                    result.value = data;
                    result.serialized = true;
                }

                this.data[key] = result;

                return value;
            }

            clear(key) {
                // clear all?
                if (key == null) {
                    this.data = {};
                    return value;
                }

                // delete self.data[key] ?does this work?.. TODO
                this.data[key] = undefined;

                return value;
            }
        }
        return Settings;
    });
