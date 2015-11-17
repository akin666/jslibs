/**
 * Created by akin on 30.8.2015.
 */
"use strict";
define(
    function () {
        var instanceID = 1;
        var idVar = Symbol();

        class Instance {
            constructor() {
                this[idVar] = ++instanceID;
            }

            get id() {
                return this[idVar];
            }
        }

        return Instance;
    });
