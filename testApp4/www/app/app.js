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
        .state("view-ParentGallery", {
            url: "/view-ParentGallery",
            templateUrl: "app/templates/view-ParentGallery.html",
            controller: "ParentGalleryCtrl"
        })
        .state("view-EmployeeDairy", {
            url: "/view-EmployeeDairy",
            templateUrl: "app/templates/view-EmployeeDairy.html",
            controller: "EmployeeDairyCtrl"
        })
        .state("NextEmployeeDairy", {
            url: "/NextEmployeeDairy",
            params: {
                BatchId: '',
                CourseId: '',
                DairyDetails: '',
                Date: ''
            },
            templateUrl: "app/templates/view-NextEmployeeDairy.html",
            controller: "nextEmployeeDairyCtrl"
        })
            .state("view-ParentDairy", {
                url: "/view-ParentDairy",
                templateUrl: "app/templates/view-ParentDairy.html",
                controller: "ParentDairyCtrl"
            })
		.state('app.setting', {
		    url: '/setting',
		    templateUrl: 'app/templates/view-setting.html',
		    controller: 'settingCtrl'
		})
		.state('manage-children', {
		    url: '/manage-children',
		    templateUrl: 'app/templates/view-manage-children.html',
		    controller: 'manageChildrenCtrl'
		})
		.state('app.change-student', {
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
        .state("appemp", {
            url: "/appemp",
            abstract: true,
            templateUrl: "app/templates/view-menu-employee.html",
            controller: "appempCtrl"
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
		.state("app.view-parent-home", {
		    url: "/view-parent-home",
		    templateUrl: "app/templates/view-parent-home.html",
		    controller: "parentHomeCtrl"
		})
		.state("appemp.view-Employee-home", {
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
		.state("view-studentDetail", {
		    url: "/view-studentDetail",
		    templateUrl: "app/templates/view-studentDetail.html",
		    controller: "studentDetailsCtrl"
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
		    templateUrl: "app/templates/view-geolocation.html",
		    controller: "GeolocationCtrl"
		})
		.state("EmployeeProfile", {
		    url: "/EmployeeProfile",
		    templateUrl: "app/templates/EmployeeProfile.html",
		    controller: "EmployeeProfileCtrl"
		})
		.state("appemp.EmployeeSettings", {
		    url: "/EmployeeSettings",
		    templateUrl: "app/templates/view-EmployeeSettings.html",
		    controller: "EmployeeSettingsCtrl"
		})
		.state("Employeeholidays", {
		    url: "/Employeeholidays",
		    templateUrl: "app/templates/view-EmployeeHolidays.html",
		    controller: "EmployeeHolidaysCtrl"
		})
		.state("Transport", {
		    url: "/Transport",
		    templateUrl: "app/templates/view-transport.html",
		    controller: "TransportCtrl"
		})
		.state("EmployeeGallery", {
		    url: "/EmployeeGallery",
		    templateUrl: "app/templates/view-employee-gallery.html",
		    controller: "EmployeeGalleryCtrl"
		})
        .state("EmployeeGalleryGrid", {
            url: "/EmployeeGalleryGrid",
            params: { BatchId: 0, CourseId: 0 },
            templateUrl: "app/templates/view-employee-gallery-grid.html",
            controller: "EmployeeGalleryGridCtrl"
        })
        .state("ParentGalleryGrid", {
            url: "/ParentGalleryGrid",
            templateUrl: "app/templates/view-parent-gallery-grid.html",
            controller: "ParentGalleryGridCtrl"
        })
		.state("Attendance", {
		    url: "/Attendance",
		    templateUrl: "app/templates/Attendance.html",
		    controller: "AttendanceCtrl"
		})
        .state("EmployeeBarcodeAttendance", {
            url: "/EmployeeBarcodeAttendance",
            templateUrl: "app/templates/view-EmployeeBarcodeAttendance.html",
            controller: "employeeBarcodeAttendanceCtrl"
        })
		.state("EmployeeAttendance", {
		    url: "/EmployeeAttendance",
		    templateUrl: "app/templates/EmployeeAttendance.html",
		    controller: "employeeAttendenceCtrl"
		})
        .state("EmployeeManualAttendance1", {
            url: "/EmployeeManualAttendance",
            templateUrl: "app/templates/view-EmployeeManualAttandance.html",
            controller: "employeeManualAttendenceCtrl"
        })
		.state("debug", {
		    url: '/debug',
		    templateUrl: 'app/templates/view-debug.html',
		    controller: 'debugCtrl'
		})
		.state("NextEmployeeAttendanceScreen", {
		    url: "/NextEmployeeAttendance",
		    params: {
		        BatchId: '',
		        CourseId: '',
		        Date: ''
		    },
		    templateUrl: "app/templates/NextEmployeeAttendance.html",
		    controller: "nextEmployeeAttendanceCtrl"
		})
        .state("NextEmployeeManualAttendanceScreen", {
            url: "/NextEmployeeManualAttendance",
            params: {
                RoleId: '',
                Date: ''
            },
            templateUrl: "app/templates/view-NextEmployeeManualAttandance.html",
            controller: "nextEmployeeManualAttendanceCtrl"
        })
		.state("EnquiryFormScreen", {
		    url: "/EnquiryForm",
		    templateUrl: "app/templates/EnquiryForm.html",
		    controller: "enquiryFormCtrl"
		})
        //.state("NextEnquiryForm", {
		//    url: "/NextEnquiryForm",
		//    templateUrl: "app/templates/NextEnquiryForm.html",
		//    controller: "nextEnquiryFormCtrl"
		//})
		.state("view-trackstudent", {
		    url: "/view-trackstudent",
		    templateUrl: "app/templates/view-trackstudent.html",
		    controller: "TrackStudentCtrl"
		})
	    .state("messageShow", {
	        url: "/messageShow",
	        templateUrl: "app/templates/view-message-show.html",
	        controller: "messageShowCtrl",
	        params: { data: null }
	    });

	    if (localStorage['LoginUser'] && localStorage['LoginType'] == 'Parent') {
	        $urlRouterProvider.otherwise("/app/view-parent-home");
	    } else if (localStorage['LoginUser'] && localStorage['LoginType'] == 'Employee') {
	        $urlRouterProvider.otherwise("/appemp/view-Employee-home");
	    } else {
	        $urlRouterProvider.otherwise("/login");
	        //$urlRouterProvider.otherwise("/view-parent-home");
	        //$urlRouterProvider.otherwise("/view-Employee-home");
	    }

	    //$urlRouterProvider.otherwise("/app/home");
	})
	.config(function ($httpProvider) {
	    $httpProvider.interceptors.push('authInterceptorService');
	});
})();