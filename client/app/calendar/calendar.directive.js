/* jshint ignore:start */

'use strict';

angular.module('tennisBookingSiteApp')
  .directive('d3Bars', ['d3', function(d3) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        data: '='
      },
      link: function(scope, element) {
        
        console.log(element);
        
        
        var margin = { top: 50, right: 25, bottom: 25, left: 25 },
        width = 260 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom,
        gridSize = Math.floor(height / times.length),
        legendElementWidth = gridSize,
        buckets = 9,
        colors = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'], // alternatively colorbrewer.YlGnBu[9]
        days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        times = ['4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12a', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p'];
                
        var svg = d3.select(element[0]).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            

        // on window resize, re-render d3 canvas
        window.onresize = function() {
          return scope.$apply();
        };
        scope.$watch(function(){
            return angular.element(window)[0].innerWidth;
          }, function(){
            return scope.render(scope.data);
          }
        );

        // watch for data changes and re-render
        scope.$watch('data', function(newVals) {
          return scope.render(newVals);
        }, true);

        // define render function
        scope.render = function(data){

          var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);

          var dayLabels = svg.selectAll('.dayLabel')
              .data(days)
              .enter().append('text')
                .text(function (d) { return d; })
                .attr('x', function (d, i) { return i * gridSize; })
                .attr('y', 0)
                .style('text-anchor', 'end')
                .attr('transform', 'translate(' + gridSize / 2 + ', -8)')
                .attr('class', function (d, i) { return ((i >= 0 && i <= 4) ? 'dayLabel mono axis axis-workweek' : 'dayLabel mono axis'); });

          var timeLabels = svg.selectAll('.timeLabel')
              .data(times)
              .enter().append('text')
                .text(function(d) { return d; })
                .attr('x', 0)
                .attr('y', function(d, i) { return i * gridSize; })
                .style('text-anchor', 'middle')
                .attr('transform', 'translate(-15,' + gridSize / 1.5 + ')')
                .attr('class', function(d, i) { return ((i >= 7 && i <= 16) ? 'timeLabel mono axis axis-worktime' : 'timeLabel mono axis'); });
          
          var heatMap = svg.selectAll('.hour')
              .data(data)
              .enter().append('rect')
              .attr('x', function(d) { return (d.day - 1) * gridSize; })
              .attr('y', function(d) { return (d.hour - 1 - 3) * gridSize; })
              .attr('rx', 4)
              .attr('ry', 4)
              .attr('class', 'hour bordered')
              .attr('width', gridSize)
              .attr('height', gridSize)
              .on('mouseover', function(d){
                d3.select(this).style('fill', 'red');
              })
              .on('mouseout', function(d){
                d3.select(this).style('fill', function(d) { return colorScale(d.value); });
              })
              .on('mousedown', function(d){
                d.value = 0;
                d3.select(this).style('fill', function(d) { return colorScale(d.value); });
              })
              .style('fill', colors[0]);
          
          heatMap.transition().duration(1000)
              .style('fill', function(d) { return colorScale(d.value); });
          
          heatMap.append('title').text(function(d) { return d.value; });
              
          var legend = svg.selectAll('.legend')
              .data([0].concat(colorScale.quantiles()), function(d) { return d; })
              .enter().append('g')
              .attr('class', 'legend');

          legend.append('rect')
            .attr('x', function(d, i) { return legendElementWidth * i; })
            .attr('y', height)
            .attr('width', legendElementWidth)
            .attr('height', gridSize / 2)
            .style('fill', function(d, i) { return colors[i]; });

          legend.append('text')
            .attr('class', 'mono')
            .text(function(d) { return '≥ ' + Math.round(d); })
            .attr('x', function(d, i) { return legendElementWidth * i; })
            .attr('y', height + gridSize);
        };
      }
    };
  }]);