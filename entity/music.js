/**
 * Created by akin on 30.8.2015.
 */
define(['./instance'] , function (Instance) {
    function Music( file ){
        // Call super
        Instance.call( this );
        this._file = file;

        return this;
    }

    // class extends the base class.
    Music.prototype = Object.create( Instance.prototype );

    Music.prototype.getFile = function(){
        return( this._file );
    }

    return Music;
});
