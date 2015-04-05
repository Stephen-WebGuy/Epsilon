/// <reference path="bootstrap.min.js" />
/// <reference path="jquery-ui.min.js" />
/// <reference path="angular-dragdrop.min.js" />
/// <reference path="angular.min.js" />
/// <reference path="jquery-2.1.3.min.js" />

// This is where angular functions and dependent functions should go unless common.


var app = angular.module('epsilon', ['ngDragDrop']);

app.run(function ($rootScope) {
    // Add / Change the root for shared objects;

    // This is where image locations and id are located and will be coppeid for use in controllers 
    $rootScope.rootimages = [
        { ID: 1, src: "contents/images/image1.jpg" },
        { ID: 2, src: "contents/images/image2.jpg" },
        { ID: 3, src: "contents/images/image3.jpg" }
    ];
});

app.controller("main", function ($scope, $rootScope) {

});

app.controller("content", function ($scope, $rootScope) {

});

app.controller("staticImages", function ($scope, $rootScope) {
    // This is the controler to control the Static Images
    $scope.images = createImageFromRoot($rootScope.rootimages);
    $scope.upDateImageOrder = function () {
        var order = [];
        for (var i = 0; i < $scope.images.length; i++) {
            order.push($scope.images[i].ID);
        }
        SetImageOrder(order);
    }
    $scope.upDateImageOrder();
});
app.controller("dragableImages", function ($scope, $rootScope, $filter) {
    // This is the controller to control the dragable images
    // This is where the images are heald. Duplicated from root images.
    $scope.images = shuffle(createImageFromRoot($rootScope.rootimages));
    // push another object that is empty for the blank space
    $scope.images.push({});
    // On drop event.
    // Finds the droped image and the target location and logs those details.
    $scope.onDrop = function (event, data) {
        var itemDroped = data.draggable[0];
        // get the index of the image that was droped
        var index = $(itemDroped).attr("data-index");
        if (!index == "" || !index) {
            // turn index into number
            index = Number(index);
            // set "itemDroped" to actual object in array
            itemDroped = $scope.images[index];

            // get from location which is the current location
            var From = itemDroped.currentLocation;
            // get the new location from the target. add one because is index and locations start from 1 to n
            var To = Number($(event.target).attr("data-index")) + 1;

            // create history object and add to images history array
            itemDroped.history.push(createImageMovement(From, To));
            // update the current location to new location
            itemDroped.currentLocation = To;

            // disable the new location for dropable
            $(event.target).droppable("disable");
            // enable the old dropable location as it is now a vacant spot 
            $(data.draggable[0]).parent().droppable("enable");

            // Check of success every drop end
            $scope.CheckImageOrder();
        }

    };

    $scope.CheckImageOrder = function () {
        // Makes an array of ids in the images order
        var order = []
        for (var i = 0; i < ($scope.images.length - 1) ; i++) {
            // This finds the image in the position of (i+1) in the image array
            var image = $filter('filter')($scope.images, { currentLocation: (i + 1) }, true)[0];
            var ID = image ? image.ID : -1;
            order.push(ID);
        }
        // Check for success by giving this order to check
        CheckForSuccess(order);
    }

});


var ImageOrder;
function SetImageOrder(order) {
    // At the start of the game, set the image order in a array containing the ID's in order of position
    ImageOrder = order;
}

function CheckForSuccess(order) {
    // To check give this function an array containing the order of the curent ID's in there positions
    // check this order to the order of images that are static
    if (order.isEqualTo(ImageOrder)) {
        var Done = function () {
            alert("Done");
        }
        // Put done in a time out because other wise affects the ui animations.
        setTimeout(Done, 0);        
    }
}

function createImageFromRoot(rootImages) {
    // This function coppies config from root images to new local instances of an image.
    // Also add other parameters to this local image.
    var images = [];
    for (var i = 0; i < 3; i++) {
        var image = {};
        image.isImage = true;
        image.ID = rootImages[i].ID
        image.src = rootImages[i].src;
        image.index = i;
        image.startLocation = i + 1;
        image.currentLocation = image.startLocation;
        image.history = [];
        images.push(image);
    }
    return images;
}

function createImageMovement(from, to) {
    // this function creates a hitory object
    var item = {};
    item.from = "Location " + from;
    item.to = "Location " + to;
    return item
}

//shuffle elements in an array
function shuffle(thisArray) {
    var array = thisArray.clone();
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    // Shuffle again if the same
    if (thisArray.isEqualTo(array))
        return shuffle(thisArray);
    for (var i = 0; i < array.length; i++) {
        array[i].index = i;
        array[i].startLocation = i + 1;
        array[i].currentLocation = array[i].startLocation;
    }
    return array;
}

//compare if two arrays are equal
Array.prototype.isEqualTo = function (arrayB) {
    var arrayA = this;
    if (arrayA.length != arrayB.length) { return false; }
    else {
        for (i = 0; i < arrayA.length; i++) {
            if (arrayB[i] != arrayA[i]) {
                return false;
            }
        }
        return true;
    }
}

//clone an array
Array.prototype.clone = function () {
    return this.slice(0);
};
