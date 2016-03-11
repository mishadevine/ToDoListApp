angular.module("Remember2Shop")
.controller("ListController", function($scope,$firebaseArray,$firebaseAuth){
    //Connect to Firebase
    var ref = new Firebase("https://remember2shop.firebaseio.com/");
    $scope.authObj = $firebaseAuth(ref);
    var items;

    
    $scope.authObj.$onAuth(function(authData) {
    if (authData) {
      var listRef = new Firebase("https://remember2shop.firebaseio.com/users/" + authData.uid + "/items");
      items = $firebaseArray(listRef);
      $scope.items = items;
      console.log("LIST ONE", $scope.items);
      } else {
      console.log("Logged out");
      }
    });

    $scope.items = items;
    console.log("LIST ONE", $scope.items);

    //Add to database
    $scope.addItem = function() {
      $scope.items.$add($scope.newItem).then(function(ref) {
        $scope.newItem = {};
        console.log("added item with id " + id);
      });
    }

    //Remove from database
    $scope.removeItem = function(item) {
      $scope.items.$remove(item).then(function(ref) {
        console.log("remove item with id ");
      });
    }
})
