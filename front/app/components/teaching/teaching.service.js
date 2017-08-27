(function() {

    'use strict';

    angular
        .module('app.teaching')
        .factory('teachingService', teachingService);

    teachingService.$inject = ['$resource', '$http', 'API_URL', '$window'];

    function teachingService($resource, $http, API_URL, $window){

        var service = {
            createComment : createComment,
            getComments : getComments,
            getUser : getUser,
            getUsers : getUsers,
            highlightComment : highlightComment, 
            updateNotification : updateNotification
        };
        return service;

        function getUser(id){
            var User = $resource(API_URL + 'user/:id', {id : '@id'});
            return User.get({'id' : id});            
        }

        function getUsers(){
            var token = $window.sessionStorage.token;
            var User = $resource(API_URL + 'user');
            return User.query({'token':token});
        }

        function getComments(user_id, read){
            var token = $window.sessionStorage.token;
            var Comment = $resource(API_URL + 'comment');
            return Comment.query({'token':token, 'user_id': user_id, 'read': read });
        }

        function createComment(new_comment) {
            var token = $window.sessionStorage.token;
            new_comment.token = token;

            var Comment = $resource(API_URL + 'comment');            
            return Comment.save(new_comment);
        }

        function highlightComment(comment_id, status) {
            var comment = {'status' : status};

            var Comment = $resource(API_URL + 'comment/:id', {id : '@id'}, {'update': { method:'PUT' }});
            return Comment.update({'id' : comment_id}, comment);
        }

        function updateNotification(elment_id, elment_type, status_review) {
            
            var element = {'status_review' : status_review};

            switch(elment_type){
                case 'rs':
                    var Result = $resource(API_URL + 'result/:id', {id : '@id'}, {'update': { method:'PUT' }});
                    return Result.update({'id' : elment_id}, element);
                break;

                case 'ph':
                case 'ch':
                case 'dv':
                    var ResultPhrase = $resource(API_URL + 'result-phrase/:id', {id : '@id'}, {'update': { method:'PUT' }});
                    return ResultPhrase.update({'id' : elment_id}, element);
                break;

                case 'fl':
                    var Failed = $resource(API_URL + 'failed/:id', {id : '@id'}, {'update': { method:'PUT' }});
                    return Failed.update({'id' : elment_id}, element);
                break;
            }
        }
    }
})();