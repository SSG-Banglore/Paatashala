// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var element = document.getElementById("deviceready");
        //element.innerHTML = 'Device Ready';
        //element.className += ' ready';
        window.plugins.PushbotsPlugin.initialize("589f09e54a9efa0afc8b4569", { "android": { "sender_id": "284736214165" } });

        window.plugins.PushbotsPlugin.on("notification:received", function (data) {
            alert("received:" + JSON.stringify(data));
            window.plugins.PushbotsPlugin.done(data.pb_n_id);
        }, errorFun);

        // Should be called once the notification is clicked
        window.plugins.PushbotsPlugin.on("notification:clicked", function (data) {
            //alert("clicked:" + JSON.stringify(data));
        },errorFun);

        window.plugins.PushbotsPlugin.on("registered", function (token) {
            localStorage["token"] = token;
        },errorFun);

        window.plugins.PushbotsPlugin.getRegistrationId(function (token) {
            localStorage["token"] = token;
        }, errorFun);
        
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function errorFun(err) {
        console.log(err);
    };
} )();