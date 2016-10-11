(function() {

    'use strict';

    angular
        .module('app.fwf')
        .controller('Fwf', Fwf);

    Fwf.$inject = ['$uibModal', '$log', '$routeParams', '$location', 'fwfService'];

    function Fwf($uibModal, $log, $routeParams, $location, fwfService){
        var vm = this;

        vm.fwfs = [];
        vm.method_selected = $routeParams.method;
        vm.flag_new_fwf = false;
        vm.createFwf = createFwf;

        activate($routeParams.result_id);

        function activate(result_id){
            getFwfs();
        }

        function getFwfs(){
            return fwfService.getFwfs().$promise
                    .then(getFwfsComplete)
                    .catch(getFwfsError);

            function getFwfsComplete(data , status, headers, config){
                console.log(data);
                return vm.fwfs = data;
            }

            function getFwfsError(error){
                console.log(error);
            }
        }

        function createFwf(){

            vm.btn_waiting_save_fwf = true;
            fwfService.createFwf(vm.new_fwf).$promise
                    .then(createFwfComplete)
                    .catch(createFwfError);
            
            function createFwfComplete(data, status, headers, config){
                vm.fwfs.push(data);
                vm.new_fwf = {};
                vm.flag_new_fwf = false;
                vm.btn_waiting_save_fwf = false;
            }

            function createFwfError(error){
                console.log(error);
                if(error.data.message){
                    alert(error.data.message);
                }
                vm.btn_waiting_save_fwf = false;
            }
        }
    }
})();




