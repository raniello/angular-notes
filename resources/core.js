var app = angular.module('notes', []);

app.controller('noteController', ['$scope', function($scope){
    $scope.notes = [];
    $scope.reminders = [];

    $scope.newNote = "";

    var addNoteToList = function(list, note) {
        list.push(firstToUpperCase(note));
        $scope.newNote = "";
    };

    var removeNoteFromList = function(list, noteIndex){
        list.splice(noteIndex, 1);
    };

    $scope.testGenerate = function(){
        console.log("test generate");
    }

    $scope.addNewNote = function(){
        addNoteToList($scope.notes, $scope.newNote);
        $scope.newNote = "";
    }

    $scope.addNote = function(note){
        addNoteToList($scope.notes, note);
    }

    $scope.addNewReminder = function(){
        addNoteToList($scope.reminders, $scope.newNote);
        $scope.newNote = "";
    }

    $scope.addReminder = function(reminder){
        addNoteToList($scope.reminders, reminder);
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
.directive('autoGenerate', function(){
    return {
        restrict: 'E',
        templateUrl : "autoGenerate.html",
        scope : {
            label : "@",
            note : "@",
            generate : "&"
        },
        controller : ['$scope', function($scope){
            $scope.schedule = function(note){
                setTimeout(function(){$scope.generate({note:note});}, 3000);
            };
        }]
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