(function() {

    'use strict';

    angular
        .module('app.peirce')
        .controller('Peirce', Peirce);

    Peirce.$inject = ['$uibModal', '$log', '$routeParams', '$location', 'situationService', 'peirceService'];

    function Peirce($uibModal, $log, $routeParams, $location, situationService, peirceService){
        var vm = this;

        vm.analysis_logics = [];
        vm.flag_view_all_analysis = false;
        vm.flag_new_analysis = false;
        vm.logics = [];
        vm.logics_edit = [];
        vm.logics_selected = [];
        vm.new_analysis_logics = [];
        vm.addLogics = addLogics;
        vm.backToResult = backToResult;
        vm.createAnalysis = createAnalysis;
        vm.modalEmergencyZone = modalEmergencyZone;
        vm.modalHypothesis = modalHypothesis;
        vm.modalThesis = modalThesis;
        vm.modalSolution = modalSolution;
        vm.updateAnalysis = updateAnalysis;
        vm.situation_id = $routeParams.situation_id;
        vm.quadrant_hypothesis = 0;
        vm.quadrant_thesis = 0;
        vm.flag_enable_solution = 0;
        vm.flag_has_solution = 0;

        activate($routeParams.situation_id);

        function activate(situation_id){
            getSituation(situation_id);
            getAnalysis(situation_id);
            getLogics();
        }

        function addLogics(analysis){
            vm.flag_new_analysis = true;
            vm.logics_edit = [];
            vm.new_analysis_logics = [];

            if(typeof(analysis) !== 'undefined'){
                vm.flag_analysis_update = true;
                for(var i in analysis.logics){
                    vm.logics_edit.push(analysis.logics[i].id);
                }
                vm.new_analysis_logics = vm.logics_edit;
            }
            else {
                vm.flag_analysis_update = false;
            }
        }

        function updateAnalysis(){
            vm.btn_waiting_update_analysis = true;
            var edit_analysis = {};
            edit_analysis.logics = vm.new_analysis_logics;
            edit_analysis.situation_id = vm.situation_id;
            return peirceService.updateAnalysis(edit_analysis, vm.analysis[0].id).$promise
                    .then(updateAnalysisComplete)
                    .catch(updateAnalysisError);

            function updateAnalysisComplete(data , status, headers, config){
                vm.logics_selected = vm.logics.filter(function(element) {
                    return vm.new_analysis_logics.indexOf(element.id) !== -1;
                });

                vm.analysis[0].logics = vm.logics_selected;
                vm.logics_edit = [];
                vm.new_analysis_logics = [];
                vm.btn_waiting_update_analysis = false;
                vm.flag_new_analysis = false;
            }

            function updateAnalysisError(error){
                if(error.data.message){
                    alert(error.data.message);
                    vm.edit_result = {};
                    vm.btn_waiting_save_result = false;
                }
            }
        }
        
        function createAnalysis(){

            vm.btn_waiting_save_analysis = true;
            var new_analysis = {};
            new_analysis.logics = vm.new_analysis_logics;
            new_analysis.situation_id = vm.situation_id;
            peirceService.createAnalysis(new_analysis).$promise
                    .then(createAnalysisComplete)
                    .catch(createAnalysisError);

            function createAnalysisComplete(data, status, headers, config){
                vm.logics_selected = vm.logics.filter(function(element) {
                    return vm.new_analysis_logics.indexOf(element.id) !== -1;
                });

                data.logics = vm.logics_selected;
                vm.analysis.unshift(data);
                vm.logics_edit = [];
                vm.new_analysis_logics = [];
                vm.btn_waiting_save_analysis = false;
                vm.flag_new_analysis = false;
            }

            function createAnalysisError(error){
                console.log(error);
            }
        }

        function getAnalysis(situation_id){
            return peirceService.getAnalysis(situation_id).$promise
                    .then(getAnalysisComplete)
                    .catch(getAnalysisError);

            function getAnalysisComplete(data , status, headers, config){
                console.log(data);
                if(data.length > 0){
                    if(data[0].hypothesis.length > 0){
                        vm.quadrant_hypothesis = data[0].hypothesis[0].quadrant.position;

                        if(vm.quadrant_hypothesis == 1 || vm.quadrant_hypothesis == 2){
                            vm.quadrant_thesis = vm.quadrant_hypothesis + 2;
                        }
                        if(vm.quadrant_hypothesis == 3 || vm.quadrant_hypothesis == 4){
                            vm.quadrant_thesis = vm.quadrant_hypothesis - 2;
                        }
                    }
                    if(data[0].thesis.length > 0){
                        vm.flag_enable_solution = 1;
                    }
                }
                return vm.analysis = data;
            }

            function getAnalysisError(error){
                console.log(error);
            }
        }

        function getSituation(situation_id){

            return situationService.getSituation(situation_id).$promise
                    .then(getSituationComplete)
                    .catch(getSituationError);
                    
            function getSituationComplete(data , status, headers, config){
                if(data.solution.length){
                    vm.flag_has_solution = 1;
                }
                return vm.situation = data;
            }
            
            function getSituationError(error){
                console.log(error);
            }
        }
        
        function getLogics(){
            return peirceService.getLogics().$promise
                    .then(getLogicsComplete)
                    .catch(getLogicsError);
                    
            function getLogicsComplete(data , status, headers, config){
                return vm.logics = data;
            }
            
            function getLogicsError(error){
                console.log(error);
            }
        }
        
        function backToResult(){
            $location.path('/situation/peirce/'+vm.situation.result_id);
        }
        
        
        
        
        // TODO_MAGIA: Refactorizar
        

        function modalEmergencyZone(quadrant) {
            $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/components/peirce/modals/emergency_zone/emergency-zone.html',
                controller: 'EmergencyZone',
                controllerAs: 'vm',
                size: 'sm',
                resolve: {
                    quadrant: quadrant
                }
            });
        }; 

        function modalHypothesis(quadrant) {
            
            if(vm.quadrant_hypothesis === quadrant || vm.quadrant_hypothesis === 0){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/components/peirce/modals/hypothesis/hypothesis.html',
                    controller: 'Hypothesis',
                    controllerAs: 'vm',
                    size: 'lg',
                    resolve: {
                        data: function () {
                            return {
                                analysis: vm.analysis[0],
                                quadrant: quadrant
                            };
                        }
                    }
                });

                // Callback cuando cierra 
                modalInstance.result.then(function (data) {
                    console.log('respuesta modal hipotesis');
                    console.log(data);
                    vm.quadrant_hypothesis = data.quadrant;
                    if(data.quadrant == 1 || data.quadrant == 2){
                        vm.quadrant_thesis = data.quadrant + 2;
                    }
                    if(data.quadrant == 3 || data.quadrant == 4){
                        vm.quadrant_thesis = data.quadrant - 2;
                    }

                }, function () {
                    // Con dismiss()
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        }; 

        function modalThesis(quadrant) {
            
            if(vm.quadrant_thesis === quadrant){
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/components/peirce/modals/thesis/thesis.html',
                    controller: 'Thesis',
                    controllerAs: 'vm',
                    size: 'lg',
                    resolve: {
                        data: function () {
                            return {
                                analysis: vm.analysis[0],
                                quadrant: quadrant
                            };
                        }
                    }
                });

                // Callback cuando cierra 
                modalInstance.result.then(function (data) {
                    console.log('respuesta modal tesis');
                    console.log(data);
                    vm.flag_enable_solution = 1;
                }, function () {
                    // Con dismiss()
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        }; 

        function modalSolution() {
            
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/components/peirce/modals/solution/solution.html',
                controller: 'Solution',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    data: function () {
                        return {
                            situation: vm.situation,
                            method: 1
                        };
                    }
                }
            });

            // Callback cuando cierra 
            modalInstance.result.then(function (data) {
                console.log('respuesta modal solution');
                console.log(data);
                vm.situation.solution.unshift(data);
                vm.flag_has_solution = 1;
            }, function () {
                // Con dismiss()
                $log.info('Modal dismissed at: ' + new Date());
            });
        }; 
    }
})();




