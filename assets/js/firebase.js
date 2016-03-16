angular.module("Remember2Shop",["firebase","ngRoute"])
  .config(function($routeProvider) {
    $routeProvider.when("/", {
      templateUrl: "parts/home.html",
      controller: "MasterCtrl"
    })
    .when("/list", {
      templateUrl: "parts/list.html",
      controller: "MasterCtrl"
    })
    .otherwise("/");
  })
  .controller("MasterCtrl", function($scope,$firebaseAuth,$firebaseObject,$firebaseArray,$location) {
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
          $location.path('/list');

        //Adding new user to database
          var usersRef = new Firebase("https://remember2shop.firebaseio.com/users/" + authData.uid);
          var obj = $firebaseObject(usersRef);
          obj.userInformation = { firstname: $scope.firstname, lastname: $scope.lastname, email: $scope.email, password: $scope.password };
          obj.$save().then(function(usersRef) {
          ref.key() === obj.$id;
          console.log("added record with id " + id);
          obj.$indexFor(id); // returns location in the array
          });
        }).catch(function(error) {
          console.error("Error: ", error);
        });
    }

    // Adding an item to database
    $scope.authObj.$onAuth(function(authData,userData) {
    if (authData) {
      $scope.addItem = function() {
        var rootRef = new Firebase("https://remember2shop.firebaseio.com/users/" + authData.uid + "/items");
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
        $location.path('/list');
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
        $location.path('/list');;
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    }

  });
