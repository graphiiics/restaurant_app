/**
 * Author: hollyschinsky
 * twitter: @devgirfl
 * blog: devgirl.org
 * more tutorials: hollyschinsky.github.io
 */
app.controller('AppCtrl', function($scope, $cordovaPush, ionPlatform, dataApi, $state ) {
    console.log("1.-Entre a AppCtrl");
    $scope.notifications = [];

    // call to register automatically upon device ready
    ionPlatform.ready.then(function (device) {
        console.log("1.1-Entre a ionPlatform.ready.then");
        $scope.register();
    });


    // Register
    $scope.register = function () {
       var config = null;

       
            config = {
                "senderID": "1086713981316", // REPLACE THIS WITH YOURS FROM GCM CONSOLE - also in the project URL like: https://console.developers.google.com/project/434205989073
                "ecb": "function_to_be_called"
            };
        

        $cordovaPush.register(config).then(function (result) {
            console.log("Register success " + result);

            //$cordovaToast.showShortCenter('Registered for push notifications');
            console.log("Registered for push notifications");
            $scope.registerDisabled=true;
            // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
           
        }, function (err) {
            console.log("Register error " + err)
        });
    }


    window.function_to_be_called = function (notification) {
        switch(notification.event) {

            case 'registered':
                if (notification.regid.length > 0 ) {
                    //alert('registration ID = ' + notification.regid);
                    var token = notification.regid;
                    dataApi.setUsuario(token);
                    //$scope.regId = notification.regid;
                    console.log("Token--->", token);
                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                //alert('message holi = ' + notification.message + ' msgCount = ' + notification.msgcnt);
                $state.go('app.promo', {id: notification.msgcnt});
                break;

            case 'error':
                alert('GCM error = ' + notification.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    };

})
