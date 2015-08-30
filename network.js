/*
Contains:

	Network:
		Network.get({
			server: $scope.server,
			service: 'imert/eries',
			args: [{key:'lang', value:'en'}]
		})
		.then(function (httpresponse)
		{
		},
		function(err){
			alert("FAIL");
		});
		Network.post({
			service: 'www.google.fi',
			args: [{key:'lang', value:'fi'}]
			data: {foo:'foo'}
		})
		.then(function (httpresponse)
		{
		},
		function(err){
			alert("FAIL");
		});

		// Well, this is for easy injection of prefabricated data..
		// so that the data fetch uses futures. (and may be replaced with network query in the future..)
		return Network.pre({
            success: true,
			data: {
                MyData: [1,2,3,4,5]
            }
		});
*/
// Network libary
// Uses jquery ajax
// http://api.jquery.com/jquery.ajax/
// We are assuming JSON almost every corner here.
define('jslibs/network', ['jslibs/common',"jquery"] , function (common, $) {
    var Network = {
        timeout: 10 * 1000
    };

    var parseUrl = function(config) {
        var url = isset(config.service) ? config.service : '';
        if (isset(config.server)) {
            url = config.server + (url);
        }

        var args = config.args;
        if (isset(args))
        {
            var params = "";
            // Array
            if (args instanceof Array) {
                if (args.length > 0) {
                    // first is a '?'
                    var i = 0;
                    params += '?' + args[i].key + (isset(args[i].value) ? ('=' + args[i].value) : '');
                    // rest are '&'
                    for (i = 1 ; i < args.length ; ++i) {
                        params += '&' + args[i].key + (isset(args[i].value) ? ('=' + args[i].value) : '');
                    }
                }
            }
            else {
                // Object
                var at = 0;
                for (var key in args) {
                    var value = args[key];

                    if (value instanceof Array) {
                        for (var i = 0 ; i < value.length ; ++i) {
                            var ival = value[i];
                            params += (at == 0 ? '?' : '&') + (isset(ival) ? (key + '=' + ival) : key);
                            ++at;
                        }
                        continue;
                    }
                    params += (at == 0 ? '?' : '&') + (isset(value) ? (key + '=' + value) : key);
                    ++at;
                }
            }

            url += params;
        }
        return url;
    }

    Network.pre = function (config) {
        return {
            then: function (success, fail, progress) {
                if (isset(config.success) && (!config.success)) {
                    fail({
                        status: (isset(config.errorCode) ? config.errorCode : 0)
                    });
                    return;
                }
                success(config.data);
            }
        }
    };

    // TODO! untested
    Network.get = function (config) {
        var headers = {
            'Accept': 'application/json, text/javascript; q=0.01',
            'Content-Type': 'application/json; charset=utf-8'
        };

        var req = {
            type: "GET"
        };

        var url = parseUrl(config);

        req.timeout = isset(config.timeout) ? config.timeout : Network.timeout;
        req.headers = headers;
        req.url = url;

        return $.ajax(req);
    };

    // TODO! untested
    Network.post = function (config) {
        var headers = {
            'Accept': 'application/json, text/javascript; q=0.01',
            'Content-Type': 'application/json; charset=utf-8'
        };

        var req = {
            type: "POST"
        };

        var url = parseUrl(config);

        req.timeout = isset(config.timeout) ? config.timeout : Network.timeout;
        req.headers = headers;
        req.url = url;
        req.data = JSON.stringify(config.data);

        return $.ajax(req);
    };

    // TODO! untested
    this.postFile = function (config) {
        var headers = {
        };

        var req = {
            type: "POST"
        };

        var url = parseUrl(config);

        req.url = url;
        req.data = config.data;
        req.cache = false;
        req.contentType = false;
        req.processData = false;
        req.timeout = isset(config.timeout) ? config.timeout : Network.timeout;
        req.headers = headers;

        return $.ajax(req);
    };

    // untested
    this.postImage = function (config) {
        var image = config.data;

        var fd = new FormData();
        fd.append('file', image);
        var filename = image.name;

        config.data = fd;

        return this.postFile(config);
    };

    // TODO! untested
    this.put = function (config) {
        var headers = {
            'Accept': 'application/json, text/javascript; q=0.01',
            'Content-Type': 'application/json; charset=utf-8'
        };

        var req = {
            type: "PUT"
        };

        var url = parseUrl(config);

        req.timeout = isset(config.timeout) ? config.timeout : Network.timeout;
        req.headers = headers;
        req.url = url;
        req.data = JSON.stringify(config.data);

        return $.ajax(req);
    };

    // TODO! untested
    this.delete = function (config) {
        var headers = {
            'Accept': 'application/json, text/javascript; q=0.01',
            'Content-Type': 'application/json; charset=utf-8'
        };

        var req = {
            type: "DELETE"
        };

        var url = parseUrl(config);

        req.timeout = isset(config.timeout) ? config.timeout : Network.timeout;
        req.headers = headers;
        req.url = url;

        return $.ajax(req);
    };

    return Network;
});
