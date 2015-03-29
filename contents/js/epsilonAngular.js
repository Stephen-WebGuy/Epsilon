/// <reference path="bootstrap.min.js" />
/// <reference path="jquery-ui.min.js" />
/// <reference path="angular-dragdrop.min.js" />
/// <reference path="angular.min.js" />
/// <reference path="jquery-2.1.3.min.js" />
var app = angular.module('epsilon', ['ngDragDrop']);

app.run(function ($rootScope) {
    // Add / Change the root for shared objects;
    $rootScope.rootimages = [{}, {}, {}];
});

app.controller("main", function ($scope, $rootScope) {
    
});

app.controller("content", function ($scope, $rootScope) {

});

app.controller("staticImages", function ($scope, $rootScope) {
    $scope.images = createImageFromRoot($rootScope.rootimages);
    
});

app.controller("dragableImages", function ($scope, $rootScope) {
    $scope.images = createImageFromRoot($rootScope.rootimages);
    $scope.img_1 = $scope.images[0];
    $scope.img_2 = $scope.images[1];
    $scope.img_3 = $scope.images[2];
    $scope.tempLocation = {};
    $scope.onDrop = function (data) {
        var itemDroped = $scope.tempLocation;

    };
});


function createImageFromRoot(rootImages) {
    var images = [];
    for (var i = 0; i < 3; i++) {
        var image = {};
        image.isImage = true;
        image.scr = rootImages[i].scr;
        image.index = i;
        image.startLocation = i + 1;
        image.currentLocation = image.startLocation;
        image.history = [];
        image.history.push(createImageMovement(-1, 1));
        images.push(image);
    }
    return images;
}

function createImageMovement(from,to) {
    var item = {};
    item.from = from;
    item.to = to;
    return item
}