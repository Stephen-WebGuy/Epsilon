/// <reference path="bootstrap.min.js" />
/// <reference path="jquery-ui.min.js" />
/// <reference path="angular-dragdrop.min.js" />
/// <reference path="angular.min.js" />
/// <reference path="jquery-2.1.3.min.js" />
/// <reference path="epsilon.js" />

var app = angular.module('results', []);
var theSession;

app.run(function ($rootScope) {
    session.Load();
});

app.controller("mainController", function ($scope, $rootScope) {
    theSession = session.Session;
    theSession.levels

    $scope.session = theSession;
});

