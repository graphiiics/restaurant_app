(function () {
    'use strict';

    angular.module('RestauranteApp').factory('dataApi', ['$http', '$q','$cordovaDevice',  dataApi]);
    //angular.module('RestauranteApp').factory('dataApi', [dataApi]);

    function dataApi($http, $q, $cordovaDevice) {
    //function dataApi() {
        
        
        function getRestaurantes(){
        	var deferred = $q.defer();

        	//$http.get("http://localhost/API/public/restaurantes")
        	$http.get("http://graphiiics.com/public/restaurantes")
        		 .success(function(data){
        		 	deferred.resolve(data);
        		 	console.log("data restaurantes since $http-->", data);
        		 })
        		 .error(function(data, status, headers, config){
        		 	console.log("Error while making HTTP call");
        		 	deferred.reject();
                    var error = "function getRestaurantes ERROR---> " +status;
                    setFallo(error);
        		 });
        		 return deferred.promise;
        }

        function getDatosDestacadosRestaurante(id){
        	var deferred = $q.defer();

        	//$http.get("http://localhost/API/public/datos_destacados/" + id)
        	$http.get("http://graphiiics.com/public/datos_destacados/" + id)
        		 .success(function(data){
        		 	deferred.resolve(data);
        		 	console.log("data restaurantes since $http-->", data);
        		 })
        		 .error(function(data, status, headers, config){
        		 	console.log("Error while making HTTP call");
        		 	deferred.reject();
                    var error = "function getDatosDestacadosRestaurante ERROR---> " +status;
                    setFallo(error);
        		 });
        		 return deferred.promise;
        }

        function getRestaurante(id){
            var deferred = $q.defer();

            //$http.get("http://localhost/API/public/datos_destacados/" + id)
            $http.get("http://graphiiics.com/public/restaurante/" + id)
                 .success(function(data){
                    deferred.resolve(data);
                    console.log("data RESTAURANTE since $http-->", data);
                 })
                 .error(function(data, status, headers, config){
                    console.log("Error while making HTTP call");
                    deferred.reject();
                    var error = "function getRestaurante ERROR---> " +status;
                    setFallo(error);
                 });
                 return deferred.promise;
        }


        function getImagenesMenuRestaurante(id){
        	var deferred = $q.defer();

        	//$http.get("http://localhost/API/public/imagenes_menu/" + id)
        	$http.get("http://graphiiics.com/public/imagenes_menu/" + id)
        		 .success(function(data){
        		 	deferred.resolve(data);
        		 	console.log("data restaurantes since $http-->", data);
        		 })
        		 .error(function(data, status, headers, config){
        		 	console.log("Error while making HTTP call");
        		 	deferred.reject();
                    var error = "function getImagenesMenuRestaurante ERROR---> " +status;
                    setFallo(error);
        		 });
        		 return deferred.promise;
        }

        function getFotosRestaurante(id){
        	var deferred = $q.defer();

        	//$http.get("http://localhost/API/public/fotos_restaurante/" + id)
        	$http.get("http://graphiiics.com/public/fotos_restaurante/" + id)
        		 .success(function(data){
        		 	deferred.resolve(data);
        		 	console.log("data restaurantes since $http-->", data);
        		 })
        		 .error(function(data, status, headers, config){
        		 	console.log("Error while making HTTP call");
        		 	deferred.reject();
                    var error = "function getFotosRestaurante ERROR---> " +status;
                    setFallo(error);
        		 });
        		 return deferred.promise;
        }

        function getPromocionesRestaurante(id){
        	var deferred = $q.defer();

        	//$http.get("http://localhost/API/public/promociones/" + id)
        	$http.get("http://graphiiics.com/public/promociones/" + id)
        		 .success(function(data){
        		 	deferred.resolve(data);
        		 	console.log("data restaurantes since $http-->", data);
        		 })
        		 .error(function(data, status, headers, config){
        		 	console.log("Error while making HTTP call");
        		 	deferred.reject();
                    var error = "function getPromocionesRestaurante ERROR---> " +status;
                    setFallo(error);
        		 });
        		 return deferred.promise;
        }

        function getPromocion(id){
        	var deferred = $q.defer();

        	//$http.get("http://localhost/API/public/promocion/" + id)
        	$http.get("http://graphiiics.com/public/promocion/" + id)
        		 .success(function(data){
        		 	deferred.resolve(data);
        		 	console.log("data restaurantes since $http-->", data);
        		 })
        		 .error(function(data, status, headers, config){
        		 	console.log("Error while making HTTP call");
        		 	deferred.reject();
                    var error = "function getPromocion ERROR---> " +status;
                    setFallo(error);
        		 });
        		 return deferred.promise;
        }

        function setUsuario(token) {
        		console.log("Entre a registrar el token: ", token);
                    var platform = $cordovaDevice.getPlatform();
                    var uuid = $cordovaDevice.getUUID();

                    console.log('Plataforma-->'+platform);
                    console.log('ID...>'+uuid);

                    $http.post('http://graphiiics.com/public/usuario', {
                        id: uuid,
                    	correo: uuid,
                    	token: token,
                    	tipo: platform
                    }).
					  success(function(data, status, headers, config) {
					    // this callback will be called asynchronously
					    // when the response is available
					  }).
					  error(function(data, status, headers, config) {
                        var error = "function setUsuario ERROR---> " +status;
                        setFallo(error);
					    // called asynchronously if an error occurs
					    // or server returns response with an error status.
					  });

                }
        function setSuscripcion(idRestaurante) {
        
                    var uuid = $cordovaDevice.getUUID();
                    //var uuid = 'pepinito15';
                    console.log('ID...>'+uuid);

                    $http.post('http://graphiiics.com/public/suscribir_outin', {
                        id_restaurante: idRestaurante,
                        id_usuario: uuid
                    }).
                      success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                      }).
                      error(function(data, status, headers, config) {
                        var error = "function setSuscripcion ERROR---> " +status;
                        setFallo(error);
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                      });

                }



        function getCalificacion(id_restaurante){
            var deferred = $q.defer();

            //var uuid = 'pepinito15';
            var uuid = $cordovaDevice.getUUID();

            //$http.get("http://localhost/API/public/promocion/" + id)
            $http.get("http://graphiiics.com/public/obtenerCalificacion?id_restaurante=" + id_restaurante + "&id_usuario=" + uuid)
                 .success(function(data){
                    deferred.resolve(data);
                    console.log("data calificion since $http-->", data);
                 })
                 .error(function(data, status, headers, config){
                    console.log("Error while making HTTP call");
                    deferred.reject();
                    var error = "function getCalificacion ERROR---> " +status;
                    setFallo(error);
                 });
                 return deferred.promise;
        }

        function getSuscripcion(id_restaurante){
            var deferred = $q.defer();

            //var uuid = 'pepinito15';
            var uuid = $cordovaDevice.getUUID();

            //$http.get("http://localhost/API/public/promocion/" + id)
            $http.get("http://graphiiics.com/public/consultar_suscribir?id_restaurante=" + id_restaurante + "&id_usuario=" + uuid)
                 .success(function(data){
                    deferred.resolve(data);
                    console.log("data calificion since $http-->", data);
                 })
                 .error(function(data, status, headers, config){
                    console.log("Error while making HTTP call");
                    deferred.reject();

                    var error = "function getSuscripcion ERROR---> " +status;
                    setFallo(error);
                 });
                 return deferred.promise;
        }

        function setCalificacion(id_calif, calif, id_restaurante) {
        
                    //var uuid = 'pepinito15';
                    var uuid = $cordovaDevice.getUUID();
                    //console.log('ID...>'+uuid);

                    $http.post('http://graphiiics.com/public/ponerCalificacion', {
                        id: id_calif,
                        calificacion: calif,
                        id_restaurante: id_restaurante,
                        id_usuario: uuid
                    }).
                      success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                      }).
                      error(function(data, status, headers, config) {
                        var error = "function setCalificacion ERROR---> " +status;
                        setFallo(error);
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                      });

                }

        function updateCalificacion(id_restaurante) {
        

                    $http.post('http://graphiiics.com/public/actualizarCalificacion', {
                        id_restaurante: id_restaurante
                    }).
                      success(function(data, status, headers, config) {
                        console.log("updateCalificacion--->", status);
                      }).
                      error(function(data, status, headers, config) {
                        var error = "function updateCalificacion ERROR---> " +status;
                        setFallo(error);
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                      });

                }
        function setSugerencia(fecha,texto) {
        

                    //var uuid = 'pepinito15';
                    var uuid = $cordovaDevice.getUUID();
                    //console.log('ID...>'+uuid);

                    $http.post('http://graphiiics.com/public/crearSugerencia', {
                        fecha: fecha,
                        texto: texto,
                        id_usuario: uuid
                    }).
                      success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                      }).
                      error(function(data, status, headers, config) {
                        var error = "function setSugerencia ERROR---> " +status;
                        setFallo(error);
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                      });

                }
        function setFallo(descripcion) {
        

                    //var uuid = 'pepinito15';
                    var uuid = $cordovaDevice.getUUID();
                    //console.log('ID...>'+uuid);

                    $http.post('http://graphiiics.com/public/guardarFallo', {
                        descripcion: descripcion,
                        id_usuario: uuid
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

        return {
            getRestaurantes: getRestaurantes,
            getDatosDestacadosRestaurante: getDatosDestacadosRestaurante,
            getImagenesMenuRestaurante: getImagenesMenuRestaurante,
            getFotosRestaurante: getFotosRestaurante,
            getPromocionesRestaurante: getPromocionesRestaurante,
            getPromocion: getPromocion,
            getRestaurante: getRestaurante,
            setUsuario: setUsuario,
            setSuscripcion: setSuscripcion,
            getCalificacion: getCalificacion,
            setCalificacion: setCalificacion,
            getSuscripcion: getSuscripcion,
            updateCalificacion: updateCalificacion,
            setSugerencia: setSugerencia,
            setFallo: setFallo
        };
    };
})();