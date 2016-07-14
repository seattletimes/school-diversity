// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("angular/angular.min");

var app = angular.module("school-diversity", []);

var getColor = function(d) {
  return d < 0.2 ? "#edf8fb" :
  d < 0.4 ? "#b3cde3" :
  d < 0.6 ? "#8c96c6" :
  d < 0.8 ? "#8856a7" :
            "#810f7c" ;
};

app.controller("diversityController", ["$scope", function($scope) {
  $scope.all = districtData;
  $scope.districts = ["All"];
  $scope.all.forEach(function(s) {
    if ($scope.districts.indexOf(s["District Name"]) < 0) $scope.districts.push(s["District Name"])
  })
  $scope.districts.sort();
  $scope.level = "high";
  $scope.selectedDistrict = "Seattle Public Schools";

  var changeLevel = function() {
    var level = $scope.level;

    $scope.shown = $scope.all.filter(function(s) {
      var type = s["TYPE"].toLowerCase().split(" ");

      if ($scope.selectedDistrict == "All" && level == "all") {
        return true;
      } else if ($scope.selectedDistrict == "All" && level !== "all") {
        return type.indexOf(level) > -1;
      } else if ($scope.selectedDistrict !== "All" && level == "all") {
        return s["District Name"] == $scope.selectedDistrict;
      } else {
        return type.indexOf(level) > -1 && s["District Name"] == $scope.selectedDistrict;
      }
    }).sort(function(a,b) {
      return a["School Name"].toLowerCase() > b["School Name"].toLowerCase() ? 1 : -1;
    });
  
    $scope.selectedSchool = $scope.shown[0];

    var schools = $scope.shown.slice();
    var indices = schools.map(function(s) { return s["INDEX"] }).sort();
    $scope.median = indices[Math.floor(indices.length / 2)];

  };

  $scope.$watchGroup(["level", "selectedDistrict"], changeLevel);
}]);