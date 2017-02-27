(function () {
    "use strict";
   // var host = "http://paatshaalamobileapi-prod.us-west-2.elasticbeanstalk.com/";
     var host = "http://192.168.1.43/SampleAPI/";
    //var host = 'http://localhost:56623/';
    angular.module("myapp.controllers", ['ionic-datepicker', 'tabSlideBox'])

    .controller("appCtrl", ["$scope", function ($scope) {
    }])
    .controller('loginCtrl', ['$scope', '$http', '$CustomLS', '$ionicLoading', '$state', '$ionicHistory', function ($scope, $http, $CustomLS, $ionicLoading, $state, $ionicHistory) {
        $scope.loginData = {};
        $scope.message = "";
        $scope.newUser = function () {
            $state.go('view-SendVerificationCode');
        };
        $scope.forgetPassword = function () {
            $state.go('view-forgetPassword');
        }
        $scope.EmployeeForgetPassword = function () {
            $state.go('view-employeeForgetPassword');
        }
        $scope.login = function () {
            if ($scope.loginData.Usertype == 'Employee') {
                $ionicLoading.show({ template: 'Login...', duration: 10000 });
                $http.post(host + 'User/EmployeeLogin', $scope.loginData).success(function (data) {
                    debugger;
                    if (data.Status) {
                        localStorage['LoginType'] = 'Employee';
                        $CustomLS.setObject('LoginUser', data.User);
                        $CustomLS.setObject('currentStudents', data.HasStudents);
                        $state.go('view-Employee-home');
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
            else {
                $ionicLoading.show({ template: 'Login...', duration: 10000 });
                $http.post(host + 'User/Login', $scope.loginData).success(function (data) {
                    if (data.Status) {
                        if (data.HasStudents.length == 0) {
                            alert('No children tagged to the mail Id ' + data.User.Username);
                        }
                        else {
                            localStorage['LoginType'] = 'Parent';
                            $CustomLS.setObject('LoginUser', data.User);
                            $CustomLS.setObject('currentStudents', data.HasStudents);
                            $scope.values = $CustomLS.getObject('currentStudents');

                            $scope.selectStudent = data.HasStudents[0];
                            localStorage['selectedStudent'] = $scope.selectStudent.Id;
                            localStorage['selectedStudentBatch'] = $scope.selectStudent.Batch;
                            localStorage['selectedStudentCourse'] = $scope.selectStudent.Course;
                            localStorage['selectedStudentOrgId'] = $scope.selectStudent.OrgId;
                            $state.go('view-parent-home');
                        }
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
        }
    }])
    .controller('settingCtrl', ['$scope', '$http', '$CustomLS', '$ionicLoading', '$state', function ($scope, $http, $CustomLS, $ionicLoading, $state) {
        $scope.AppCurrentVersion = localStorage['AppCurrentVersion'];
        $scope.AppToken = localStorage['token'];
        $scope.logout = function () {
            localStorage.clear();
            $state.go('login');
        };
    }])
    .controller('changeStudentCtrl', ['$scope', '$http', '$CustomLS', '$ionicLoading', '$state', function ($scope, $http, $CustomLS, $ionicLoading, $state) {
        $scope.currentStudents = $CustomLS.getObject('currentStudents', []);
        $scope.data = {
            student: localStorage['selectedStudent']
        };
        $scope.changeStudent = function () {
            localStorage['selectedStudent'] = $scope.data.student;
            $scope.studentCurrent = $scope.currentStudents.find(function (f) { return f.Id == $scope.data.student });
            localStorage['selectedStudentBatch'] = $scope.studentCurrent.Batch;
            localStorage['selectedStudentCourse'] = $scope.studentCurrent.Course;
            localStorage['selectedStudentOrgId'] = $scope.studentCurrent.OrgId;

        };
    }])
    .controller('manageChildrenCtrl', ['$scope', '$http', '$CustomLS', '$ionicLoading', '$state', function ($scope, $http, $CustomLS, $ionicLoading, $state) {
        $scope.user = $CustomLS.getObject('loginUser');
        $scope.courses = []
        $scope.batches = [];
        $scope.students = [];
        $scope.data = {};
        $scope.currentStudents = $CustomLS.getObject('currentStudents', []);
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

           $http.get(host + '/School/GetAll').then(function (res) {
               debugger;
               console.log(res);
               $scope.SchoolList = res.data;
           });

       }])
        .controller("SendVerificationCodeCtrl", ["$scope", "$state", "$ionicLoading", "$http", "$ionicPopup", "$CustomLS", function ($scope, $state, $ionicLoading, $http, $ionicPopup, $CustomLS) {
            $scope.sendVerificationCode = function (data) {
                $ionicLoading.show({ template: 'Sending Verification Code...', duration: 10000 });
                $CustomLS.setObject('UserRegistration', data);
                $http.post(host + 'ParentRegistration/SendEmailVerificationCode', { 'Email': data.email }).success(function (data) {
                    debugger;
                    $ionicLoading.hide();
                    if (data.status) {
                        $state.go('view-PassCode');
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Invalid',
                            template: data.Message,
                        });
                    }
                })
            }
        }])
         .controller("PassCodeCtrl", ["$scope", "$state", "$ionicLoading", "$http", "$ionicPopup", "$CustomLS", function ($scope, $state, $ionicLoading, $http, $ionicPopup, $CustomLS) {
             $scope.UserRegistration = $CustomLS.getObject('UserRegistration', []);
             $scope.verify = function (data) {
                 debugger;
                 $ionicLoading.show({ template: 'Verifing...', duration: 10000 });
                 $http.post(host + '/ParentRegistration/VerifyCode', { 'Email': $scope.UserRegistration.email, 'Passcode': data.passcode }).success(function (data) {
                     $ionicLoading.hide();
                     if (data.status) {
                         $state.go('ChangePassword');
                     }
                     else {
                         var alertPopup = $ionicPopup.alert({
                             title: 'Invalid',
                             template: data.Message,
                         });
                     }
                 })
             }
         }])
         .controller("ChangePasswordCtrl", ["$scope", "$state", "$http", "$CustomLS", "$ionicPopup", function ($scope, $state, $http, $CustomLS, $ionicPopup) {
             $scope.user = $CustomLS.getObject('UserRegistration');
             $scope.changePassword = function (data) {
                 if (data.password == data.repeatPassword) {
                     $http.post(host + '/ParentRegistration/SavePassword', { 'Email': $scope.user.email, 'Password': data.password }).success(function (data) {
                         debugger;
                         if (data.status) {
                             //   $CustomLS.setObject('StudentLocalStorage', data.Students);
                             //$CustomLS.setObject('currentStudents', data.Students);
                             //$scope.values = $CustomLS.getObject('currentStudents');
                             //$scope.selectStudent = $scope.values[0];
                             //localStorage['selectedStudent'] = $scope.selectStudent.Id;
                             //localStorage['selectedStudentBatch'] = $scope.selectStudent.Batch;
                             //localStorage['selectedStudentCourse'] = $scope.selectStudent.Course;
                             //localStorage['selectedStudentOrgId'] = $scope.selectStudent.OrgId;
                             $state.go('login');
                         }
                     })
                 }
             }
         }])
        .controller("afterLoginCtrl", ["$scope", "$state", function ($scope, $state) {

        }])
         .controller("parentForgetPasswordCtrl", ["$scope", "$state", "$http", "$ionicPopup", "$CustomLS", "$ionicLoading", function ($scope, $state, $http, $ionicPopup, $CustomLS, $ionicLoading) {
             $scope.message = "";
             $scope.sendPassword = function (data) {
                 $ionicLoading.show({ template: 'Sending...', duration: 10000 });
                 $http.post(host + 'ForgetPassword/getPassword', { Email: data.email }).success(function (data) {
                     $ionicLoading.hide();
                     if (data.status) {
                         var alertPopup = $ionicPopup.alert({
                             title: 'Success',
                             template: 'Password Sent Your Mail'
                         });
                         $state.go('login');
                     }
                     else {
                         var alertPopup = $ionicPopup.alert({
                             title: 'Invalid',
                             template: data.Message
                         });
                     }
                 });
             }
         }])
        .controller("employeeForgetPasswordCtrl", ["$scope", "$state", "$http", "$ionicPopup", "$CustomLS", "$ionicLoading", function ($scope, $state, $http, $ionicPopup, $CustomLS, $ionicLoading) {
            $scope.sendEmployeePassword = function (data) {
                $ionicLoading.show({ template: 'Sending...', duration: 10000 });
                $http.post(host + 'ForgetPassword/getEmployeePassword', { Email: data.email, OrgName: data.OrgName }).success(function (data) {
                    $ionicLoading.hide();
                    if (data.status) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Success',
                            template: 'Password Sent Your Mail'
                        });
                        $state.go('login');
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Invalid',
                            template: data.Message
                        });
                    }
                })
            }
        }])
        .controller("getNewPasswordCtrl", ["$scope", "$state", function ($scope, $state) {


        }])
         .controller("parentHomeCtrl", ["$scope", "$state", "$ionicPopover", '$ionicHistory', '$ionicNavBarDelegate', '$cordovaAppVersion', '$http','$ionicPopup', function ($scope, $state, $ionicPopover, $ionicHistory, $ionicNavBarDelegate, $cordovaAppVersion, $http, $ionicPopup) {
             $scope.Pages = [
             {
                 "Name": "Fee Details", "Href": "#/view-feeDeatils", "Icon": "ion-card"
             },
             {
                 "Name": "Subject Details", "Href": "#/view-subject-details", "Icon": "ion-ios-book"
             },
             //{
             //    "Name": "Transport Facilty", "Href": "#/view-transportFacility", "Icon": "ion-android-bus"
             //},
             //{
             //    "Name": "Hostel Details", "Href": "#/view-hostelDetails", "Icon": "ion-ios-home"
             //},
             {
                 "Name": "Student Details", "Href": "#/view-studentDetail", "Icon": "ion-android-person"
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
             // {
             //     "Name": "Bar Code Scanner", "Href": "#/barCodeScanner", "Icon": "ion-qr-scanner"
             // },
             //{
             //    "Name": "Geo Location", "Href": "#/Geolocation", "Icon": "ion-location"
             //}
             ];
             $scope.NewVersionData = {};
             //debugger;
             //cordova.getAppVersion.getVersionNumber().then(function (version) {
             //    $('.version').text(version);
             //});

             document.addEventListener("deviceready", function () {
                 $cordovaAppVersion.getVersionNumber().then(function (version) {
                     localStorage['AppCurrentVersion'] = version;
                     alert(version);
                     $http.get(host + 'AppManager/GetLatestVersion').success(function (data) {
                         debugger;
                         $scope.NewVersionData = data;
                         $scope.NewVersionData.Url = host + "AppManager/PatashalaApp";
                         console.log(data);
                         if (data.Version != version)
                         {
                             $ionicPopup.alert({
                                 title: 'New Update Available!',
                                 template: "<strong>New Version : </strong> {{NewVersionData.Version}} <br />  <a href=\"#\" onclick=\"window.open('"+$scope.NewVersionData.Url+"', '_system', 'location=yes'); return false;\"> Get from here</a><br /> {{NewVersionData.UpdateMessage}}",
                                 scope: $scope
                             });
                         }
                     });
                 });
                


             }, false);

             if (localStorage['tokenType'] == "NEW")
             {
                 var userId = JSON.stringify(localStorage['LoginUser']).UserId;
                 $http.post(host + 'User/UpdateToken', { UserId: userId, SenderId: localStorage['token'] }).success(function (data) {
                     localStorage['tokenType'] == "UPDATED";
                 });
             }

             $scope.submitEmail = function () {
                 $state.go('view-subject-details');
             }
             $ionicPopover.fromTemplateUrl('my-popover.html', {
                 scope: $scope
             }).then(function (popover) {
                 $scope.popover = popover;
             });


             //$scope.openPopover = function ($event) {
             //    $scope.popover.show($event);
             //};
             //$scope.closePopover = function () {
             //    $scope.popover.hide();
             //};
             ////Cleanup the popover when we're done with it!
             //$scope.$on('$destroy', function () {
             //    $scope.popover.remove();
             //});
             //// Execute action on hidden popover
             //$scope.$on('popover.hidden', function () {
             //    // Execute action
             //});
             //// Execute action on remove popover
             //$scope.$on('popover.removed', function () {
             //    $scope.popover.remove();
             //});

         }])
        .controller("employeeHomeCtrl", ["$scope", "$state", "$http", "$CustomLS", function ($scope, $state, $http, $CustomLS) {
            $scope.Pages = [

         {
             "Name": "Transport ", "Href": "#/barCodeScanner", "Icon": "ion-qr-scanner"
         },
           {
               "Name": "Attendance", "Href": "#/Attendance", "Icon": "ion-qr-scanner"
           },

         {
             "Name": "Geo Location", "Href": "#/Geolocation", "Icon": "ion-location"
         },
            {
                "Name": "Holidays", "Href": "#/Employeeholidays", "Icon": "ion-android-bicycle"
            },
            {
                "Name": "Personal Details", "Href": "#/EmployeeProfile", "Icon": "ion-android-person"
            },
            {
                "Name": "Settings", "Href": "#/EmployeeSettings", "Icon": "ion-android-settings"
            }
            ];
        }])
         .controller("subjectDetailCtrl", ["$scope", "$state", "$http", "$CustomLS", function ($scope, $state, $http, $CustomLS) {
             var studentId = localStorage['selectedStudent'];
             $http.post(host + '/Subjects/GetAllByStudent', { StudentId: studentId }).success(function (data) {
                 debugger;
                 $scope.SubjectDetail = data;
             });
         }])
        .controller("feeDetailCtrl", ["$scope", "$state", "$http", "$ionicLoading", '$CustomLS', function ($scope, $state, $http, $ionicLoading, $CustomLS) {
            var studentId = localStorage['selectedStudent'];
            $scope.student = $CustomLS.getObject('currentStudents').find(function (f) { return f.Id == studentId });
            $scope.feeDetails = [];
            $ionicLoading.show({ template: 'Loading Fee Details...' });
            $http.post(host + 'FeeDetail/GetByStudent', { StudentId: studentId }).success(function (data) {
                debugger;
                $scope.feeDetails = data;
                $ionicLoading.hide();
            });

        }])
        .controller("attendenceCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
            debugger;
            $http.get(host + '/Subjects/GetAllByStudent?StudentId=10111').then(function (res) {
                debugger;
                console.log(res);
                $scope.SubjectDetail = res.data;
            });

        }])
         .controller("transportFacilityCtrl", ["$scope", "$state", "$http", "$CustomLS", function ($scope, $state, $http, $CustomLS) {
             var studentId = localStorage['selectedStudent'];
             var OrgId = $CustomLS.getObject('selectedStudentOrgId');
             $http.post(host + '/Transport/GetAllByStudent', { StudentId: studentId, OrgId: OrgId }).success(function (data) {
                 debugger;
                 $scope.TransportDetail = data;
                 $scope.TransportDetail.PickupTime = new Date(data.PickupTime);
                 $scope.TransportDetail.DropTime = new Date(data.DropTime);
             });

         }])
          .controller("hostelDetailsCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
              debugger;
              $http.get(host + '/Subjects/GetAllByStudent?StudentId=10111').then(function (res) {

                  debugger;
                  console.log(res);
                  $scope.SubjectDetail = res.data;
              });

          }])
            .controller("studentDetailsCtrl", ["$scope", "$state", "$http", '$CustomLS', function ($scope, $state, $http, $CustomLS) {
                var studentId = localStorage['selectedStudent'];
                var OrgId = localStorage['selectedStudentOrgId'];
                debugger;
                $scope.imageUrl = host + "Student/StudentImage?Id=" + studentId;
                $http.post(host + '/PersonalDetail/GetAllDetail', { StudentId: studentId, OrgId: OrgId }).success(function (data) {
                    $scope.PersonalDetail = data;
                });
            }])
          .controller("HomeWorkDetailsCtrl", ["$scope", "$state", "$filter", "$http", "$ionicPopup", "$CustomLS", 'ionicDatePicker', function ($scope, $state, $filter, $http, $ionicPopup, $CustomLS, ionicDatePicker) {
              var BatchId = localStorage['selectedStudentBatch'];
              var CourseId = localStorage['selectedStudentCourse'];
              var OrgId = localStorage['selectedStudentOrgId'];
              $scope.date = new Date();
              $scope.FormattedDate = $scope.date.toLocaleDateString();
              //$http.post(host + '/Homework/GetByCourse', { CourseId: CourseId, BatchId: BatchId, OrgId: OrgId }).success(function (data) {
              //    $scope.HomeworkDetail = data;
              //    $scope.HomeworkDetail.assignmentsList.forEach(function (value, index) {
              //        console.log(value.Date);
              //        value.Date = new Date(value.Date);
              //        console.log(value, index);
              //    })
              //});
              $scope.setDateTime = function () {
                  var ipObj1 = {
                      callback: function (val) {  //Mandatory
                          var date = new Date(val);
                          $scope.date = date;
                          $scope.FormattedDate = date.toLocaleDateString();
                      },
                      inputDate: new Date(),
                      showTodayButton: true,
                      to: new Date(), //Optional
                      inputDate: new Date(),      //Optional
                      mondayFirst: false,          //Optional
                      closeOnSelect: false,       //Optional
                      templateType: 'popup'       //Optional
                  };
                  ionicDatePicker.openDatePicker(ipObj1);
              };

              $scope.getHomework = function () {
                  $http.post(host + '/Homework/GetByDate', { CourseId: CourseId, BatchId: BatchId, OrgId: OrgId, Date: $scope.date }).success(function (data) {
                      debugger;
                      $scope.HomeworkDetail = data;
                      $scope.HomeworkDetail.assignmentsList.forEach(function (value, index) {
                          console.log(value.Date);
                          value.Date = new Date(value.Date);
                          console.log(value, index);
                      })
                  })
              };
              $scope.getHomework();
          }])
             .controller("holidaysCtrl", ["$scope", "$state", "$http", '$CustomLS', function ($scope, $state, $http, $CustomLS) {
                 var OrgId = localStorage['selectedStudentOrgId'];
                 $http.post(host + '/Holiday/GetAll', { OrgId: OrgId }).success(function (data) {
                     $scope.HolidayDetail = data;
                     //$scope.HolidayDetail.HolidaysList.forEach(function (value, index) {
                     //    console.log(value.Date); 
                     //    value.Date = new Date(value.Date);
                     //    console.log(value, index);
                     //})
                 });
             }])
            .controller("MessageBoxCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
                debugger;
                $http.get(host + '/Subjects/GetAllByStudent?StudentId=10111').then(function (res) {
                    debugger;
                    console.log(res);
                    $scope.SubjectDetail = res.data;
                });

            }])
          .controller("TimeTableCtrl", ["$scope", "$state", "$http", "$CustomLS", function ($scope, $state, $http, $CustomLS) {
              $scope.periodData = {
                  WeekdayTimeTables: []
              }
              var BatchId = localStorage['selectedStudentBatch'];
              var CourseId = localStorage['selectedStudentCourse'];
              var OrgId = localStorage['selectedStudentOrgId'];
              $scope.loadMore = function () {
                  $http.post('/more-items').success(function (items) {
                      useItems(items);
                      $scope.$broadcast('scroll.infiniteScrollComplete');
                  });
              };

              $http.post(host + '/Timetable/GetByCourse', { BatchId: BatchId, CourseId: CourseId, OrgId: OrgId }).success(function (data) {
                  debugger;
                  if (!data.WeekdayTimeTables) {

                  }
                  else {
                      $scope.periodData = data;
                      $scope.periodData.WeekdayTimeTables.forEach(function (value, index) {
                          value.Periods.forEach(function (value2, index2) {
                              console.log(value2.StartTime);
                              console.log(value2.EndTime);
                              value2.StartTime = new Date(value2.StartTime);
                              value2.EndTime = new Date(value2.EndTime);
                          });
                          console.log(index, value);
                      });
                  }
              });
          }])
            .controller("examinationDetailsCtrl", ["$scope", "$state", "$http", "$CustomLS", function ($scope, $state, $http, $CustomLS) {
                var BatchId = localStorage['selectedStudentBatch'];
                var CourseId = localStorage['selectedStudentCourse'];
                var OrgId = localStorage['selectedStudentOrgId'];
                $http.post(host + '/Exam/GetByCourse', { BatchId: BatchId, CourseId: CourseId, OrgId: OrgId }).success(function (data) {
                    $scope.examinationDetail = data;
                    //$scope.examinationDetail.ExamSchedule.forEach(function (value, index) {
                    //    console.log(value.ExamDate);
                    //    console.log(value.Starttime);
                    //    console.log(value.Duration);
                    //    value.ExamDate = new Date(value.ExamDate);
                    //    value.Starttime = new Date(value.Starttime);
                    //    value.Duration = new Date(value.Duration);
                    //    console.log(value, index);
                    //})
                });
            }])
           .controller("TeacherDetailsCtrl", ["$scope", "$state", "$http", "$CustomLS", function ($scope, $state, $http, $CustomLS) {
               var studentId = localStorage['selectedStudent'];
               $http.post(host + '/Faculty/GetFaculty', { StudentId: studentId }).success(function (data) {
                   debugger;
                   $scope.TeacherDetail = data;
               });
           }])
              .controller("assesmentReportCtrl", ["$scope", "$state", "$http", "$CustomLS", function ($scope, $state, $http, $CustomLS) {
                  var studentId = localStorage['selectedStudent'];
                  $scope.assesmentDetails = {};
                  var OrgId = localStorage['selectedStudentOrgId'];
                  $http.post(host + '/AssesmentReport/GetByStudent', { StudentId: studentId, OrgId: OrgId }).success(function (data) {
                      debugger;
                      $scope.assesmentReportDetail = data;
                      data.Reports.forEach(function (e) {
                          if (!$scope.assesmentDetails[e.Examtype]) {
                              $scope.assesmentDetails[e.Examtype] = [];
                          }
                          $scope.assesmentDetails[e.Examtype].push({ 'Marks': e.Marks, 'SubjectName': e.SubjectName });
                      });
                  })
              }])
           .controller("EmployeeProfileCtrl", ["$scope", "$state", "$http", "$CustomLS", function ($scope, $state, $http, $CustomLS) {
               $scope.user = $CustomLS.getObject('LoginUser');
               var EmpId = $scope.user.UserId;
               $scope.imageUrl = host + "PersonalDetail/getEmployeeImage?Id="+EmpId;
               $http.post(host + '/PersonalDetail/GetEmployeeDetail', { 'EmployeeId': $scope.user.UserId, 'OrgId': $scope.user.OrgId }).success(function (data) {
                   $scope.Details = data;
               })
           }])
         .controller("EmployeeHolidaysCtrl", ["$scope", "$state", "$http", "$CustomLS", function ($scope, $state, $http, $CustomLS) {
             $scope.user = $CustomLS.getObject('LoginUser');
             $http.post(host + '/Holiday/GetEmployeeHolidays', { 'OrgId': $scope.user.OrgId }).success(function (data) {
                 $scope.EmployeeHoliday = data;
             });
         }])

        .controller("EmployeeSettingsCtrl", ["$scope", "$state", "$http", "$CustomLS", function ($scope, $state, $http, $CustomLS) {
            $scope.Employeelogout = function () {
                localStorage.clear();
                $state.go('login');
            };
        }])
                .controller("profileCtrl", ["$scope", "$state", function ($scope, $state, $http) {

                }])
                .controller("signoutCtrl", ["$scope", "$state", function ($scope, $state, $http) {

                }])

                .controller("GeolocationCtrl", ["$scope", "$state", "$http", "$cordovaGeolocation", "$interval", "$CustomLS", function ($scope, $state, $http, $cordovaGeolocation, $interval, $CustomLS) {
                    $scope.Routes = [];
                    $scope.data = {
                        code: [],
                    }
                    $scope.user = $CustomLS.getObject('LoginUser');
                    $http.post(host + '/GeoLocation/GetRouteCode', { 'OrgId': $scope.user.OrgId }).success(function (data) {
                        $scope.RouteCode = data;
                    })

                    $scope.getGeolocation = function () {
                        var posOptions = {
                            timeout: 300000, enableHighAccuracy: true
                        };
                        $cordovaGeolocation
                          .getCurrentPosition(posOptions)
                          .then(function (position) {
                              $scope.lat = position.coords.latitude;
                              $scope.long = position.coords.longitude;
                              var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                              console.log(latLng);
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
                    $scope.Route = $scope.data.code;
                    $scope.date = new Date();
                    var jsonObj3 = ($scope.date).toString();
                    var setInterval = $interval(function () {
                        $http.post(host + '/GeoLocation/GetLocation', { 'Lattitude': $scope.lat, 'Longitude': $scope.long, 'OrgId': $scope.user.OrgId, 'nowDateTime': jsonObj3, 'Routecode': $scope.data.code }).success(function (data) {
                        }, function (err) {
                            // error
                        });
                    }, 300000);
                }])
            .controller("AttendanceCtrl", ["$scope", "$state", "$http", "$cordovaBarcodeScanner", "$CustomLS", "$ionicPopup", function ($scope, $state, $http, $cordovaBarcodeScanner, $CustomLS, $ionicPopup) {
                $scope.user = $CustomLS.getObject('LoginUser');
                $scope.studentsList = [];
                $http.post(host + '/Attandance/getStudentsList', { 'OrgId': $scope.user.OrgId }).then(function (res) {
                    console.log(res);
                    $scope.studentsList = res.data.AdmStudents;
                })
                $scope.scannedStudents = {
                    Id: [],
                    Name: [],
                    StudentId: []
                }
                $scope.data = {
                }

                $scope.DeleteCurrentRow = function (index) {

                    $scope.scannedStudents.Name.splice(index, 1);
                    $scope.scannedStudents.Id.splice(index, 1);
                }
                $scope.scanBarCode = function () {
                    $cordovaBarcodeScanner.scan().then(function (imageData) {
                        var Id = imageData.text;
                        $scope.studentsList.forEach(function (value, index) {
                            if (value.StudentId == Id) {
                                $scope.scannedStudents.Name.push(value.Name)
                                $scope.scannedStudents.Id.push(value.Id)
                                $scope.scannedStudents.StudentId.push(value.StudentId)
                            }
                        })
                        localStorage.setItem(JSON.stringify($scope.scannedStudents.Name), JSON.stringify($scope.scannedStudents.Id));

                    }, function (error) {
                        console.log("An error happened -> " + error);
                    });
                }
                $scope.sendStudentsTimings = function () {

                    var pick = $scope.data.choice;
                    var jsonObj1 = $scope.scannedStudents.Id;
                    var jasonobj4 = localStorage.getItem(JSON.stringify($scope.scannedStudents.Name)).replace(']', '').replace('[', '');
                    $scope.date = new Date();
                    var jsonObj2 = JSON.stringify($scope.date);
                    $http.post(host + '/Attandance/SaveAttendance?OrgId=' + $scope.user.OrgId + '&StudentId=' + jasonobj4 + '&scanDateTime=' + jsonObj2 + '&IsCheckIn=' + pick).success(function (data) {
                        debugger;
                        if (data.status) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Success',
                                template: 'Saved Successfully!'
                            });
                            $state.go('Attendance');
                            $scope.scannedStudents = {};
                        }
                        else {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Failed',
                                template: 'Error Occured!'
                            });
                        }
                    });

                }

            }])
         
        .controller("barCodeScannerCtrl", ["$scope", "$state", "$http", "$cordovaBarcodeScanner", "$CustomLS", "$ionicPopup", function ($scope, $state, $http, $cordovaBarcodeScanner, $CustomLS, $ionicPopup) {
            $scope.user = $CustomLS.getObject('LoginUser');
            $scope.studentsList = [];
            $http.post(host + '/Attandance/getStudentsList', { 'OrgId': $scope.user.OrgId }).then(function (res) {
                console.log(res);
                $scope.studentsList = res.data.AdmStudents;
            })
            $scope.scannedStudents = {
                Id: [],
                Name: [],
                StudentId: []
            }
            $scope.data = {
            }

            $scope.DeleteCurrentRow = function (index) {

                $scope.scannedStudents.Name.splice(index, 1);
                $scope.scannedStudents.Id.splice(index, 1);
            }
            $scope.scanBarCode = function () {
                $cordovaBarcodeScanner.scan().then(function (imageData) {
                    var Id = imageData.text;
                    $scope.studentsList.forEach(function (value, index) {
                        if (value.StudentId == Id) {
                            $scope.scannedStudents.Name.push(value.Name)
                            $scope.scannedStudents.Id.push(value.Id)
                            $scope.scannedStudents.StudentId.push(value.StudentId)
                        }
                    })
                    localStorage.setItem(JSON.stringify($scope.scannedStudents.Name), JSON.stringify($scope.scannedStudents.Id));

                }, function (error) {
                    console.log("An error happened -> " + error);
                });
            }
            $scope.sendStudentsTimings = function () {

                var pick = $scope.data.choice;
                var jsonObj1 = $scope.scannedStudents.Id;
                var jasonobj4 = localStorage.getItem(JSON.stringify($scope.scannedStudents.Name)).replace(']', '').replace('[', '');
                $scope.date = new Date();
                var jsonObj2 = JSON.stringify($scope.date);
                $http.post(host + '/Attandance/SaveTransport?OrgId=' + $scope.user.OrgId + '&StudentId=' + jasonobj4 + '&scanDateTime=' + jsonObj2 + '&IsPickUp=' + pick).success(function (data) {
                    debugger;
                    if (data.status) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Success',
                            template: 'Saved Successfully!'
                        });
                        $state.go('barCodeScanner');
                        $scope.scannedStudents = {};
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Failed',
                            template: 'Error Occured!'
                        });
                    }
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