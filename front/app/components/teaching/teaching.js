(function() {

    'use strict';

    angular
        .module('app.teaching')
        .controller('Teaching', Teaching);

    Teaching.$inject = ['$uibModal', '$log', '$routeParams', '$location', 'teachingService'];

    function Teaching($uibModal, $log, $routeParams, $location, teachingService){
        var vm = this;

        // Bind variables
        vm.getComments = getComments;
        vm.getUser = getUser;
        vm.getUsers = getUsers;
        vm.modalComment = modalComment;
        vm.updateNotification = updateNotification;
        
        vm.comments = [];
        vm.users = [];
        vm.user = {};

        activate();

        function activate(){
            if($routeParams.user_id){
                getUser($routeParams.user_id);
                getComments($routeParams.user_id);
                return;
            }
            else {
                return getUsers();
            }
        }

        function getComments(user_id){
            return teachingService.getComments(user_id).$promise
                    .then(getCommentsComplete)
                    .catch(getCommentsError);

            function getCommentsComplete(data, status, headers, config){
                console.log(data);
                return vm.comments = data;
            }

            function getCommentsError(error){
                console.log(error);
            }
        }

        function getUsers(){
            return teachingService.getUsers().$promise
                    .then(getUsersComplete)
                    .catch(getUsersError);

            function getUsersComplete(data , status, headers, config){

                var single_user = {};
                angular.forEach(data, function(user, key_user) {

                    single_user = {};
                    single_user.id = user.id;
                    single_user.email = user.email;
                    single_user.name = user.name;
                    single_user.last_name = user.last_name;
                    single_user.last_login = user.last_login;
                    single_user.notification = 0;

                    angular.forEach(user.results, function(result, key_result) {

                        if(single_user.notification === 0){
                            if(result.status_review === 0){
                                single_user.notification = 1;
                            }
                            else {
                                angular.forEach(result.result_phrases, function(result_phrase, key_result_phrase) {
                                    if(single_user.notification === 0){
                                        if(result_phrase.status_review === 0){
                                            single_user.notification = 1;
                                        }
                                        else {
                                            angular.forEach(result_phrase.failed, function(failed, key_failed) {
                                                if(single_user.notification === 0){
                                                    if(failed.status_review === 0){
                                                        single_user.notification = 1;
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });

                    vm.users.push(single_user);
                });

                return vm.users;
            }
            
            function getUsersError(error){
                console.log(error);
            }
        }

        function getUser(user_id){
            return teachingService.getUser(user_id).$promise
                    .then(getUserComplete)
                    .catch(getUserError);

            function getUserComplete(data, status, headers, config){
                historyTable(data);
                return vm.user = data;
            }

            function getUserError(error){
                console.log(error);
            }
        }

        function updateNotification(item_id, item_type, item_notification){

            return teachingService.updateNotification(item_id, item_type, item_notification).$promise
                    .then(updateNotificationComplete)
                    .catch(updateNotificationError);

            function updateNotificationComplete(data , status, headers, config){
                getUser($routeParams.user_id);
            }

            function updateNotificationError(error){
                
            }
        }

        function historyTable(user){
            vm.history_table = [];
            var detail = '';
            var notification = 0;;
            angular.forEach(user.results, function(result, key_result) {
                notification = (result.status_review === 0)? 1:0;
                vm.history_table.push({
                                        'id' : result.id, 
                                        'type' : 'rs', 
                                        'time' : result.created_at, 
                                        'detail' : result.name, 
                                        'notification' : notification, 
                                        'icon' :'flag', 
                                        'class' :'bold',
                                        'delete' : 'deleteResultPhrase'
                                    });
                angular.forEach(result.result_phrases, function(phrase, key_phrase) {
                    notification = (phrase.status_review === 0)? 1:0;
                    if(phrase.detail){
                        vm.history_table.push({
                                                'id' : phrase.id, 
                                                'type' : 'ph', 
                                                'time' : phrase.created_at, 
                                                'detail' : phrase.detail, 
                                                'notification' : notification, 
                                                'icon' :'star-empty', 
                                                'class' :'bold',
                                                'delete' : 'deleteResultPhrase'
                                            });
                    }
                    if(phrase.chaos){
                        vm.history_table.push({
                                                'id' : phrase.id, 
                                                'type' : 'ch', 
                                                'time' : phrase.created_at, 
                                                'detail' : phrase.chaos, 
                                                'icon' : 'cloud', 
                                                'notification' : notification, 
                                                'class' : '',
                                                'delete' : 'deleteChaos'
                                            });
                    }
                    if(phrase.deviation){
                        vm.history_table.push({
                                                'id' : phrase.id, 
                                                'type' : 'dv', 
                                                'time' : phrase.created_at, 
                                                'detail' : phrase.deviation, 
                                                'notification' : notification, 
                                                'icon' : 'random', 
                                                'class' : '',
                                                'delete' : 'deleteDeviation'
                                            });
                    }
                    angular.forEach(phrase.failed, function(failed, key_failed) {
                        detail = 'A DECIR: '+failed.say+'. LO DICHO: '+failed.said+'. LO QUE DESOCULTO: '+failed.uncover;
                        notification = (failed.status_review === 0)? 1:0;
                        vm.history_table.push({
                                                'id' : failed.id, 
                                                'type' : 'fl', 
                                                'time' : failed.created_at, 
                                                'detail' : detail, 
                                                'notification' : notification, 
                                                'icon' : 'warning-sign', 
                                                'class' : '',
                                                'delete' : 'deleteFailed'
                                            });
                    });
                });
            });
        }

        function modalComment(item_id, item_type) {

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/components/teaching/modals/comment/comment.html',
                controller: 'Comment',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    data: function () {
                        return {
                            item_id: item_id,
                            item_type: item_type
                        };
                    }
                }
            });

            // Callback cuando cierra 
            modalInstance.result.then(function (data) {

            }, function () {
                // Con dismiss()
                //$log.info('Modal dismissed at: ' + new Date());
            });            
        } 
        
    }
})();




