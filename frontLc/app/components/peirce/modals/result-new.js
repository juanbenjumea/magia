(function() {

    'use strict';

    angular
        .module('app.peirce')
        .controller("ResultNew",
            ['$uibModalInstance', 'items'
            , ResultNew]);

    function ResultNew($uibModalInstance, items){
        console.log('modale');
        console.log(items);
        var vm = this;
        //vm.items = items;
        vm.items = [1,2,3];
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