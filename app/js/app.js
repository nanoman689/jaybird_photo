angular.module('myApp', ['ngRoute'])
    .factory("flickrLogIn", function($http) {
       
    })
    .controller("flickrController", function($scope, $http){
        $scope.frob = (location.search.split('frob=')[1]||'').split('&')[0];
        console.log("the frob is:" + $scope.frob);
        $scope.flickerLogIn=function(){
            var key="9bf438c9008c14b50c8114ee607b8752";
            var secret="f70ebe3932a951df";
            var login=secret+"api_key"+key+"permsread";
            var hash = md5(login); 
            console.log("The hash is:" + hash);
            var url="http://flickr.com/services/auth/?api_key="+key+"&perms=read&api_sig="+hash;
            window.location=url; 
        }
            if($scope.frob !== ''){
                var key="9bf438c9008c14b50c8114ee607b8752";
                var secret="f70ebe3932a951df";
                var login = secret+"api_key"+key+"callbackangular.callbacks._0frob"+$scope.frob+"methodflickr.auth.getToken";
                var hash = md5(login);
                var data = {"method": "flickr.auth.getToken", 
                            "api_key": "9bf438c9008c14b50c8114ee607b8752",
                            "frob": $scope.frob,
                            "api_sig": hash,
                            "callback": "JSON_CALLBACK"};
                var config = {
                            "method":"GET",
                            "params":data
                            }
                $http.jsonp('http://flickr.com/services/rest/', config)
                .then(function(data, status, headers, config) {
                    console.log('Success!');
                    console.log(data);
                    // called when the data is available
                },
                function(data, status, headers, config) {
                    console.log('Failure :(');
                // called when an error occurs or
                // the server returns data with an error status
                });
            }    
});
                    /*

Key:
9bf438c9008c14b50c8114ee607b8752

Secret:
f70ebe3932a951df

https://nanoman689.github.io/jaybird_photo/app/index.html

*/