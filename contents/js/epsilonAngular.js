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
    $scope.lastDroped = null;
    $scope.onStart = function (item, data) {

    };
    $scope.onDrop = function (event, data) {
        var itemDroped = data.draggable[0];
        var index = $(itemDroped).attr("data-index");
        if (!index == "" || !index) {
            index = Number(index);
            itemDroped = $scope.images[index];
            var From = itemDroped.currentLocation;
            var To = $(event.target).attr("ng-model");
            if (To == "img_1") To = "Location 1"
            else if (To == "img_2") To = "Location 2"
            else if (To == "img_3") To = "Location 3"
            else if (To == "tempLocation") To = "Temp Location"
            itemDroped.history.push(createImageMovement(From, To));
            itemDroped.currentLocation = To;

            $(event.target).droppable("disable");
            $(data.draggable[0]).parent().parent().droppable("enable");
        }       
        
    };
});


function createImageFromRoot(rootImages) {
    var images = [];
    for (var i = 0; i < 3; i++) {
        var image = {};
        image.isImage = true;
        image.scr = rootImages[i].scr;
        image.index = i;
        image.startLocation = "Location " + (i + 1);
        image.currentLocation = image.startLocation;
        image.history = [];
        image.history.push(createImageMovement("", image.currentLocation));
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