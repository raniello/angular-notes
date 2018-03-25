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

var firstToUpperCase = function(input){
    var out = '';
    input = input || '';
    if (input.length > 0){
        out = input.charAt(0).toUpperCase() + input.substring(1);
    }
    return out;
};