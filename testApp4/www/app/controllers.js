(function () {
    "use strict";
    var IpConfig = "192.168.1.34";
    angular.module("myapp.controllers", [])

    .controller("appCtrl", ["$scope", function ($scope) {
    }])

    //homeCtrl provides the logic for the home screen
    .controller("homeCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {


        $scope.goAfterLogin = function (data) {

            //var Username = "";
            //var Password = ""
            //Username = data.username;
            //Password = data.password;

            //var postObject = {
            //    "Username": Username,
            //    "Password":Password
            //};

            //$http.post('http://' + IpConfig + '/SMSAPI/User/Login', JSON.stringify(postObject)).then(function (res) {
            //    console.log(res);

            //    if (res.data.Status === true) {
            //        $state.go('view-afterLogin');
            //    }
            //})

        }
        $scope.goRegister = function () {
            $state.go('register');
        }
        $scope.forgotPass = function () {
            $state.go('view-forgetPassword');
        }
        $scope.parentHome = function () {
            $state.go('view-parent-home');
        }

    }])
       .controller("registerCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {

           $http.get('http://' + IpConfig + '/SMSAPI/School/GetAll').then(function (res) {

               debugger;
               console.log(res);
               $scope.SchoolList = res.data;
           });

           //$scope.getCourse = function (student) {
           //    var OrgId = "";
           //    OrgId = student.school;

           //    debugger;
           //    $http.post('http://' + IpConfig + '/SMSAPI/Course/GetAllByOrg', { OrgId }).then(function (res) {
           //        debugger;
           //        console.log(res);
           //        $scope.CourseList = res.data;
           //    })
           //}

           //$scope.gologin = function (data) {
           //    debugger;

           //    $state.go('view-login');
           //}
           //$scope.register = function (data) {
           //    $http.post('http://' + IpConfig + '/SMSAPI/Course/GetAllByOrg', { OrgId }).then(function (res) {
           //        debugger;
           //        console.log(res);
           //        $scope.CourseList = res.data;
           //    })
           //}
       }])
        .controller("afterLoginCtrl", ["$scope", "$state", function ($scope, $state) {


        }])
         .controller("forgetPasswordCtrl", ["$scope", "$state", function ($scope, $state) {
             $scope.submitEmail = function () {

                 $state.go('view-getNewPassword');
             }

         }])
        .controller("getNewPasswordCtrl", ["$scope", "$state", function ($scope, $state) {


        }])
         .controller("parentHomeCtrl", ["$scope", "$state", "$ionicPopover", function ($scope, $state, $ionicPopover) {
             $scope.Pages = [
                { "Name": "Fee Details", "Href": "#/view-feeDeatils", "Icon": "ion-card" },
                { "Name": "Bar Code Scanner", "Href": "#/barCodeScanner", "Icon": "ion-qr-scanner" },
                { "Name": "Geo Location", "Href": "#/Geolocation", "Icon": "ion-location" },
                { "Name": "Subject Details", "Href": "#/view-subject-details", "Icon": "ion-ios-book" },
                { "Name": "Transport Facilty", "Href": "#/view-transportFacility", "Icon": "ion-android-bus" },
                { "Name": "Hostel Details", "Href": "#/view-hostelDetails", "Icon": "ion-ios-home" },
                { "Name": "Personal Details", "Href": "#/view-personalDetails", "Icon": "ion-android-person" },
                { "Name": "Homework Details", "Href": "#/view-HomeWork-Details", "Icon": "ion-printer" },
                { "Name": "Holidays", "Href": "#/view-holidays", "Icon": "ion-android-bicycle" },
                { "Name": "Message Box", "Href": "#/view-MessageBox", "Icon": "ion-android-chat" },
                { "Name": "Time Table", "Href": "#/view-TimeTable", "Icon": "ion-android-clipboard" },
                { "Name": "Exam Details", "Href": "#/view-ExaminationDetails", "Icon": "ion-ios-book-outline" },
                { "Name": "Teacher Details", "Href": "#/view-teacherDetail", "Icon": "ion-person" },
                { "Name": "Assesment Report", "Href": "#/view-assesmentReport", "Icon": "ion-ribbon-a" },
             ];

             $scope.submitEmail = function () {
                 $state.go('view-subject-details');
             }
             $ionicPopover.fromTemplateUrl('my-popover.html', {
                 scope: $scope
             }).then(function (popover) {
                 $scope.popover = popover;
             });


             $scope.openPopover = function ($event) {
                 $scope.popover.show($event);
             };
             $scope.closePopover = function () {
                 $scope.popover.hide();
             };
             //Cleanup the popover when we're done with it!
             $scope.$on('$destroy', function () {
                 $scope.popover.remove();
             });
             // Execute action on hidden popover
             $scope.$on('popover.hidden', function () {
                 // Execute action
             });
             // Execute action on remove popover
             $scope.$on('popover.removed', function () {
                 $scope.popover.remove();
             });

         }])
         .controller("subjectDetailCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {

             $http.get('http://' + IpConfig + '//SMSAPI/Subjects/GetAllByStudent?StudentId=10112').then(function (res) {

                 debugger;
                 console.log(res);
                 $scope.SubjectDetail = res.data;
             });

         }])
        .controller("feeDetailCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
            debugger;
            $http.get('http://' + IpConfig + '//SMSAPI/FeeDetail/GetByStudent?StudentId=1').then(function (res) {

                debugger;
                console.log(res);
                $scope.FeeDetail = res.data;
                $scope.FeeDetail.FeepaidList.forEach(function (value, index) {
                    console.log(value.Date);
                    value.Date = new Date(value.Date);
                    console.log(value, index);
                })
            });

        }])
        .controller("attendenceCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
            debugger;
            $http.get('http://' + IpConfig + '//SMSAPI/Subjects/GetAllByStudent?StudentId=10111').then(function (res) {

                debugger;
                console.log(res);
                $scope.SubjectDetail = res.data;
            });

        }])
         .controller("transportFacilityCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
             debugger;
             $http.get('http://' + IpConfig + '//SMSAPI/Transport/GetAllByStudent?StudentId=43&OrgId=1').then(function (res) {

                 debugger;
                 console.log(res);
                 $scope.TransportDetail = res.data;
                 $scope.TransportDetail.PickupTime = new Date(res.data.PickupTime);
                 $scope.TransportDetail.DropTime = new Date(res.data.DropTime);
             });

         }])
          .controller("hostelDetailsCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
              debugger;
              $http.get('http://' + IpConfig + '//SMSAPI/Subjects/GetAllByStudent?StudentId=10111').then(function (res) {

                  debugger;
                  console.log(res);
                  $scope.SubjectDetail = res.data;
              });

          }])
            .controller("personalDetailsCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
                debugger;
                $http.get('http://' + IpConfig + '//SMSAPI/PersonalDetail/GetAllDetail?StudentId=10105&OrgId=1').then(function (res) {

                    debugger;
                    console.log(res);
                    $scope.PersonalDetail = res.data;

                });


            }])
          .controller("HomeWorkDetailsCtrl", ["$scope", "$state", "$filter", "$http", "$ionicPopup", function ($scope, $state, $filter, $http, $ionicPopup) {
              $http.post('http://' + IpConfig + '/SMSAPI/Homework/GetByCourse?CourseId=17&BatchId=12&OrgId=1').then(function (res) {

                  debugger;
                  console.log(res);
                  $scope.HomeworkDetail = res.data;
                  $scope.HomeworkDetail.assignmentsList.forEach(function (value, index) {
                      console.log(value.Date);
                      value.Date = new Date(value.Date);
                      console.log(value, index);
                  })
              });
              $scope.showPopUp = function () {
                  $scope.data = {}
                  var myPopup = $ionicPopup.show({
                      template: '<input type="text" placeholder="YYYY-MM-DD" ng-model="data.HomeworkDate" id="datepicker">',
                      title: 'Filter By Date',
                      scope: $scope,
                      buttons: [
                     { text: 'Cancel' },
                     {
                         text: '<b>done</b>',
                         type: 'button-positive',
                         onTap: function (e) {
                             if (!$scope.data.HomeworkDate) {
                                 e.preventDefault();
                             } else {
                                 return $scope.data.HomeworkDate;
                             }
                         }
                     }
                      ]

                  })
                  myPopup.then(function (res) {

                      debugger;
                      $http.post('http://' + IpConfig + '/SMSAPI/Homework/GetByDate?Date=' + $scope.data.HomeworkDate + '&CourseId=17&BatchId=12&OrgId=1').then(function (res) {
                          debugger;
                          console.log(res);
                          $scope.HomeworkDetail = res.data;
                          debugger;
                          //$state.go('view-filteredHomeworkDetail', $scope.Hwork);

                      })
                  });
              }

          }])

         .controller("holidaysCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
             debugger;
             $http.get('http://' + IpConfig + '//SMSAPI/Holiday/GetAll?OrgId=1').then(function (res) {

                 debugger;
                 console.log(res);
                 $scope.HolidayDetail = res.data;
                 $scope.HolidayDetail.HolidaysList.forEach(function (value, index) {
                     console.log(value.Date);
                     value.Date = new Date(value.Date);
                     console.log(value, index);
                 })
             });


         }])
            .controller("MessageBoxCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
                debugger;
                $http.get('http://' + IpConfig + '//SMSAPI/Subjects/GetAllByStudent?StudentId=10111').then(function (res) {

                    debugger;
                    console.log(res);
                    $scope.SubjectDetail = res.data;
                });

            }])
          .controller("TimeTableCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
              debugger;
              $scope.loadMore = function () {
                  $http.get('/more-items').success(function (items) {
                      useItems(items);
                      $scope.$broadcast('scroll.infiniteScrollComplete');
                  });
              };

              $http.get('http://' + IpConfig + '/SMSAPI/Timetable/GetByCourse?CourseId=17&BatchId=12&OrgId=1').then(function (res) {
                  debugger;
                  console.log(res);
                  $scope.periodData = res.data;
                  $scope.periodData.WeekdayTimeTables.forEach(function (value, index) {
                      value.Periods.forEach(function (value2, index2) {
                          console.log(value2.StartTime);
                          console.log(value2.EndTime);
                          value2.StartTime = new Date(value2.StartTime);
                          value2.EndTime = new Date(value2.EndTime);
                      });
                      console.log(index, value);
                  });
              });

          }])
            .controller("examinationDetailsCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
                debugger;
                $http.get('http://' + IpConfig + '//SMSAPI/Exam/GetByCourse?BatchId=12&CourseId=17&OrgId=1').then(function (res) {
                    debugger;
                    console.log(res);
                    $scope.examinationDetail = res.data;
                    $scope.examinationDetail.ExamSchedule.forEach(function (value, index) {
                        console.log(value.ExamDate);
                        console.log(value.Starttime);
                        console.log(value.Duration);
                        value.ExamDate = new Date(value.ExamDate);
                        value.Starttime = new Date(value.Starttime);
                        value.Duration = new Date(value.Duration);
                        console.log(value, index);
                    })
                });

            }])
           .controller("TeacherDetailsCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
               debugger;
               $http.post('http://' + IpConfig + '/SMSAPI/Faculty/GetFaculty?StudentId=10112').then(function (res) {
                   debugger;
                   console.log(res);
                   $scope.TeacherDetail = res.data;
               });
           }])
              .controller("assesmentReportCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
                  debugger;
                  $http.get('http://' + IpConfig + '/SMSAPI/AssesmentReport/GetByStudent?StudentId=10112&OrgId=1').then(function (res) {
                      debugger;
                      console.log(res);
                      $scope.assesmentReportDetail = res.data;
                  })
                  ;
              }])
                .controller("profileCtrl", ["$scope", "$state", function ($scope, $state, $http) {

                }])
                .controller("signoutCtrl", ["$scope", "$state", function ($scope, $state, $http) {

                }])
                .controller("GeolocationCtrl", ["$scope", "$state", "$http", "$cordovaGeolocation", function ($scope, $state, $http, $cordovaGeolocation) {
                    $scope.getGeolocation = function () {
                        var posOptions = { timeout: 10000, enableHighAccuracy: false };
                        $cordovaGeolocation
                          .getCurrentPosition(posOptions)
                          .then(function (position) {
                              var lat = position.coords.latitude;
                              var long = position.coords.longitude;

                              $http.post('http://' + IpConfig + '/SMSAPI/GeoLocation/GetLocation?Lattitude=' + lat + '&Longitude=' + long).then(function (res) {
                                  debugger;


                              })

                          }, function (err) {
                              // error
                          });
                       
                    }

                }])
                .controller("barCodeScannerCtrl", ["$scope", "$state","$http", "$cordovaBarcodeScanner", function ($scope, $state,$http,$cordovaBarcodeScanner) {
                    
                    $scope.scannedStudents = [];
                    $scope.scanBarCode = function () {
                        $cordovaBarcodeScanner.scan().then(function (imageData) {

                            var ScannedStudents = $scope.scannedStudents.push( imageData.text);
                            console.log($scope.scannedStudents);

                            //alert(imageData.text);
                            //var scaned = imageData.text;

                            //console.log("Barcode Format -> " + imageData.format);
                            //console.log("Cancelled -> " + imageData.cancelled);

                        }, function (error) {
                            console.log("An error happened -> " + error);
                        });
                    }
                    $scope.sendStudentsTimings = function () {
                        debugger;
                        
                        //var jsonObj1 = JSON.stringify( $scope.scannedStudents[]);
                        $scope.date = new Date();
                        var jsonObj2 =JSON.stringify($scope.date);
                        $http.post('http://' + IpConfig + '/SMSAPI/Attandance/SaveAttendance?OrgId=1&StudentId=' + jsonObj1  + '&scanDateTime=' + jsonObj2).then(function (res) {
                            debugger;
                        });
                    }

                }])
    //errorCtrl managed the display of error messages bubbled up from other controllers, directives, myappService
    .controller("errorCtrl", ["$scope", "myappService", function ($scope, myappService) {
        //public properties that define the error message and if an error is present
        $scope.error = "";
        $scope.activeError = false;

        //function to dismiss an active error
        $scope.dismissError = function () {
            $scope.activeError = false;
        };

        //broadcast event to catch an error and display it in the error section
        $scope.$on("error", function (evt, val) {
            //set the error message and mark activeError to true
            $scope.error = val;
            $scope.activeError = true;

            //stop any waiting indicators (including scroll refreshes)
            myappService.wait(false);
            $scope.$broadcast("scroll.refreshComplete");

            //manually apply given the way this might bubble up async
            $scope.$apply();
        });
    }]);
})
();