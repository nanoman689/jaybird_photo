angular.module('myApp', ['ngRoute'])
    .factory("flickrLogIn", function($http) {
       return {
           'fetch' : function(){
                $scope.frob = (location.search.split('frob=')[1]||'').split('&')[0];
                $scope.photos = [];
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
            }
       }
    });