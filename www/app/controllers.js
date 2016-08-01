 (function () {
    'use strict';


angular.module('RestauranteApp').controller('AppCtrl', ['$scope', '$cordovaPush', '$cordovaDialogs', '$cordovaMedia', '$cordovaToast', 'ionPlatform', '$http', 'dataApi', '$cordovaDevice', '$state', '$cordovaLocalNotification', AppCtrl]);
    
    function AppCtrl($cordovaDevice, $scope, $cordovaPush, $cordovaDialogs, $cordovaMedia, $cordovaToast, ionPlatform, $http, dataApi, $state, $cordovaLocalNotification) {

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

            $cordovaToast.showShortCenter('Registered for push notifications');
            $scope.registerDisabled=true;
            // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
           
        }, function (err) {
            console.log("Register error " + err)
        });
    }

    // Notification Received
    //$scope.$on('$cordovaPush:notificationReceived', function (event, notification) {
    //        handleAndroid(notification);
    //});

    window.function_to_be_called = function (notification) {
        switch(notification.event) {

            case 'registered':
               
                if (notification.regid.length > 0 ) {
                    //alert('registration ID = ' + notification.regid);
                    var token = notification.regid;
                    //var uuid = 'test_1';
                    //var platform = 'Android';
                    dataApi.setUsuario(token);
                    //$scope.regId = notification.regid;
                    console.log("Token--->", token);
                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                $state.go('app.promo', {id: 11});
                //alert(notification.message);
                $scope.scheduleSingleNotification = function () {
                  $cordovaLocalNotification.schedule({
                    id: 1,
                    title: 'Alerta de promoción',
                    text: notification.message,
                    data: {
                      customProperty: 'custom value'
                    }
                  }).then(function (result) {
                    // ...
                  });
                };
                //alert(' ' + notification.message + ' id = ' + notification.msgcnt);
                break;

            case 'error':
                alert('GCM error = ' + notification.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    };

    // Android Notification Received Handler
    function handleAndroid(notification) {
        console.log("15.-Entre a handleAndroid notification--->", notification);
        // ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
        //             via the console fields as shown.
        //console.log("16.-In foreground " + notification.foreground  + " Coldstart " + notification.coldstart);
        if (notification.event == "registered") {
            
            $scope.regId = notification.regid;
            console.log("18.-regid in handleAndroid--> ",  notification);
            //storeDeviceToken("android");
        }
        else if (notification.event == "message") {
            console.log("19.-Entre a else notification.event");
            $cordovaDialogs.alert(notification.message, "Push Notification Received");
            $scope.$apply(function () {
                $scope.notifications.push(JSON.stringify(notification.message));
            })
        }
        else if (notification.event == "error")
            $cordovaDialogs.alert(notification.msg, "Push notification error event");
        else $cordovaDialogs.alert(notification.event, "Push notification handler - Unprocessed Event");
    }

   

    // Stores the device token in a db using node-pushserver (running locally in this case)
    //
    // type:  Platform type (ios, android etc)
    function storeDeviceToken(token) {
        console.log("Entre a registrar el token: ", token);

                $http.post('http://gael.net.mocha7004.mochahost.com/API/public/usuario', {
                    correo: 'default@unipixel.com',
                    token: token,
                    tipo: 'android'
                }).
                  success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                  }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                  });
    }


    // Removes the device token from the db via node-pushserver API unsubscribe (running locally in this case).
    // If you registered the same device with different userids, *ALL* will be removed. (It's recommended to register each
    // time the app opens which this currently does. However in many cases you will always receive the same device token as
    // previously so multiple userids will be created with the same token unless you add code to check).
    function removeDeviceToken() {
        console.log("28.-Entre a removeDeviceToken");
        var tkn = {"token": $scope.regId};
        console.log("29.-token in removeDeviceToken--> ",  tkn);
        $http.post('http://192.168.1.16:8000/unsubscribe', JSON.stringify(tkn))
            .success(function (data, status) {
                console.log("30.-Token removed, device is successfully unsubscribed and will not receive push notifications.");
            })
            .error(function (data, status) {
                console.log("31.-Error removing device token." + data + " " + status)
            }
        );
    }

    // Unregister - Unregister your device token from APNS or GCM
    // Not recommended:  See http://developer.android.com/google/gcm/adv.html#unreg-why
    //                   and https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/index.html#//apple_ref/occ/instm/UIApplication/unregisterForRemoteNotifications
    //
    // ** Instead, just remove the device token from your db and stop sending notifications **
    $scope.unregister = function () {
        console.log("32.-Entre a $scope.unregister");
        console.log("33.-Unregister called");
        removeDeviceToken();
        $scope.registerDisabled=false;
        //need to define options here, not sure what that needs to be but this is not recommended anyway
//        $cordovaPush.unregister(options).then(function(result) {
//            console.log("Unregister success " + result);//
//        }, function(err) {
//            console.log("Unregister error " + err)
//        });
    }


};

})();
