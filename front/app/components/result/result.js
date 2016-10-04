(function() {

    'use strict';

    angular
        .module('app.result')
        .controller('Result', Result);

    Result.$inject = ['$uibModal', '$log', '$location', 'resultService'];

    function Result($uibModal, $log, $location, resultService){
        var vm = this;

        // Bind variables
        vm.completeResult = completeResult;
        vm.createResult = createResult;
        vm.createResultPhrase = createResultPhrase;
        vm.goToPierce = goToPierce;
        vm.modalOpenAddResult = modalOpenAddResult;
        vm.newResultPhraseIni = newResultPhraseIni;
        vm.createFailed = createFailed;
        vm.createDeviation = createDeviation;
        vm.selectResult = selectResult;
        vm.toggleFlagNewResult = toggleFlagNewResult;
        vm.toggleTabResultOption = toggleTabResultOption;
        vm.updateResult = updateResult;
        vm.updateResultPhrase = updateResultPhrase;

        vm.result_selected = {};
        vm.new_result = {};
        vm.new_result_phrase = {};
        vm.result_phrases = {};
        vm.flag_new_result = true;
        vm.flag_edit_result = false;
        
        activate();

        function activate(){
            return getResults();
        }

        function getResults(){
            return resultService.getResults().$promise
                    .then(getResultsComplete)
                    .catch(getResultsError);
                    
            function getResultsComplete(data , status, headers, config){
                return vm.results = data;
            }
            
            function getResultsError(error){
                console.log(error);
            }
        }

        function toggleFlagNewResult(value){
            vm.flag_new_result = value;
            vm.last_results = 0;
        }
        
        function toggleTabResultOption(value){
            vm.tab_result_option = (vm.tab_result_option === value)? 0 : value;
        }

        function createResult(){
            vm.btn_waiting_save_result = true;

            return resultService.createResult(vm.new_result).$promise
                    .then(createResultComplete)
                    .catch(createResultError);
                    
            function createResultComplete(data , status, headers, config){

                vm.new_result = {};
                vm.results.unshift(data);
                selectResult(data.id);
                vm.btn_waiting_save_result = false;
            }

            function createResultError(error){

                if(error.data.message){
                    alert(error.data.message);
                    vm.btn_waiting_save_result = false;
                }
            }
        }

        function updateResult(){
            vm.btn_waiting_update_result = true;
            return resultService.updateResult(vm.edit_result, vm.result_selected.id).$promise
                    .then(updateResultComplete)
                    .catch(updateResultError);

            function updateResultComplete(data , status, headers, config){
                vm.result_selected.name = vm.edit_result.name;
                vm.edit_result = {};
                vm.btn_waiting_update_result = false;
            }

            function updateResultError(error){
                if(error.data.message){
                    alert(error.data.message);
                    vm.edit_result = {};
                    vm.btn_waiting_save_result = false;
                }
            }
        }

        function completeResult(){

            return resultService.completeResult(vm.result_selected.id).$promise
                    .then(completeResultComplete)
                    .catch(completeResultError);

            function completeResultComplete(data , status, headers, config){
                console.log('completado');
            }

            function completeResultError(error){
                
            }
        }

        function createResultPhrase(){
            vm.btn_waiting_save_result_phrase = true;
            vm.new_result_phrase.result_id = vm.result_selected.id;
            return resultService.createResultPhrase(vm.new_result_phrase).$promise
                    .then(createResultPhraseComplete)
                    .catch(createResultPhraseError);

            function createResultPhraseComplete(data, status, headers, config){
                vm.btn_waiting_save_result_phrase = false;
                selectResult(vm.result_selected.id);
            }

            function createResultPhraseError(error){
                if(error.data.message){
                    alert(error.data.message);
                    vm.edit_result = {};
                    vm.btn_waiting_save_result = false;
                }
            }
        }

        function createFailed(){
            vm.btn_waiting_save_failed = true;
            vm.new_failed.result_phrase_id = vm.result_phrases[0].id;

            return resultService.createFailed(vm.new_failed).$promise
                    .then(createFailedComplete)
                    .catch(createFailedError);

            function createFailedComplete(data , status, headers, config){
                vm.result_phrases[0].failed.unshift(data);
                vm.new_failed = {};
                vm.btn_waiting_save_failed = false;
            }

            function createFailedError(error){
                console.log(error);
            }
        }

        function updateResultPhrase(){
            vm.btn_waiting_update_result_phrase = true;
            return resultService.updateResultPhrase(vm.update_result_phrase, vm.result_phrases[0].id).$promise
                    .then(updateResultPhraseComplete)
                    .catch(updateResultPhraseError);

            function updateResultPhraseComplete(data , status, headers, config){
                vm.btn_waiting_update_result_phrase = false;
                vm.result_phrases = vm.result_phrases.filter(function(element) {
                    return element.id !== data.id;
                });
                vm.result_phrases.unshift(data);
            }

            function updateResultPhraseError(error){
                console.log(error);
            }
        }

        function createDeviation(){
            vm.btn_waiting_save_deviation = true;
            var deviation = {'deviation': vm.new_result_phrase.deviation};
            resultService.updateDeviation(deviation, vm.result_phrases[0].id).$promise
                    .then(updateDeviationComplete)
                    .catch(updateDeviationError);
            
            function updateDeviationComplete(){
                vm.btn_waiting_save_deviation = false;
            }

            function updateDeviationError(){
                vm.btn_waiting_save_deviation = false;
            }

            // Guardar nueva frase resultado
            if(typeof(vm.new_result_phrase.chaos) !== 'undefined' || typeof(vm.new_result_phrase.detail) !== 'undefined'){
                createResultPhrase();
            }
        }

        function newResultPhraseIni(){
            vm.new_result_phrase = {};
        }

        function selectResult(result_id){

            // TODO_MAGIA: Consultar toda la información asociada al result, 
            // pues cuando se crea información no se está está asociando al array que hay en el value

            vm.flag_new_result = false;
            vm.tab_result_option = 0;
            vm.result_phrase_detail = '';
            vm.result_phrase_chaos = '';
            vm.update_result_phrase = {};
            vm.new_result_phrase = {};

            if(typeof(result_id) !== 'undefined') {
                return resultService.getResult(result_id).$promise
                    .then(getResultComplete)
                    .catch(getResultError);
            }
            else {
                return resultService.getResult(vm.last_results).$promise
                    .then(getResultComplete)
                    .catch(getResultError);
            }
            
            function getResultComplete(data, status, headers, config){
                vm.result_selected = data;

                if(vm.result_selected.result_phrases.length > 0){

                    vm.result_phrases = vm.result_selected.result_phrases;
                    vm.result_phrase_detail = vm.result_selected.result_phrases[0].detail;
                    vm.update_result_phrase.detail = vm.result_selected.result_phrases[0].detail;
                    vm.update_result_phrase.chaos = vm.result_selected.result_phrases[0].chaos;
                    vm.new_result_phrase.deviation = vm.result_selected.result_phrases[0].deviation;
                    vm.failed = vm.result_selected.result_phrases[0].failed;
                }
                else{
                    vm.result_phrases = [];
                    vm.failed = [];
                }
            }

            function getResultError(error){
                console.log(error);
            }
        }

        function goToPierce(){
            $location.path('/situation/peirce/'+vm.result_selected.id);
        }









        // TODO_MAGIA: Refactorizar
        function modalOpenAddResult(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/components/result/modals/result-new.html',
                controller: 'ResultNew',
                controllerAs: 'vm',
                size: size,
                resolve: {
                    items: function () {
                        return vm.items;
                    }
                }
            });

            // Callback cuando cierra 
            modalInstance.result.then(function (selectedItem) {
                // Con close()
                vm.selected = selectedItem;
                console.log('pasando');
            }, function () {
                // Con dismiss()
                $log.info('Modal dismissed at: ' + new Date());
            });
        }; 
    }
})();




