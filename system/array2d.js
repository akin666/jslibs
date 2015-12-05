/**
 * Created by akin on 1.9.2015.
 */
"use strict";
define(
    function () {
        var resetVar = Symbol();
        var sizeVar = Symbol();
        class Array2D {
            constructor(config) {
                this[resetVar] = 0;
                this[sizeVar] = {
                    width: 0,
                    height: 0
                }
                this.data = null;
                this.init(config);
            }

            init(config) {
                this[sizeVar] = {
                    width: parseInt(config.width),
                    height: parseInt(config.height)
                }

                if (config.resetValue != null) {
                    this.resetValue = config.resetValue;
                }

                this.data = new Array(
                    this.width * this.height
                );
                this.reset();
            }

            get resetValue() {
                return this[resetVar];
            }

            set resetValue(val) {
                this[resetVar] = val;
            }

            get width() {
                return this[sizeVar].width;
            }

            set width(val) {
                this[sizeVar].width = val;
            }

            get height() {
                return this[sizeVar].height;
            }

            set height(val) {
                this[sizeVar].height = val;
            }

            reset() {
                for (var i = 0; i < this.data.length; ++i) {
                    this.data[i] = this.resetValue;
                }
            }

            raw() {
                return this.data;
            }

            cell(x, y, val) {
                if (x == null || y == null) {
                    return this.resetValue;
                }
                while (x < 0) x += this.width;
                while (x >= this.width) x -= this.width;
                while (y < 0) y += this.height;
                while (y >= this.height) y -= this.height;

                if (val != null) {
                    this.data[y * this.width + x] = val;
                    return val;
                }
                return this.data[y * this.width + x];
            }
        }

        require(["yat", "./system/array2d.test"], function(yat, Test){
            var runner = new yat.Runner();
            runner.run(new Test(Array2D));
            runner.print(function(val){ console.log(val); });
        });

        return Array2D;
    });
