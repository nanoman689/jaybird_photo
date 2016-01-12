describe('flickrService', function() {
    beforeEach(module('myApp'));

    it('should reutrn a token when an frob is provided',
    inject(function(flickrService, $rootScope, $httpBackend) {
        $httpBackend.expectJSONP('http://flickr.com/services/rest/?api_key=9bf438c9008c14b50c8114ee607b8752&api_sig=9410236754ce773aeb3f75a3ef3237f2&format=json&frob=frob&jsoncallback=JSON_CALLBACK&method=flickr.auth.getToken').respond(200,'"data":{"auth":{"token":{"_content":"THISISTHETOKEN"},"user":{"nsid":"USERID20"}}}}');
        var status = false;
        flickrService.getToken("frob").then(function() {
            status = true;
        });
        $rootScope.$digest();   
        $httpBackend.flush();
        expect(status).toBe(true);
        $httpBackend.verifyNoOutstandingRequest();
    }));
});