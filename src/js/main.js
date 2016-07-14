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
  $scope.all = districtData.filter(function(s) {
    return s["TOTAL"] > 25;
  });
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
      return type.indexOf(level) > -1;
    }).sort(function(a,b) {
      return a["School Name"].toLowerCase() > b["School Name"].toLowerCase() ? 1 : -1;
    });

    $scope.selectedSchool = $scope.shown[0];

    var schools = $scope.shown.slice();
    var indices = schools.map(function(s) { return s["INDEX"] }).sort();
    $scope.median = indices[Math.floor(indices.length / 2)];

    // $scope.buckets = [];
    // var buckets = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    // schools.forEach(function(s) {
    //   // s["INDEX"] < 5 ? buckets[1] += 1 :
    //   // s["INDEX"] < 10 ? buckets[1] += 1 :
    //   // s["INDEX"] < 15 ? buckets[3] += 1 :
    //   s["INDEX"] < 20 ? buckets[1] += 1 :
    //   // s["INDEX"] < 25 ? buckets[5] += 1 :
    //   // s["INDEX"] < 30 ? buckets[3] += 1 :
    //   // s["INDEX"] < 35 ? buckets[7] += 1 :
    //   s["INDEX"] < 40 ? buckets[2] += 1 :
    //   // s["INDEX"] < 45 ? buckets[9] += 1 :
    //   // s["INDEX"] < 50 ? buckets[5] += 1 :
    //   // s["INDEX"] < 55 ? buckets[2] += 1 :
    //   s["INDEX"] < 60 ? buckets[3] += 1 :
    //   // s["INDEX"] < 65 ? buckets[4] += 1 :
    //   // s["INDEX"] < 70 ? buckets[7] += 1 :
    //   // s["INDEX"] < 75 ? buckets[6] += 1 :
    //   s["INDEX"] < 80 ? buckets[4] += 1 :
    //   // s["INDEX"] < 85 ? buckets[8] += 1 :
    //   // s["INDEX"] < 90 ? buckets[9] += 1 :
    //   // s["INDEX"] < 95 ? buckets[9] += 1 :
    //                     buckets[5] += 1 ;
    // });
    // var max = 0;
    // for (var b in buckets) {
    //   if (buckets[b] > max) max = buckets[b];
    // }
    // for (var b in buckets) {
    //   $scope.buckets.push({"color": getColor(buckets[b] / max)});
    // }

  };

  $scope.$watch("level", changeLevel);
}]);