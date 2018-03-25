var app = angular.module('notes', []);

app.controller('noteController', ['$scope', function($scope){
    $scope.newNote = "";
}]);