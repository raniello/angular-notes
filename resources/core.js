var app = angular.module('notes', []);

app.controller('noteController', ['$scope', '$http', function($scope, $http){
    $scope.notes = [];
    $scope.reminders = [];

    $http.get('/api/notes').then(function(response){
        $scope.notes = response.data;
    });
    $http.get('/api/reminders').then(function(response){
        $scope.reminders = response.data;
    });

    $scope.newNote = "";

    var addNoteToList = function(listName, note) {
        $http.post('/api/'+listName, {text : note})
        .then(
            function(){$scope[listName].push(firstToUpperCase(note));},
            function(err){alert('Error saving "'+note+'" into '+listName);console.log(err);});
    };

    var removeNoteFromList = function(listName, noteIndex){
        $http.delete('/api/'+listName + '/'+ noteIndex)
        .then(
            function(){$scope[listName].splice(noteIndex, 1);},
            function(err){alert('Error deleting index "'+note+'" from '+listName);console.log(err);});
        
    };

    $scope.addNewNote = function(){
        addNoteToList('notes', $scope.newNote);
        $scope.newNote = "";
    }

    $scope.addNote = function(note){
        addNoteToList('notes', note);
    }

    $scope.addNewReminder = function(){
        addNoteToList('reminders', $scope.newNote);
        $scope.newNote = "";
    }

    $scope.addReminder = function(reminder){
        addNoteToList('reminders', reminder);
    }

    $scope.deleteNote = function(noteIndex){
        removeNoteFromList('notes', noteIndex);
    }

    $scope.deleteReminder = function(noteIndex){
        removeNoteFromList('reminders', noteIndex);
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
        controller : ['$scope', '$timeout', function($scope, $timeout){
            $scope.schedule = function(note){
                $timeout(function(){$scope.generate({note:note});}, 3000);
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