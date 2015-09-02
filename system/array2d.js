/**
 * Created by akin on 1.9.2015.
 */
define(function () {
    function Array2D(config){
        this.resetValue = 0;
        this.init(config);
        return this;
    }

    Array2D.prototype.init = function(config) {
        this.width = parseInt(config.width);
        this.height = parseInt(config.height);
        if( config.resetValue != null ) {
            this.resetValue = config.resetValue;
        }

        this.data = new Array(
            this.width * this.height
        );
        this.reset();
    }

    Array2D.prototype.reset = function() {
        for( var i = 0 ; i < this.data.length ; ++i ) {
            this.data[i] = this.resetValue;
        }
    }

    Array2D.prototype.raw = function() {
        return this.data;
    }

    Array2D.prototype.cell = function(x , y , val) {
        if( x == null || y == null ) {
            return this.resetValue;
        }
        while( x < 0 ) x += this.width;
        while( x >= this.width ) x -= this.width;
        while( y < 0 ) y += this.height;
        while( y >= this.height ) y -= this.height;

        if( val != null ) {
            this.data[y * this.width + x] = val;
            return val;
        }
        return this.data[y * this.width + x];
    }

    return Array2D;
});
