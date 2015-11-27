'use strict';

var app = angular.module('chartApp', []);

app.controller('SalesController', ['$scope', function ($scope) {

    $scope.a = 50;
    $scope.b = 30;
    $scope.c = 20;
    $scope.ab = 10;
    $scope.bc = 10;
    $scope.ac = 10;
    $scope.abc = 5;


    function updateSalesData(){
        $scope.salesData =
        [
            {sets:"A", size: $scope.a},
            {sets:"B", size: $scope.b},
            {sets:"C", size: $scope.c},
            {sets:"A,B", size: $scope.ab},
            {sets:"B,C", size: $scope.bc},
            {sets:"A,C", size: $scope.ac},
            {sets:"A,B,C", size: $scope.abc}
        ];
    }

    var getSetIntersections = function() {
        return $scope.salesData.map(
            function (element) {
                return { sets: element.sets.split(","),
                    size: parseInt(element.size)};
            });
    };

    var chart = venn.VennDiagram()
        .width(500)
        .height(500);

    var div = d3.select("#venn");
    updateSalesData();
    div.datum(getSetIntersections()).call(chart);

    d3.selectAll("input").on("change", function () {
        updateSalesData();
        console.log("changed:", getSetIntersections());
        div.datum(getSetIntersections()).call(chart);
    });

    var tooltip = d3.select("body").append("div")
        .attr("class", "venntooltip");

    div.selectAll("path")
        .style("stroke-opacity", 0)
        .style("stroke", "#fff")
        .style("stroke-width", 0);

    div.selectAll("g")
        .on("mouseover", function (d) {
            // sort all the areas relative to the current item
            venn.sortAreas(div, d);

            // Display a tooltip with the current size
            tooltip.transition().duration(400).style("opacity", .9);
            tooltip.text(d.size + " users");

            // highlight the current path
            var selection = d3.select(this).transition("tooltip").duration(400);
            selection.select("path")
                .style("stroke-width", 3)
                .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
                .style("stroke-opacity", 1);
        })

        .on("mousemove", function () {
            tooltip.style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })

        .on("mouseout", function (d) {
            tooltip.transition().duration(400).style("opacity", 0);
            var selection = d3.select(this).transition("tooltip").duration(400);
            selection.select("path")
                .style("stroke-width", 0)
                .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
                .style("stroke-opacity", 0);
        });

}]);

























