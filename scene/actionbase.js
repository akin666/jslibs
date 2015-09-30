/**
 * Created by akin on 22/09/15.
 */
define(["jquery"], function ($) {
    function ActionBase(config){
        this.self = {
            target: null,
            deferred: $.Deferred()
        };
        this.init(config);
        return this;
    }

    ActionBase.prototype.promise = function() {
        var self = this.self;
        return self.deferred.promise();
    }

    return ActionBase;
});
