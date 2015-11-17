/**
 * Created by akin on 30.8.2015.
 */
"use strict";
define([
    './instance'] ,
    function (Instance) {
        var fileVar = Symbol();
        class Music extends Instance {
            constructor( file ){
                // Call super
                super();

                this[fileVar] = file;
            }

            get file(){
                return this[fileVar];
            }
        }
        return Music;
    });
