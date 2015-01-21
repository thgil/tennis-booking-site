/* jshint ignore:start */

'use strict';

angular.module('tennisBookingSiteApp')
  .controller('EditCoachCtrl', function ( $scope, $modal, $log, Auth, User, Coach, Lesson, $location, Flash, uiGmapGoogleMapApi) {
    
    $scope.flash = Flash;
  
    $scope.coach = User.get(function(coach){
      if(coach.availableTimes) {
        $scope.days = coach.availableTimes;
      }
      // Map stuff  
      uiGmapGoogleMapApi.then(function() {
        $scope.map = {
          center: {
            latitude: coach.loc[0],
            longitude: coach.loc[1]
          },
          zoom: 12,
          options: {
            disableDefaultUI: true,
            panControl: true,
            zoomControl: true,
            scaleControl: true,
            streetViewControl: false,
            overviewMapControl: false,
          },
          infoWindowWithCustomClass: {
            options: {
              disableAutoPan: false,
              boxClass: 'custom-info-window',
              alignBottom: true
            },
          }
        };
        $scope.circle = {
          center: {
            latitude: coach.loc[0],
            longitude: coach.loc[1]
          },
          radius: 2000,
          stroke: {
            color: '#08B21F',
            weight: 2,
            opacity: 1
          },
          fill: {
            color: '#08B21F',
            opacity: 0.5
          },
          geodesic: true, // optional: defaults to false
          draggable: true, // optional: defaults to false
          clickable: true, // optional: defaults to true
          editable: true, // optional: defaults to false
          visible: true // optional: defaults to true
        };    
      });
    });
    /**
     * Auth stuff
     */
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;
    
    $scope.lessons = Lesson.query({id: 'Coach1'});
    
    $scope._days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    $scope._times = ['6am','7am','8am','9am','10am',
                    '11am','12pm','1pm','2pm','3pm',
                    '4pm','5pm','6pm','7pm','8pm','9pm'];
        
    $scope.days = {'Mon':{},'Tue':{},'Wed':{},'Thu':{},'Fri':{},'Sat':{},'Sun':{} };
    
    // User.get(function(user){
    //   
    // });

    $scope.change = function(day,time) {
      if($scope.days[day][time]==='available') {
        $scope.days[day][time]='empty';
      } else {
        $scope.days[day][time]='available';
      }
    };
    
    $scope.changeTime = function(time) {
      for(var day in $scope._days) {
        if($scope.days.Mon[time]==='empty') {
          $scope.days[day][time]='available';
        } else {
          $scope.days[day][time]='empty';
        }
      }
    };

    $scope.changeDay = function(day) {
      for(var time in $scope._times) {
        if($scope.days[day]['6am']==='empty') {
          $scope.days[day][time]='available';
        } else {
          $scope.days[day][time]='empty';
        }
      }
    };
    
    $scope.changeAll = function() {
      var value = ($scope.days['Mon']['6am']==='available')?'empty':'available';
      
      for(var day in $scope._days) {
        for(var time in $scope._times) {
          $scope.days[day][time] = value;
        }
      }
    };
    
    $scope.updateTimetable = function() {
      Auth.changeAvailability($scope.days, function(){
        $scope.message = "Timetable updated!";
      });
    };
    
    $scope.resetTimetable = function() {
      User.get(function(user){
        $scope.days = user.availableTimes;
      });
    };

    $scope.updateAbout = function() {
      Auth.changeAbout($scope.coach.about);
    };
              
  });