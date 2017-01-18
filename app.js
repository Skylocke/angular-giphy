var app = angular.module("GiphyApp", []);
app.controller("GiphyCtrl", ["$scope", "$http", "$timeout", function($scope, $http, $timeout) {
  $scope.searchTerm = "";
  $scope.results = undefined;

  var delayedSearch;
  var lastKeyPressTime;
  var searchRequestTime;
  $scope.$watch("searchTerm", function(newVal, oldVal) {
    console.log("search term:", newVal, oldVal, $scope.searchTerm);
    lastKeyPressTime = new Date();
    $timeout.cancel(delayedSearch);
    delayedSearch = $timeout(function() {
      $scope.search();
      console.log(lastKeyPressTime);
    }, 500);
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
    }).then(function() {
      searchRequestTime = new Date();
      console.log(searchRequestTime);
      console.log((searchRequestTime-lastKeyPressTime) + " ms");
    });
  }
}]);
