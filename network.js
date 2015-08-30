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

(function () {
    // Network libary
    // Uses jquery ajax
    // http://api.jquery.com/jquery.ajax/
    // We are assuming JSON almost every corner here.
    if (!isset(window.Network)) {
        // Network is at Global scope, hence, no var.
        window.Network = {
            timeout: 10 * 1000
        };
        var Network = window.Network;

        var parseArgs = function (args) {
            var url = "";
            if (!isset(args)) {
                return url;
            }

            // Array
            if (args instanceof Array) {
                if (args.length > 0) {
                    var i = 0;
                    url += '?' + args[i].key + (isset(args[i].value) ? ('=' + args[i].value) : '');
                    for (i = 1 ; i < args.length ; ++i) {
                        url += '&' + args[i].key + (isset(args[i].value) ? ('=' + args[i].value) : '');
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
                            url += (at == 0 ? '?' : '&') + (isset(ival) ? (key + '=' + ival) : key);
                            ++at;
                        }
                        continue;
                    }

                    url += (at == 0 ? '?' : '&') + (isset(value) ? (key + '=' + value) : key);
                    ++at;
                }
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
        Network.post = function (config) {
            var headers = {
                'Accept': 'application/json, text/javascript; q=0.01',
                'Content-Type': 'application/json; charset=utf-8'
            };

            var req = {
                type: "POST"
            };

            var url = config.service;
            if (isset(config.server)) {
                url = config.server + config.service;
            }

            // arguments..
            url += parseArgs(config.args);

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

            var url = config.service;
            if (isset(config.server)) {
                url = config.server + config.service;
            }

            // arguments..
            url += parseArgs(config.args);

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

            var url = config.service;
            if (isset(config.server)) {
                url = config.server + config.service;
            }

            // arguments..
            url += parseArgs(config.args);

            req.timeout = isset(config.timeout) ? config.timeout : Network.timeout;
            req.headers = headers;
            req.url = url;
            req.data = JSON.stringify(config.data);

            return $.ajax(req);
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

            var url = config.service;
            if (isset(config.server)) {
                url = config.server + config.service;
            }

            // arguments..
            url += parseArgs(config.args);

            req.timeout = isset(config.timeout) ? config.timeout : Network.timeout;
            req.headers = headers;
            req.url = url;

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

            var url = config.service;
            if (isset(config.server)) {
                url = config.server + config.service;
            }

            // arguments..
            url += parseArgs(config.args);

            req.timeout = isset(config.timeout) ? config.timeout : Network.timeout;
            req.headers = headers;
            req.url = url;

            return $.ajax(req);
        };
    }
})();
