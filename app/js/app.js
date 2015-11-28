$(document).ready(function() {
 $('.my_button').click(function (){
    var key="9bf438c9008c14b50c8114ee607b8752";
    var secret="f70ebe3932a951df";
    var login=secret+"api_key"+key+"permsread";
    var hash = md5(login); 
    console.log(hash);
    var url="http://flickr.com/services/auth/?api_key="+key+"&perms=read&api_sig="+hash;
    window.location=url; 
 });  
    var frob = (location.search.split('frob=')[1]||'').split('&')[0];
    console.log(frob);
    
});



/*

Key:
9bf438c9008c14b50c8114ee607b8752

Secret:
f70ebe3932a951df

https://github.com/nanoman689/jaybird_photo
*/