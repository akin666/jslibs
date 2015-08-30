define('jsCommon' , function () {
	return function() {
		// define isset
		window.isset = function (object) {
			// anything that evaluates null is wrong!.
			// DO NOT USE '===' here
			return object != null;
		};
		// define forEach
		window.forEach = function (array , func) {
			for( var i = 0 ; i < array.length ; ++i ) {
				func(array[i]);
			}
		};
		// define runTasks
		window.runTasks = function (tasks , data) {
			if( isset(data) ) {
				for( var i = 0 ; i < tasks.length ; ++i ) {
					tasks[i](data);
				}
				return;
			}
			for( var i = 0 ; i < tasks.length ; ++i ) {
				tasks[i]();
			}
		};
	};
});