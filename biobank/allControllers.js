'use strict';

var allControllers = angular.module('allControllers', []);

allControllers.factory('initvalues', [function () {
    return {sets:
        [
            {id:"A", size:"50"},
            {id:"B", size:"30"},
            {id:"C", size:"20"},
            {id:"A,B", size:"10"},
            {id:"B,C", size:"10"},
            {id:"A,C", size:"10"},
            {id:"A,B,C", size:"5"}
            //{id:"A", size:50},
            //{id:"B", size:30},
            //{id:"C", size:20},
            //{id:"A,B", size:10},
            //{id:"B,C", size:10},
            //{id:"A,C", size:10},
            //{id:"A,B,C", size:5}
        ]
    };
}]);

allControllers.controller('MainCtrl', ['$scope', 'initvalues', function ($scope, initvalues) {
    $scope.sets = initvalues.sets;

}]);

