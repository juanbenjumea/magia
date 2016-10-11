(function() {

    'use strict';

    angular
        .module('app.fwf')
        .factory('fwfService', fwfService);

    fwfService.$inject = ['$resource', 'API_URL', '$window'];

    function fwfService($resource, API_URL, $window){

        var service = {
            getFwfs : getFwfs,
            createFwf : createFwf
        };
        return service;

        function getFwfs(){
            var token = $window.sessionStorage.token;
            var Fwf = $resource(API_URL + 'fwf');
            return Fwf.query({'token':token});
        }
        
        function createFwf(new_fwf) {
            var Fwf = $resource(API_URL + 'fwf');
            return Fwf.save(new_fwf);
        }

    }
})();