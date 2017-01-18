var app = angular.module("GiphyApp", []);
app.controller("GiphyCtrl", ["$scope", "$http", function($scope, $http) {
  $scope.searchTerm = "";
  $scope.results = undefined;

  $scope.$watch("searchTerm", function(newVal, oldVal) {
    console.log("search term:", newVal, oldVal, $scope.searchTerm);
    $scope.search();
  });

  $scope.search = function() {
    var req = {
      url: "http://api.giphy.com/v1/gifs/search",
      method: "GET",
      params: {
        q: $scope.searchTerm,
        api_key: "dc6zaTOxFJmzC"
      }
    }

    $http(req).then(function success(res) {
      console.log("HTTP success:", res);
      $scope.results = res.data.data;
    }, function failure(res) {
      console.log("HTTP failed:", res);
    });
  }
}]);
