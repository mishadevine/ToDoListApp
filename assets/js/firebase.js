angular.module("Remember2Shop", ["firebase"]);
  .controller("MasterCtrl", function($scope,$firebaseAuth) {
    var ref = new Firebase("https://remember2shop.firebaseio.com/");
    $scope.authObj = $firebaseAuth(ref);

    $scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
      console.log("Logged in as:", authData.uid);
    }).catch(function(error) {
      console.log("Authentication failed:", error);
    });
  });
  // .controller("DatabaseCtrl", function($scope,$firebase) {
  //   var ref = new Firebase('https://remember2shop.firebaseio.com/');
  //   var usersRef = ref.child("users");
  //   usersRef.set({
  //     userone: {
  //       firstname: "Misha",
  //       lastname: "Devine"
  //       email: "mishadevine@hotmail.com",
  //       password: "AuNtBaY66"
  //     }
  //   });
  // });
  // .controller("DatabaseCtrl", function($scope,$firebaseObject) {
  //   var ref = new Firebase('https://remember2shop.firebaseio.com/');
  //   var obj = $firebaseObject(ref);
  //   obj.$loaded().then(function() {
  //     console.log("loaded record:", obj.$id, obj.firstname);
  //
  //     angular.forEach(obj, function("Misha",firstname) {
  //       console.log(key, value);
  //     });
  //   });
  //   $scope.data = obj;
  //
  //   obj.$bindTo($scope, "data");
  // });
  .controller("DatabaseCtrl", function($scope,$firebaseArray) {
    var ref = new Firebase("https:remember2shop.firebaseio.com/");
    var list = $firebaseArray(ref);
    list.$add({firstname: "Misha", lastname: "Devine", email: "mishadevine@hotmail.com", password: "AuNtBaY66"}).then(function(ref) {
      var id = ref.key();
      console.log("added record with id" + id);
      list.$indexFor(id);
    })
  });
