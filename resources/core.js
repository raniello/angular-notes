var app = angular.module('notes', ['ngRoute', 'providers']);


app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix(''); // workaround
    $routeProvider
        .when("/", {
            templateUrl : "insert.html",
            controller : 'noteController'
        })
        .when("/insert", {
            templateUrl : "insert.html",
            controller : 'noteController'
        })
        .when("/list", {
            templateUrl : "list.html",
            controller : 'noteController'
        });

}]);

app.controller('noteController', ['$scope', '$log', 'noteProvider',
    function ($scope, $log, noteProvider) {
        $scope.notes = [];
        $scope.reminders = [];
        $scope.newNote = "";

        noteProvider.getNotes(function (response) {
            $scope.notes = response.data;
        });

        noteProvider.getReminders(function (response) {
            $scope.reminders = response.data;
        });

        var addNoteToList = function (listName, note) {
            console.log("Adding "+note)
            var add = listName == 'notes' ? noteProvider.addNote : noteProvider.addReminder
            add(note,
                function () { $scope[listName].push(firstToUpperCase(note)); },
                function (err) { alert('Error saving "' + note + '" into ' + listName); $log.error(err); });
        };

        var removeNoteFromList = function (listName, noteIndex) {
            var remove = listName == 'notes' ? noteProvider.deleteNote : noteProvider.deleteReminder
            remove(noteIndex,
                function () { $scope[listName].splice(noteIndex, 1); },
                function (err) { alert('Error deleting index "' + note + '" from ' + listName); $log.error(err); });

        };

        $scope.addNewNote = function () {
            console.log($scope);
            addNoteToList('notes', $scope.newNote);
            $scope.newNote = "";
        }

        $scope.addNote = function (note) {
            addNoteToList('notes', note);
        }

        $scope.addNewReminder = function () {
            addNoteToList('reminders', $scope.newNote);
            $scope.newNote = "";
        }

        $scope.addReminder = function (reminder) {
            addNoteToList('reminders', reminder);
        }

        $scope.deleteNote = function (noteIndex) {
            removeNoteFromList('notes', noteIndex);
        }

        $scope.deleteReminder = function (noteIndex) {
            removeNoteFromList('reminders', noteIndex);
        }
    }]);

app.filter('firstUppercase', function () {
    return firstToUpperCase;
});

app.directive('preview', function () {
    return {
        restrict: 'E',
        templateUrl: "preview.html"
    };
})
    .directive('noteList', function () {
        return {
            restrict: 'E',
            templateUrl: "noteList.html",
            scope: {
                list: "=",
                label: "@",
                onCheck: "&"
            }
        };
    })
    .directive('autoGenerate', function () {
        return {
            restrict: 'E',
            templateUrl: "autoGenerate.html",
            scope: {
                label: "@",
                note: "@",
                generate: "&"
            },
            controller: ['$scope', '$timeout', function ($scope, $timeout) {
                $scope.schedule = function (note) {
                    $timeout(function () { $scope.generate({ note: note }); }, 3000);
                };
            }]
        };
    })


var firstToUpperCase = function (input) {
    var out = '';
    input = input || '';
    if (input.length > 0) {
        out = input.charAt(0).toUpperCase() + input.substring(1);
    }
    return out;
};