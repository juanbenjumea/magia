(function() {

    'use strict';

    angular
        .module('magic')
        .controller("NewResult",
            ['$uibModalInstance', 'items'
            , NewResult]);

    function NewResult($uibModalInstance, items){
        var vm = this;
        vm.items = items;
        vm.selected = {
            item: vm.items[0]
        };

        vm.ok = function () {
            $uibModalInstance.close(vm.selected.item);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();