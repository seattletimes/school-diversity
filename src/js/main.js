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

  $scope.districts = { "all": ["All"], "elementary": ["All"], "middle": ["All"], "high": ["All"], "other": ["All"] };

  $scope.all.forEach(function(s) {
    var type = s["TYPE"].toLowerCase().split(" ");
    
    if ($scope.districts.all.indexOf(s["District Name"]) < 0) {
      $scope.districts.all.push(s["District Name"]);
    }
    if ($scope.districts.elementary.indexOf(s["District Name"]) < 0 && type.indexOf("elementary") > -1) {
      $scope.districts.elementary.push(s["District Name"]);
    }
    if ($scope.districts.middle.indexOf(s["District Name"]) < 0 && type.indexOf("middle") > -1) {
      $scope.districts.middle.push(s["District Name"]);
    }
    if ($scope.districts.high.indexOf(s["District Name"]) < 0 && type.indexOf("high") > -1) {
      $scope.districts.high.push(s["District Name"]);
    }
    if ($scope.districts.other.indexOf(s["District Name"]) < 0 && type.indexOf("other") > -1) {
      $scope.districts.other.push(s["District Name"]);
    }
  })
  for (var d in $scope.districts) {
    $scope.districts[d].sort();
  }
  $scope.level = "high";
  $scope.selectedDistrict = "Seattle Public Schools";

  var changeLevel = function() {
    var level = $scope.level;

    if ($scope.districts[level].indexOf($scope.selectedDistrict) < 0) {
      $scope.selectedDistrict = $scope.districts[level][0];
    }

    $scope.districtsShown = $scope.districts[level];

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