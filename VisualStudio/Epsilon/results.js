/// <reference path="bootstrap.min.js" />
/// <reference path="jquery-ui.min.js" />
/// <reference path="angular-dragdrop.min.js" />
/// <reference path="angular.min.js" />
/// <reference path="jquery-2.1.3.min.js" />
/// <reference path="epsilon.js" />

$(document).ready(function () {
    
});

var app = angular.module('results', []);

app.run(function ($rootScope) {
    //load json file here and put it to rootscope
    session.load();
});

app.controller("mainController", function ($scope, $rootScope) {
    $scope.theTest = session.Child.ID;
});

