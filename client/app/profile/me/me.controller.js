/* jshint ignore:start */

'use strict';

angular.module('tennisBookingSiteApp')
  .controller('MesCtrl', function ( $scope, $modal, $log, Auth, User, Coach, Lesson, $location, Flash) {
  
    console.log(Auth.getCurrentUser());
  
    $scope.flash = Flash;
  
    $scope.coach = User.get();
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
    
    User.get(function(user){
      if(user.availableTimes) {
          $scope.days = user.availableTimes;
      }
    });

    $scope.change = function(day,time) {
      if($scope.days[day][time]==='available') {
        $scope.days = {day:{time:'empty'}};
      } else {
        $scope.days[day][time]='available';
      }
    };
    
    $scope.changeTime = function(time) {
      // var day;
      // if($scope.days.Mon[time]==='empty') {
      //   for(day of $scope._days) {
      //     $scope.days[day][time]='available';
      //   }
      // } else {
      //   for(day of $scope._days) {
      //     $scope.days[day][time]='empty';
      //   }
      // }
    };

    $scope.changeDay = function(day) {
      // var time;
      // if($scope.days[day]['6am']==='empty') {
      //   for(time of $scope._times) {
      //     $scope.days[day][time]='available';
      //   }
      // } else {
      //   for(time of $scope._times) {
      //     $scope.days[day][time]='empty';
      //   }
      // }
    };
    
    $scope.changeAll = function() {
      // var value = ($scope.days['Mon']['6am']==='available')?'empty':'available';
      // 
      // for(var day of $scope._days) {
      //   for(var time of $scope._times) {
      //     $scope.days[day][time] = value;
      //   }
      // }
    };
    
    $scope.updateTimetable = function() {
      Auth.changeAvailability($scope.days);
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