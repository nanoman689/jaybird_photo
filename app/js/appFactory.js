angular.module('myApp', ['ngRoute'])
.constant('secret', 'f70ebe3932a951df')
.constant('key', '9bf438c9008c14b50c8114ee607b8752')
.factory("flickrLogIn", function($http) {
	return {
    	fetchPerson: function() {
      		//code to fetch person details
    	},
    	fetchPhotos: function() {
      		//code to fetch photos of the person
            $scope.photos = [];
    	},
		getToken: function(){
			//code to get the security token
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
		}
  };
})
.controller("flickrController", function($scope, $http){
	$scope.frob = (location.search.split('frob=')[1]||'').split('&')[0];
	$scope.flickerLogIn=function(){
            var login=secret+"api_key"+key+"permsread";
            var hash = md5(login); 
            console.log("The hash is:" + hash);
            var url="http://flickr.com/services/auth/?api_key="+key+"&perms=read&api_sig="+hash;
            window.location=url; 
     }
});	