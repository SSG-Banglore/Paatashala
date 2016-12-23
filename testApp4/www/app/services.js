(function () {
    "use strict";

    angular.module("myapp.services", [])
     .factory("myappService", ["$rootScope", "$http", function ($rootScope, $http) {
         var myappService = {};

         //starts and stops the application waiting indicator
         myappService.wait = function (show) {
             if (show)
                 $(".spinner").show();
             else
                 $(".spinner").hide();
         };

         return myappService;
     }])
    .factory('$CustomLS', [function () {
        return {
            getObject: function (key, defaultValue) {
                var data = localStorage[key];
                if (data) {
                    return JSON.parse(data);
                }
                else {
                    return defaultValue;
                }
            },
            setObject: function (key, value) {
                localStorage[key] = JSON.stringify(value);
            }
        };

    }]);

})();