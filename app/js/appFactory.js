angular.module('myApp', ['ngRoute'])
.constant('secret', 'f70ebe3932a951df')
.constant('key', '9bf438c9008c14b50c8114ee607b8752')
.factory("flickrService", function($http) {
	return {
    	fetchPerson: function() {
      		//code to fetch person details
    	},
    	fetchPhotos: function() {
      		//code to fetch photos of the person
            $scope.photos = [];
    	},
		getToken: function(){
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
	        var defer = $q.defer();
            
            $http.jsonp('http://flickr.com/services/rest/', config)
            
        .then(function(data, status, headers, config) {
		  defer.resolve(data.data.auth.token._content);
	   });
	       return defer.promise;   
    }
  };
})
.controller("flickrController", function($scope, $http){
        // User clicks on button to log into Flickr 
        $scope.flickrService.getToken().then(function(token){
            $scope.token = token;
        })
});	