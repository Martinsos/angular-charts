'use strict';

(function () {
  var module = angular.module('charts');
  module.directive('testChart', [function () {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'app/charts/test/test-chart.html',
      replace: true,
      link: function (scope, element, attrs) {
        var data = [{x: 10, y: 10},
                    {x: 20, y: 30},
                    {x: 18, y: 44}];

        var container = {
          width: 500,
          height: 200
        };

        var svg = d3.select(element.get(0));
        svg.attr('width', container.width);
        svg.attr('height', container.height);
        svg.append('svg:rect')
          .attr('width', container.width)
          .attr('height', container.height)
          .attr('fill-opacity', 0)
          .attr('stroke-width', '1')
          .attr('stroke', 'black');

        var xAxisScale = d3.scale.linear()
              .domain([d3.min(data, function (d) { return d.x; }),
                       d3.max(data, function (d) { return d.x; })])
              .range([0, container.width]);
        var xAxis = d3.svg.axis().scale(xAxisScale);
        var xAxisGroup = svg.append('g').call(xAxis);
        xAxisGroup.attr('transform', 'translate(0, ' + (container.height - xAxisGroup.node().getBBox().height) + ')');

        svg.selectAll('circle.data-points')
          .data(data)
          .enter()
          .append('svg:circle')
          .attr('cx', function(d) { return xAxisScale(d.x); })
          .attr('cy', function(d) { return d.y; })
          .attr('r', '5px')
          .attr('fill', 'black');
      }
    };
  }]);
})();
