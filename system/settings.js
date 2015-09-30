/**
 * Created by akin on 1.9.2015.
 */
define(["./serialize"], function (Serialize)  {
    function Settings(config){
        this.self = {
            data: {},
            serializer: new Serialize()
        };
        return this;
    }

    Settings.prototype.import = function(config) {
        var self = this.self;
    }

    Settings.prototype.export = function() {
        var self = this.self;
    }

    Settings.prototype.get = function (key , expectedDefaultValue) {
        var self = this.self;

        var current = self.data[key];
        if(current == null) {
            return expectedDefaultValue;
        }

        // unserialize etc.
        if( current.serialized ) {
            return self.serializer.unserialize(current.value);
        }
        return current.value;
    }

    Settings.prototype.set = function (key , value) {
        var self = this.self;

        if( key == null ) {
            return value;
        }

        // The data is in complex class, lets try to transform it into POD class.
        var result = {
            value: value,
            serialized: false
        };
        var data = self.serializer.serialize(value);
        if( data != null ) {
            result.value = data;
            result.serialized = true;
        }

        self.data[key] = result;

        return value;
    }

    Settings.prototype.clear = function (key) {
        var self = this.self;

        // clear all?
        if( key == null ) {
            self.data = {};
            return value;
        }

        // delete self.data[key] ?does this work?.. TODO
        self.data[key] = undefined;

        return value;
    }

    return Settings;
});
