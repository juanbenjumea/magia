(function() {

    'use strict';

    angular
        .module('app.teaching')
        .controller('Comment', Comment);

    Comment.$inject = ['$uibModalInstance', 'teachingService', 'data'];

    function Comment($uibModalInstance, teachingService, data){

        var vm = this;
        vm.item_id = data.item_id;
        vm.item_type = data.item_type;
        vm.createComment = createComment;
        vm.dismiss = dismiss;

        function createComment(){

            var new_comment = {};
            new_comment.comment = vm.new_comment.comment;
            new_comment.item_id = vm.item_id;
            new_comment.item_type = vm.item_type;

            teachingService.createComment(new_comment).$promise
                    .then(createCommentComplete)
                    .catch(createCommentError);

            function createCommentComplete(data, status, headers, config){
                data.quadrant = vm.quadrant;
                $uibModalInstance.close(data);
            }

            function createCommentError(error){
                console.log(error);
                dismiss();
            }
        }

        function dismiss() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();