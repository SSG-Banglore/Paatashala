(function () {
    "use strict";

    angular.module("myapp.services", [])

    .factory('authInterceptorService', ['$q', '$location', function ($q, $location) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {
            config.headers = config.headers || {};
            if (config.url.startsWith('http://')) {
                var authData = localStorage['token'];
                if (authData) {
                    debugger;
                    config.headers["Token"] = authData;
                }
            }

            return config;
        }

        var _responseError = function (rejection) {
            debugger;
            if (rejection.status === 401) {
                //localStorage.removeItem("LoginUser");
                localStorage.removeItem("LoginType");
                //localStorage.clear();
                location.reload();
            }
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }])
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