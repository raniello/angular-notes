var app = angular.module('notes', []);

app.controller('noteController', ['$scope', function($scope){
    $scope.notes = [];

    $scope.newNote = "";
    $scope.addNote = function(note){
        $scope.notes.push(firstToUpperCase(note));
        $scope.newNote = "";
    }

    $scope.deleteNote = function(noteIndex){
        $scope.notes.splice(noteIndex, 1);
    }
}]);

app.filter('firstUppercase', function(){
    return firstToUpperCase;
});

app.directive('preview', function(){
    return {
        restrict: 'E',
        templateUrl : "preview.html"
    };
})
.directive('noteList', function(){
    return {
        restrict: 'E',
        templateUrl : "noteList.html"
    };
})


var firstToUpperCase = function(input){
    var out = '';
    input = input || '';
    if (input.length > 0){
        out = input.charAt(0).toUpperCase() + input.substring(1);
    }
    return out;
};