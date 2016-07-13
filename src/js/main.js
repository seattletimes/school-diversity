// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("angular/angular.min");

var app = angular.module("school-diversity", []);

app.controller("diversityController", ["$scope", function($scope) {
  $scope.all = districtData;
  $scope.shown = $scope.all;
  $scope.level = "elementary";

  var changeLevel = function() {
    var level = $scope.level;
    $scope.shown = $scope.all.filter(function(s) {
      var type = s["TYPE"].toLowerCase().split(" ");
      return type.indexOf(level) > -1;
    }).sort(function(a,b) {
      return a["School Name"].toLowerCase() > b["School Name"].toLowerCase() ? 1 : -1;
    });
    $scope.selectedSchool = $scope.shown[0];
    var schools = $scope.shown.slice();
    // schools.filter....
    // $scope.buckets
    // $scope.median
    // $scope.current
  };

  // changeLevel("high");
  $scope.$watch("level", changeLevel);
}]);