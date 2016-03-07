angular.module("Remember2Shop", [])
    .controller("MasterCtrl", function($scope,MyService) {
        $scope.dataArray = MyService.getItems();
        $scope.item = {};


        $scope.onSave = function() {

            MyService.addItem($scope.item);
            $scope.item = {};
            console.log($scope.dataArray);
        }
})
.service("MyService", function() {
    var itemArray = [];
    this.getItems = function() {
        return itemArray;
    }
    this.addItem = function(pItem) {
        itemArray.push(pItem);
    }

});
