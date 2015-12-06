/**
 * Created by akin on 1.9.2015.
 */
"use strict";
define(["./array2d"],
    function (Array2D)  {
        var test = {
            name: "system/Array2D",
            testWidth(assert) {
                var target = new Array2D({
                    width: 100,
                    height: 200
                });

                assert.equal( target.width , 100 );
            },
            testHeight(assert) {
                var target = new Array2D({
                    width: 100,
                    height: 200
                });

                assert.equal( target.height , 200 );
            }
        };

        return test;
    });
