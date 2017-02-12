(function() {

    'use strict';

    angular
        .module('app.peirce')
        .controller("EmergencyZone",
            ['$uibModalInstance', 'quadrant'
            , EmergencyZone]);

    function EmergencyZone($uibModalInstance, quadrant){

        var vm = this;
        vm.quadrant = quadrant;

    }
})();