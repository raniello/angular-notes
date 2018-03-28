var app = angular.module('providers', []);


app.service('noteProvider', ['$http', function ($http) {

    this.getNotes = function (onSuccess, onError) {
        $http.get('/api/notes').then(onSuccess, onError);
    }

    this.getReminders = function (onSuccess, onError) {
        $http.get('/api/reminders').then(onSuccess, onError);
    }

    this.addNote = function (note, onSuccess, onError) {
        $http.post('/api/notes', { text: note }).then(onSuccess, onError);
    }

    this.addReminder = function (reminder, onSuccess, onError) {
        $http.post('/api/reminders', { text: reminder }).then(onSuccess, onError);
    }

    this.deleteNote = function (index, onSuccess, onError) {
        $http.delete('/api/notes/' + index).then(onSuccess, onError);
    }

    this.deleteReminder = function (index, onSuccess, onError) {
        $http.delete('/api/reminders/' + index).then(onSuccess, onError);
    }
}]);