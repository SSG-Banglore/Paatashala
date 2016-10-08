(function () {
    "use strict";

    angular.module("myapp", ["ionic", "myapp.controllers", "myapp.services"])
        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state("app", {
                url: "/app",
                abstract: true,
                templateUrl: "app/templates/view-menu.html",
                controller: "appCtrl"
            })
            .state("app.home", {
                url: "/home",
                templateUrl: "app/templates/view-home.html",
                controller: "homeCtrl"
            })
            .state("register", {
                url: "register",
                templateUrl: "app/templates/register.html",
                controller: "registerCtrl"
            })
              .state("view-login", {
                  url: "view-login",
                  templateUrl: "app/templates/view-home.html",
                  controller: "registerCtrl"
              })
              .state("view-afterLogin", {
                  url: "view-afterLogin",
                  templateUrl: "app/templates/view-afterLogin.html",
                  controller: "afterLoginCtrl"
              })
                  .state("view-forgetPassword", {
                      url: "view-forgetPassword",
                      templateUrl: "app/templates/view-forgetPassword.html",
                      controller: "forgetPasswordCtrl"
                  })
            .state("view-getNewPassword", {
                url: "view-getNewPassword",
                templateUrl: "app/templates/view-getNewPassword.html",
                controller: "getNewPasswordCtrl"
            })
           
            $urlRouterProvider.otherwise("/app/home");
        });
})();