(function() {

    'use strict';

    angular
        .module('app.fwf')
        .factory('fwfService', fwfService);

    fwfService.$inject = ['$resource', 'API_URL'];

    function fwfService($resource, API_URL){

        var service = {
            getFwfs : getFwfs
        };
        return service;

        function getFwfs(){
            var Fwf = $resource(API_URL + 'fwf');
            return Fwf.query();
        }

    }
})();