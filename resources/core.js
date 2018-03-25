var app = angular.module('notes', []);

app.controller('noteController', ['$scope', function($scope){
    $scope.newNote = "";
}]);

app.filter('firstUppercase', function(){
    return function(input){
        var out = '';
        input = input || '';
        if (input.length > 0){
            out = input.charAt(0).toUpperCase() + input.substring(1);
        }
        return out;
    }
});