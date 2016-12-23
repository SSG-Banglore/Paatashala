(function () {
    "use strict";
    var IpConfig = "192.168.1.34";
    var host = 'http://localhost:56623/';
    angular.module("myapp.controllers", [])

    .controller("appCtrl", ["$scope", function ($scope) {
    }])
    .controller('loginCtrl', ['$scope', '$http', '$CustomLS', '$ionicLoading', '$state', function ($scope, $http, $CustomLS, $ionicLoading, $state) {
        $scope.loginData = {};
        $scope.message = "";
        $scope.login = function () {
            $ionicLoading.show({ template: 'Login...', duration: 10000 });
            $http.post(host + 'User/Login', $scope.loginData).success(function (data) {
                if (data.Status) {
                    $CustomLS.setObject('loginUser', data.User);
                    $state.go('view-parent-home');
                }
                else {
                    $scope.message = data.Message;
                }
                $ionicLoading.hide();
            }).error(function (errData) {
                console.log(errData);
                $ionicLoading.hide();
            });
        }
    }])
    .controller('settingCtrl', ['$scope', '$http', '$CustomLS', '$ionicLoading', '$state', function ($scope, $http, $CustomLS, $ionicLoading, $state) {

    }])
    .controller('changeStudentCtrl', ['$scope', '$http', '$CustomLS', '$ionicLoading', '$state', function ($scope, $http, $CustomLS, $ionicLoading, $state) {
        $scope.currentStudents = $CustomLS.getObject('currentStudents', []);
        $scope.data = {
            student: localStorage['selectedStudent']
        };
        $scope.changeStudent = function () {
            localStorage['selectedStudent'] = $scope.data.student;
        };
    }])
    .controller('manageChildrenCtrl', ['$scope', '$http', '$CustomLS', '$ionicLoading', '$state', function ($scope, $http, $CustomLS, $ionicLoading, $state) {
        $scope.user = $CustomLS.getObject('loginUser');
        $scope.courses = [];
        $scope.batches = [];
        $scope.students = [];
        $scope.data = {};
        $scope.currentStudents = $CustomLS.getObject('currentStudents', []);
        $http.post(host + 'Course/GetAllByOrg', { 'OrgId': $scope.user.OrgId }).success(function (data) {
            $scope.courses = data;
            console.log(data);
        });
        $http.post(host + 'Batch/GetAllByOrg', { 'OrgId': $scope.user.OrgId }).success(function (data) {
            $scope.batches = data;
            console.log(data);
        });
        $scope.getStudents = function () {
            if ($scope.data.batchId != undefined && $scope.data.courseId != undefined) {
                $http.post(host + 'Student/GetStudents',
                    { 'OrgId': $scope.user.OrgId, 'batchId': $scope.data.batchId, 'courseId': $scope.data.courseId }).success(function (data) {
                        $scope.students = data;
                        console.log(data);
                    });
            }
        };
        $scope.addSelectedStudents = function () {
            $scope.students.find(function (s) { return s.selected; });
            $scope.students.forEach(function (v, i) {
                if (v.selected & $scope.currentStudents.find(function (s) { return s.Id == v.Id; }) == undefined) {
                    $scope.currentStudents.push(v);
                }
            });
            $CustomLS.setObject('currentStudents', $scope.currentStudents);
        };
        $scope.deleteStudent = function (student) {
            $scope.currentStudents = $scope.currentStudents.filter(function (s) { return s.Id != student.Id });
            $CustomLS.setObject('currentStudents', $scope.currentStudents);
        };
    }])

    //homeCtrl provides the logic for the home screen
    .controller("homeCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {


        $scope.goAfterLogin = function (data) {


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

       }])
        .controller("SendVerificationCodeCtrl", ["$scope", "$state", "$ionicLoading", "$http", "$ionicPopup", "$CustomLS", function ($scope, $state, $ionicLoading, $http, $ionicPopup, $CustomLS) {
            $scope.sendVerificationCode = function (data) {
                debugger;
                $ionicLoading.show({ template: 'Sending...', duration: 10000 });
                $CustomLS.setObject('Email',data.email);
                $http.post('http://' + IpConfig + '/SMSAPI/ParentRegistration/SendEmailVerificationCode', { 'Email': data.email }).then(function (res) {
                    debugger;
                    $ionicLoading.hide();
                    if (res.data == true) {
                        $state.go('view-PassCode');
                    }
                    else if (res.data == false) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Invalid',
                            template: 'Error Occured'
                        });
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Invalid',
                            template: res.data,
                        });
                    }
                })
            }
        }])
         .controller("PassCodeCtrl", ["$scope", "$state", "$ionicLoading", "$http", "$ionicPopup", "$CustomLS", function ($scope, $state, $ionicLoading, $http, $ionicPopup, $CustomLS) {
             $scope.verify = function (data) {
                 debugger;
                 $ionicLoading.show({ template: 'Verifing...', duration: 10000 });
                 $http.post('http://' + IpConfig + '/SMSAPI/ParentRegistration/VerifyCode', { 'Email': JSON.parse(localStorage.getItem("Email")), 'Passcode': data.passcode }).then(function (res) {
                     debugger;
                     $ionicLoading.hide();
                     if (res.data == true) {
                         $state.go('ChangePassword');
                     }
                     else {
                         var alertPopup = $ionicPopup.alert({
                             title: 'Invalid',
                             template: res.data,
                         });
                     }
                 })
             }
         }])
         .controller("ChangePasswordCtrl", ["$scope", "$state", "$http",function ($scope, $state,$http) {
             $scope.changePassword = function (data) {
                 if (data.password == data.repeatPassword) {
                     $http.post('http://' + IpConfig + '/SMSAPI/ParentRegistration/SavePassword', {'Email': JSON.parse(localStorage.getItem("Email")),'Password': data.password }).then(function (res) {
                         if (res.data == true) {
                             $state.go('login');
                         }
                     })
                 }
                 else {

                 }

                  }
             

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
             {
                 "Name": "Fee Details", "Href": "#/view-feeDeatils", "Icon": "ion-card"
             },
             {
                 "Name": "Subject Details", "Href": "#/view-subject-details", "Icon": "ion-ios-book"
             },
             {
                 "Name": "Transport Facilty", "Href": "#/view-transportFacility", "Icon": "ion-android-bus"
             },
             {
                 "Name": "Hostel Details", "Href": "#/view-hostelDetails", "Icon": "ion-ios-home"
             },
             {
                 "Name": "Personal Details", "Href": "#/view-personalDetails", "Icon": "ion-android-person"
             },
             {
                 "Name": "Homework Details", "Href": "#/view-HomeWork-Details", "Icon": "ion-printer"
             },
             {
                 "Name": "Holidays", "Href": "#/view-holidays", "Icon": "ion-android-bicycle"
             },
             {
                 "Name": "Message Box", "Href": "#/view-MessageBox", "Icon": "ion-android-chat"
             },
             {
                 "Name": "Time Table", "Href": "#/view-TimeTable", "Icon": "ion-android-clipboard"
             },
             {
                 "Name": "Exam Details", "Href": "#/view-ExaminationDetails", "Icon": "ion-ios-book-outline"
             },
             {
                 "Name": "Teacher Details", "Href": "#/view-teacherDetail", "Icon": "ion-person"
             },
             {
                 "Name": "Assesment Report", "Href": "#/view-assesmentReport", "Icon": "ion-ribbon-a"
             },
              {
                  "Name": "Bar Code Scanner", "Href": "#/barCodeScanner", "Icon": "ion-qr-scanner"
              },
             {
                 "Name": "Geo Location", "Href": "#/Geolocation", "Icon": "ion-location"
             }
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
        .controller("feeDetailCtrl", ["$scope", "$state", "$http", "$ionicLoading", '$CustomLS', function ($scope, $state, $http, $ionicLoading, $CustomLS) {
            var studentId = localStorage['selectedStudent'];
            $scope.student = $CustomLS.getObject('currentStudents').find(function (f) { return f.Id == studentId });
            $scope.feeDetails = [];
            $ionicLoading.show({ template: 'Loading Fee Details...', duration: 10000 });
            $http.post(host + 'FeeDetail/GetByStudent', { StudentId: studentId }).success(function (data) {
                $scope.feeDetails = data;
                $ionicLoading.hide();
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
                .controller("GeolocationCtrl", ["$scope", "$state", "$http", "$cordovaGeolocation", "$interval", function ($scope, $state, $http, $cordovaGeolocation, $interval) {
                    $scope.Routes = [];
                    $scope.data = {
                        code: [],
                    }
                    $http.post('http://' + IpConfig + '/SMSAPI/GeoLocation/GetRouteCode?OrgId=1').then(function (res) {
                        debugger;
                        console.log(res);
                        $scope.Routes = res.data;
                    })


                    $scope.getGeolocation = function () {
                        var posOptions = {
                            timeout: 300000, enableHighAccuracy: true
                        };
                        $cordovaGeolocation
                          .getCurrentPosition(posOptions)
                          .then(function (position) {
                              var lat = position.coords.latitude;
                              var long = position.coords.longitude;

                              var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                              var mapOptions = {
                                  center: latLng,
                                  zoom: 15,
                                  mapTypeId: google.maps.MapTypeId.ROADMAP
                              };

                              $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                              google.maps.event.addListenerOnce($scope.map, 'idle', function () {

                                  var marker = new google.maps.Marker({
                                      map: $scope.map,
                                      animation: google.maps.Animation.DROP,
                                      position: latLng
                                  });

                              });
                              google.maps.event.addListenerOnce($scope.map, 'idle', function () {

                                  var marker = new google.maps.Marker({
                                      map: $scope.map,
                                      animation: google.maps.Animation.DROP,
                                      position: latLng
                                  });

                                  var infoWindow = new google.maps.InfoWindow({
                                      content: "Here I am!"
                                  });

                                  google.maps.event.addListener(marker, 'click', function () {
                                      infoWindow.open($scope.map, marker);
                                  });

                              });
                          }, function (error) {
                              console.log("Could not get location");
                          }
                           )
                    }
                    var Route = $scope.data.code;
                    $scope.date = new Date();
                    var jsonObj3 = JSON.stringify($scope.date);
                    var setInterval = $interval(function () {
                        $http.post('http://' + IpConfig + '/SMSAPI/GeoLocation/GetLocation?Lattitude=' + lat + '&Longitude=' + long + '&OrgId=1&Routecode=' + Route + '&nowDateTime=' + jsonObj3).then(function (res) {
                        }, function (err) {
                            // error
                        });
                    }, 300000);
                }])
          .controller("barCodeScannerCtrl", ["$scope", "$state", "$http", "$cordovaBarcodeScanner", function ($scope, $state, $http, $cordovaBarcodeScanner) {

              $scope.studentsList = [];
              $http.post('http://' + IpConfig + '/SMSAPI/Attandance/getStudentsList?OrgId=1').then(function (res) {
                  console.log(res);
                  $scope.studentsList = res.data;
              })
              $scope.scannedStudents = {
                  Id: [],
                  Name: []
              }
              $scope.data = {
              }

              $scope.DeleteCurrentRow = function (index) {
                  debugger;
                  $scope.scannedStudents.Name.splice(index, 1);
                  $scope.scannedStudents.Id.splice(index, 1);
              }
              $scope.scanBarCode = function () {
                  $cordovaBarcodeScanner.scan().then(function (imageData) {
                      var Id = imageData.text;
                      $scope.studentsList.forEach(function (value, index) {
                          if (value.Id == Id) {
                              $scope.scannedStudents.Name.push(value.Name)
                              $scope.scannedStudents.Id.push(value.Id)
                          }
                      })
                      localStorage.setItem(JSON.stringify($scope.scannedStudents.Name), JSON.stringify($scope.scannedStudents.Id));
                 

                  }, function (error) {
                      console.log("An error happened -> " + error);
                  });
              }
              $scope.sendStudentsTimings = function () {
                  debugger;
                  var pick = $scope.data.choice;
                  var jsonObj1 = $scope.scannedStudents.Id;
                  var jasonobj4 = localStorage.getItem(JSON.stringify($scope.scannedStudents.Name));
                  $scope.date = new Date();
                  var jsonObj2 = JSON.stringify($scope.date);
                  $http.post('http://' + IpConfig + '/SMSAPI/Attandance/SaveAttendance?OrgId=1&StudentId=' + jasonobj4 + '&scanDateTime=' + jsonObj2 + '&IsPicUp=' + pick).then(function (res) {
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