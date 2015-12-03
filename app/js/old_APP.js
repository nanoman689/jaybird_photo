$(document).ready(function() {
 $('.my_button').click(function (){
    var key="9bf438c9008c14b50c8114ee607b8752";
    var secret="f70ebe3932a951df";
    var login=secret+"api_key"+key+"permsread";
    var hash = md5(login); 
    console.log("The hash is:" + hash);
    var url="http://flickr.com/services/auth/?api_key="+key+"&perms=read&api_sig="+hash;
    window.location=url; 
 });  
    var frob = (location.search.split('frob=')[1]||'').split('&')[0];
    console.log("the frob is:" + frob);
    /*  if there is no frob === empty string then tell them to log in using their flickr
        if there is a frob, then get the token from Flickr
        Which should be simliar to the way we did the previous using a AJAX call or something
        This will return 
        
        background call to Flickr to request auth token
        
        http://flickr.com/services/rest/?method=flickr.auth.getToken&api_key=9bf438c9008c14b50c8114ee607b8752&frob=[frob]&api_sig=f70ebe3932a951df
        
        Call should return something: 334455
        
        Store that somewhere
        
        Application now makes a background request to get info about the peron's info.
        
        http://flickr.com/services/rest/?method=flickr.people.getInfo&api_key=9bf438c9008c14b50c8114ee607b8752&auth_token=[334455]&api_sig=f70ebe3932a951df
        
    */
    
});


/* angular stuff

angular.module('myApp', ['ngRoute])
    .factory("flickrLogIn", ['http$', function($http) {
        
    
    }]);




/*

Key:
9bf438c9008c14b50c8114ee607b8752

Secret:
f70ebe3932a951df

https://nanoman689.github.io/jaybird_photo/app/index.html

*/