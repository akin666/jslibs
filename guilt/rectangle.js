/**
 * Created by akin on 16/11/15.
 */
"use strict";
define([
    "three",
    "./node"],
    function (
        THREE,
        Node) {
        class Rectangle extends Node {
            constructor(settings) {
                super(settings);
            }

            setup(settings) {
                super.setup(settings);
            }
        }

        return Rectangle;
    });
