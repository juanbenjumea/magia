(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('API_URL', 'http://localhost/magia/src/back/')
        .constant('METHODS', {
            'PEIRCE': 1,
            'WU-WEI': 2,
            '11 Pasos': 3,
            '4 discursos': 4
        });
})();
