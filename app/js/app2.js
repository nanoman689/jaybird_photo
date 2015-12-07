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
                var key = "9bf438c9008c14b50c8114ee607b8752";
                var secret = "f70ebe3932a951df";
                var login = secret+"api_key"+key+"formatjsonfrob"+$scope.frob+"jsoncallbackangular.callbacks._0methodflickr.auth.getToken";
                var hash = md5(login);
                var data = {"method": "flickr.auth.getToken", 
                            "api_key": "9bf438c9008c14b50c8114ee607b8752",
                            "frob": $scope.frob,
                            "api_sig": hash,
                            "jsoncallback": "JSON_CALLBACK",
                            "format": "json"};
                var config = {
                            "method":"GET",
                            "params":data,
                            "responseType": "JSONP"
                            }
                $http.jsonp('http://flickr.com/services/rest/', config)
                .then(function(data, status, headers, config) {
                    // do the third step here 
                    //
                    // called when the data is available
                    console.log('Success!');
                    console.log(data);
                    // Auth Token is in the url??
                    
                    var keyToken = "9bf438c9008c14b50c8114ee607b8752";
                    var secretT = "f70ebe3932a951df";
                    var loginT = secretT+"api_key"+key+"auth_token"+hash;
                    var hashT = md5(loginT);
                    var data = {
                            "method": "flickr.people.getInfo",
                            "api_key": "9bf438c9008c14b50c8114ee607b8752"
                    }   
                    var config = {
                            "method":"GET",
                            "params":data,
                            "responseType": "JSONP"
                    }
                    
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