/**
 * Created by akin on 22/09/15.
 */
"use strict";
define([
    "jquery"],
    function (
        $) {
        var deferVar = Symbol();
        var targetVar = Symbol();
        class Action {
            constructor(config) {
                this[deferVar] = $.Deferred();
                this[targetVar] = null;
                this.init(config);
            }

            get promise() {
                return this[deferVar].promise();
            }

            get deferred() {
                return this[deferVar];
            }

            get target() {
                return this[targetVar];
            }
        }
        return Action;
    });
