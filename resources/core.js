var app = angular.module('notes', []);

app.controller('noteController', ['$scope', function($scope){
    $scope.notes = [];
    $scope.reminders = [];

    $scope.newNote = "";

    var addNoteToList = function(list) {
        list.push(firstToUpperCase($scope.newNote));
        $scope.newNote = "";
    };

    var removeNoteFromList = function(list, noteIndex){
        list.splice(noteIndex, 1);
    };

    $scope.addNote = function(){
        addNoteToList($scope.notes);
    }

    $scope.addReminder = function(){
        addNoteToList($scope.reminders);
    }

    $scope.deleteNote = function(noteIndex){
        removeNoteFromList($scope.notes, noteIndex);
    }

    $scope.deleteReminder = function(noteIndex){
        removeNoteFromList($scope.reminders, noteIndex);
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
        templateUrl : "noteList.html",
        scope : {
            list : "=",
            label : "@",
            onCheck : "&"
        }
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