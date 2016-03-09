angular.module("Remember2Shop",["firebase"])
  .controller("MasterCtrl", function($scope,$firebaseAuth,$firebaseArray,$window) {
    var ref = new Firebase("https://remember2shop.firebaseio.com/");
    $scope.authObj = $firebaseAuth(ref);


    // Creating a user
    $scope.createUser = function() {
      $scope.authObj.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        console.log("User " + userData.uid + " created successfully!");
        return $scope.authObj.$authWithPassword({
          email: $scope.email,
          password: $scope.password
        });
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
        $window.location.href="../list.html";
      }).catch(function(error) {
        console.error("Error: ", error);
      });

      //Adding to database
      var usersRef = new Firebase("https://remember2shop.firebaseio.com/users/" + $scope.firstname + " " + $scope.lastname);
      var users = $firebaseArray(usersRef);
      users.$add({ firstname: $scope.firstname, lastname: $scope.lastname, email: $scope.email, password: $scope.password }).then(function(ref) {
      var id = ref.key();
      console.log("added record with id " + id);
      users.$indexFor(id); // returns location in the array
      });
    }

    $scope.authObj.$onAuth(function(authData) {
    if (authData) {
      $scope.addItem = function() {
        var rootRef = new Firebase("https://remember2shop.firebaseio.com/users/" + authData.uid +  "/items");
        var items = $firebaseArray(rootRef);
        items.$add({ itemName: $scope.item }).then(function(ref) {
        var id = ref.key();
        console.log("added item with id " + id);
        items.$indexFor(id); // returns location in the array
        });
      }
      console.log("Logged in as:", authData.uid);
      } else {
      console.log("Logged out");
      }
    });

    // Logging in through Facebook
    $scope.fbLogin = function() {
      $scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
        console.log("Logged in as:", authData.uid);
        $window.location.href="../list.html";
      }).catch(function(error) {
        console.log("Authentication failed:", error);
      });
    }

    // Logging in with email and password
    $scope.login = function() {
      $scope.authObj.$authWithPassword({
        email: $scope.login.email,
        password: $scope.login.password
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
        $window.location.href="../list.html";
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    }





    // Adding item to the database
    // $scope.addItem = function() {
    //   var rootRef = new Firebase("https://remember2shop.firebaseio.com/users/" + $scope.firstname + "/items");
    //   var items = $firebaseArray(rootRef);
    //   items.$add({ itemName: $scope.item }).then(function(ref) {
    //   var id = ref.key();
    //   console.log("added record with id " + id);
    //   items.$indexFor(id); // returns location in the array
    //   });
    // }




  });
