/**
 * Created by akin on 30.8.2015.
 */
define(function () {
    var instanceID = 1;

    function Instance(){
        this._ID = ++instanceID;
        return this ;
    }

    Instance.prototype.getID = function() {
        return this._ID;
    }

    return Instance;
});
