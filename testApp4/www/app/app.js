/// <reference path="templates/view-login.html" />
(function () {
    "use strict";

    angular.module("myapp", ["ionic", "myapp.controllers", "myapp.services", "ngCordova"])
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
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/templates/view-login.html',
                    controller: 'loginCtrl'
                })
                .state('setting', {
                    url: '/setting',
                    templateUrl: 'app/templates/view-setting.html',
                    controller: 'settingCtrl'
                })
                 .state('manage-children', {
                     url: '/manage-children',
                     templateUrl: 'app/templates/view-manage-children.html',
                     controller: 'manageChildrenCtrl'
                 })
                .state('change-student', {
                    url: '/change-student',
                    templateUrl: 'app/templates/view-change-student.html',
                    controller: 'changeStudentCtrl'
                })
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
                  url: "/view-login",
                  templateUrl: "app/templates/view-home.html",
                  controller: "registerCtrl"
              })
                  .state("view-SendVerificationCode", {
                      url: "/view-SendVerificationCode",
                      templateUrl: "app/templates/view-SendVerificationCode.html",
                      controller: "SendVerificationCodeCtrl"
                  })
                 .state("view-PassCode", {
                     url: "/view-PassCode",
                     templateUrl: "app/templates/view-PassCode.html",
                     controller: "PassCodeCtrl"
                 })
                 .state("ChangePassword", {
                     url: "/ChangePassword",
                     templateUrl: "app/templates/ChangePasswordhtml.html",
                     controller: "ChangePasswordCtrl"
                 })
              .state("view-afterLogin", {
                  url: "/view-afterLogin",
                  templateUrl: "app/templates/view-afterLogin.html",
                  controller: "afterLoginCtrl"
              })
                  .state("view-forgetPassword", {
                      url: "/view-forgetPassword",
                      templateUrl: "app/templates/view-forgetPassword.html",
                      controller: "parentForgetPasswordCtrl"
                  })
                .state("view-employeeForgetPassword", {
                    url: "/view-employeeForgetPassword",
                    templateUrl: "app/templates/view-employeeForgetPassword.html",
                    controller: "employeeForgetPasswordCtrl"
                })

            .state("view-getNewPassword", {
                url: "/view-getNewPassword",
                templateUrl: "app/templates/view-getNewPassword.html",
                controller: "getNewPasswordCtrl"
            })
            .state("view-parent-home", {
                url: "/view-parent-home",
                templateUrl: "app/templates/view-parent-home.html",
                controller: "parentHomeCtrl"
            })
                 .state("view-Employee-home", {
                     url: "/view-Employee-home",
                     templateUrl: "app/templates/view-Employee-home.html",
                     controller: "employeeHomeCtrl"
                 })
            .state("view-subject-details", {
                url: "/view-subject-details",
                templateUrl: "app/templates/view-subject-details.html",
                controller: "subjectDetailCtrl"
            })
            .state("view-feeDeatils", {
                url: "/view-feeDeatils",
                templateUrl: "app/templates/view-feeDeatils.html",
                controller: "feeDetailCtrl"
            })
             .state("view-attendence", {
                 url: "/view-attendence",
                 templateUrl: "app/templates/view-attendence.html",
                 controller: "attendenceCtrl"
             })
              .state("view-transportFacility", {
                  url: "/view-transportFacility",
                  templateUrl: "app/templates/view-transportFacility.html",
                  controller: "transportFacilityCtrl"
              })
               .state("view-hostelDetails", {
                   url: "/view-hostelDetails",
                   templateUrl: "app/templates/view-hostelDetails.html",
                   controller: "hostelDetailsCtrl"
               })
                .state("view-personalDetails", {
                    url: "/view-personalDetails",
                    templateUrl: "app/templates/view-personalDetails.html",
                    controller: "personalDetailsCtrl"
                })
                 .state("view-HomeWork-Details", {
                     url: "/view-HomeWork-Details",
                     templateUrl: "app/templates/view-HomeWork-Details.html",
                     controller: "HomeWorkDetailsCtrl"
                 })
                 .state("view-holidays", {
                     url: "/view-holidays",
                     templateUrl: "app/templates/view-holidays.html",
                     controller: "holidaysCtrl"
                 })
                  .state("view-MessageBox", {
                      url: "/view-MessageBox",
                      templateUrl: "app/templates/view-MessageBox.html",
                      controller: "MessageBoxCtrl"
                  })
                  .state("view-TimeTable", {
                      url: "/view-TimeTable",
                      templateUrl: "app/templates/view-TimeTable.html",
                      controller: "TimeTableCtrl"
                  })
                  .state("view-ExaminationDetails", {
                      url: "/view-ExaminationDetails",
                      templateUrl: "app/templates/view-ExaminationDetails.html",
                      controller: "examinationDetailsCtrl"
                  })
                  .state("view-teacherDetail", {
                      url: "/view-teacherDetail",
                      templateUrl: "app/templates/view-teacherDetail.html",
                      controller: "TeacherDetailsCtrl"
                  })
                        .state("view-assesmentReport", {
                            url: "/view-assesmentReport",
                            templateUrl: "app/templates/view-assesmentReport.html",
                            controller: "assesmentReportCtrl"
                        })
                         .state("view-filteredHomeworkDetail", {
                             url: "/view-filteredHomeworkDetail",
                             //params: {
                             //    Hwork: {
                             //        assignmentsList: {
                             //            AssignmentName: '',
                             //            Question: '',
                             //            SubjectName: ''
                             //        }
                             //    }
                             //},
                             templateUrl: "app/templates/view-filteredHomeworkDetail.html",
                             controller: "HomeWorkDetailsCtrl"
                         })
                        .state("view-profile", {
                            url: "/view-profile",
                            templateUrl: "app/templates/view-profile.html",
                            controller: "profileCtrl"
                        })
                        .state("view-signout", {
                            url: "/view-signout",
                            templateUrl: "app/templates/view-signout.html",
                            controller: "signoutCtrl"
                        })
                        .state("Geolocation", {
                            url: "/Geolocation",
                            templateUrl: "app/templates/Geolocation.html",
                            controller: "GeolocationCtrl"
                        })
                        .state("EmployeeProfile", {
                        url: "/EmployeeProfile",
                        templateUrl: "app/templates/EmployeeProfile.html",
                        controller: "EmployeeProfileCtrl"
                        })
                  .state("EmployeeSettings", {
                      url: "/EmployeeSettings",
                      templateUrl: "app/templates/view-EmployeeSettings.html",
                      controller: "EmployeeSettingsCtrl"
                  })
                       .state("Employeeholidays", {
                           url: "/Employeeholidays",
                       templateUrl: "app/templates/view-EmployeeHolidays.html",
                       controller: "EmployeeHolidaysCtrl"
                        })
                          .state("barCodeScanner", {
                              url: "/barCodeScanner",
                              templateUrl: "app/templates/barCodeScanner.html",
                              controller: "barCodeScannerCtrl"
                          })
            ;
            if (localStorage['LoginUser'] && localStorage['LoginType'] == 'Parent') {
                $urlRouterProvider.otherwise("/view-parent-home");
            }
            else if (localStorage['LoginUser'] && localStorage['LoginType'] == 'Employee') {
                $urlRouterProvider.otherwise("/view-Employee-home");
            }
            else {
                $urlRouterProvider.otherwise("/login");
                //$urlRouterProvider.otherwise("/view-parent-home");
            }

            //$urlRouterProvider.otherwise("/login");
        });
})();