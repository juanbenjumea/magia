(function() {

    'use strict';

    angular
        .module('app.result')
        .controller("Result", Result);

    Result.$inject = ['$uibModal', '$log', 'resultService'];

    function Result($uibModal, $log, resultService){
        var vm = this;

        // Bind variables
        vm.completeResult = completeResult;
        vm.createResult = createResult;
        vm.createResultPhrase = createResultPhrase;
        vm.modalOpenAddResult = modalOpenAddResult;
        vm.newResultPhraseIni = newResultPhraseIni;
        vm.newResultPhraseUndo = newResultPhraseUndo;
        vm.saveDeviation = saveDeviation;
        vm.saveFailed = saveFailed;
        vm.selectResult = selectResult;
        vm.toggleFlagNewResult = toggleFlagNewResult;
        vm.toggleTabResultOption = toggleTabResultOption;
        vm.updateResult = updateResult;
        vm.updateResultPhrase = updateResultPhrase;

        vm.result_selected = {};
        vm.new_result = {};
        vm.new_result_phrase = {};
        vm.result_phrases = {};
        vm.help_new_result = false;
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
                selectResult(data);
                vm.btn_waiting_save_result = false;
                vm.flag_new_result_phrase = true;
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

            function updateResultComplete(){
                vm.result_selected.name = vm.edit_result.name;
                vm.edit_result = {};
                vm.btn_waiting_update_result = false;
            }

            function updateResultError(){
                
            }
        }

        function completeResult(){
            console.log('entra');
            return resultService.completeResult(vm.result_selected.id).$promise
                    .then(completeResultComplete)
                    .catch(completeResultError);

            function completeResultComplete(){
                console.log('completado')
            }

            function completeResultError(){
                
            }
        }

        function createResultPhrase(){
            vm.btn_waiting_save_result_phrase = true;
            vm.new_result_phrase.result_id = vm.result_selected.id;
            return resultService.createResultPhrase(vm.new_result_phrase).$promise
                    .then(createResultPhraseComplete)
                    .catch(createResultPhraseError);

            function createResultPhraseComplete(data , status, headers, config){
                vm.flag_new_result_phrase = false;
                vm.btn_waiting_save_result_phrase = false;
                vm.deviation_origin = {};
                vm.failed = [];
                data.deviation = vm.deviation;
                data.failed = vm.failed;
                vm.result_phrases.unshift(data);
                vm.new_result_phrase = {};
            }

            function createResultPhraseError(error){
                console.log(error);
            }
        }

        function saveDeviation(){
            vm.btn_waiting_save_deviation = true;
            vm.deviation_origin.result_phrase_origin_id = vm.result_phrases[0].id;
            if(vm.deviation_origin.id){
                return resultService.updateDeviation(vm.deviation_origin, vm.deviation_origin.id).$promise
                    .then(createDeviationComplete)
                    .catch(createDeviationError);
            }
            else {
                return resultService.createDeviation(vm.deviation_origin).$promise
                        .then(createDeviationComplete)
                        .catch(createDeviationError);
            }
            function createDeviationComplete(data , status, headers, config){
                vm.deviation_origin = data;
                vm.btn_waiting_save_deviation = false;
            }

            function createDeviationError(error){
                console.log(error);
            }
        }

        function saveFailed(){
            vm.btn_waiting_save_failed = true;
            vm.failed.result_phrase_id = vm.result_phrases[0].id;
            return resultService.createFailed(vm.failed).$promise
                    .then(createFailedComplete)
                    .catch(createFailedError);

            function createFailedComplete(data , status, headers, config){
                vm.result_phrases[0].failed.unshift(data);
                vm.failed = {};
                vm.btn_waiting_save_failed = false;
            }

            function createFailedError(error){
                console.log(error);
            }
        }

        function updateResultPhrase(){
            vm.btn_waiting_update_result_phrase = true;
            return resultService.updateResultPhrase(vm.new_result_phrase, vm.result_phrases[0].id).$promise
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

        function newResultPhraseIni(){
            vm.new_result_phrase = {};
            vm.flag_new_result_phrase = true;
            console.log(vm.result_phrases);
        }

        function newResultPhraseUndo(){
            vm.new_result_phrase.detail = (vm.result_phrases.length > 0)? vm.result_selected.result_phrases[0].detail : '';
            vm.new_result_phrase.chaos = (vm.result_phrases.length > 0)? vm.result_selected.result_phrases[0].chaos : '';

            vm.flag_new_result_phrase = false;
        }

        function selectResult(result){

            vm.flag_new_result = false;
            vm.flag_new_result_phrase = false;
            vm.tab_result_option = 0;
            vm.result_phrase_detail = '';
            vm.result_phrase_chaos = '';
            vm.new_result_phrase = {};

            if(typeof(result) !== 'undefined') {
                result.result_phrases = [];
                vm.result_selected = result;
            }
            else {
                vm.result_selected = JSON.parse(vm.last_results);
            }

            if(vm.result_selected.result_phrases.length > 0){
                console.log(vm.result_selected.result_phrases);
                vm.result_phrases = vm.result_selected.result_phrases;
                vm.result_phrase_detail = vm.result_selected.result_phrases[0].detail;
                vm.new_result_phrase.detail = vm.result_selected.result_phrases[0].detail;
                vm.new_result_phrase.chaos = vm.result_selected.result_phrases[0].chaos;
                vm.deviation_origin = vm.result_selected.result_phrases[0].deviation_origin;
                vm.deviation_final = vm.result_selected.result_phrases[0].deviation_final;
                vm.filed = vm.result_selected.result_phrases[0].filed;

                vm.flag_new_result_phrase = false;
            }
            else{
                vm.result_phrases = [];
                vm.flag_new_result_phrase = true;
                vm.filed = [];
            }
        }










        /////////// TODO: Refactorizar
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




