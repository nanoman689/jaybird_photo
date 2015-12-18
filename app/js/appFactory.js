angular.module('myApp', ['ngRoute'])
.constant('secret', 'f70ebe3932a951df')
.constant('key', '9bf438c9008c14b50c8114ee607b8752')
.factory("flickrService", function($http, $q, secret, key) {
	return {
    	fetchPerson: function() {
      		//code to fetch person details
    	},
    	fetchPhotos: function(userID,authToken) {
      		//code to fetch photos of the person
            $scope.photos = [];
            var keyToken = "9bf438c9008c14b50c8114ee607b8752";
            var secretT = "f70ebe3932a951df";
            var loginT = secretT+"api_key"+keyToken+"auth_token"+authToken+"formatjsonjsoncallbackangular.callbacks._1methodflickr.people.getPhotos"+"user_id"+userID;
            var hashT = md5(loginT);
            var data = {
                        "method": "flickr.people.getPhotos",
                        "api_key": "9bf438c9008c14b50c8114ee607b8752",
                        "auth_token" : authToken,
                        "api_sig": hashT,
                        "user_id": userID,
                        "format": "json",
                        "jsoncallback": "JSON_CALLBACK"
                    };   
            var config = {
                        "method":"GET",
                        "params":data,
                        "responseType": "JSONP"
                    }
            var defer = $q.defer();
            
            $http.jsonp('http://flickr.com/services/rest', config)
   
        .then(function(data, status, headers, config){
                console.log(data);
                var photos = [];
                for ( r=0 ; r < data.data.photos.photo.length; r++ ){
                            var url="https://farm"+data.data.photos.photo[r].farm+".staticflickr.com/"+data.data.photos.photo[r].server+"/"+data.data.photos.photo[r].id+"_"+data.data.photos.photo[r].secret+".jpg";
                        photos.push(url);
                        }
                defer.resolve(photos);    
            
                }
            );
            return defer.promise;
        },
		getToken: function(frob){  
	        var login = secret+"api_key"+key+"formatjsonfrob"+frob+"jsoncallbackangular.callbacks._0methodflickr.auth.getToken";
            var hash = md5(login);
            var data = {"method": "flickr.auth.getToken", 
				        "api_key": "9bf438c9008c14b50c8114ee607b8752",
                        "frob": frob,
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
		  var id = {
              "token": data.data.auth.token._content,
              "userID": data.data.auth.user.nsid
          }
                defer.resolve(id);
	   });
	       return defer.promise;   
    }
  };
})
.controller("flickrController", function(flickrService, $scope, $http, $q){
        // User clicks on button to log into Flickr 
    $scope.frob = (location.search.split('frob=')[1]||'').split('&')[0];
    
    if($scope.frob !== ''){
        flickrService.getToken($scope.frob).then(function(result){
        $scope.token = result.token;
        $scope.userID = result.userID;    
        console.log($scope.token);
        var defer = $q.defer();
        defer.resolve;
        return defer.promise;    
        }).then(function(){
            flickrService.fetchPhotos($scope.userID, $scope.token).then(
                function(result){
                    $scope.photos = result;
                    console.log($scope.photos);
                }
            );     
        });
    }
    
    $scope.flickrLogIn=function(){
        var key="9bf438c9008c14b50c8114ee607b8752";
        var secret="f70ebe3932a951df";
        var login=secret+"api_key"+key+"permsread";
        var hash = md5(login); 
        console.log("The hash is:" + hash);
        var url="http://flickr.com/services/auth/?api_key="+key+"&perms=read&api_sig="+hash;
        window.location=url; 
    }
});	