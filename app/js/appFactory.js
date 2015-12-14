angular.module('myApp', ['ngRoute'])
.constant('secret', 'f70ebe3932a951df')
.constant('key', '9bf438c9008c14b50c8114ee607b8752')
.factory("flickrLogIn", function($http) {
       
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