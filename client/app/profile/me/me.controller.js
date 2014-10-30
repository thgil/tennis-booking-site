'use strict';

angular.module('tennisBookingSiteApp')
  .controller('MeCtrl', function ( $scope, $modal, $log, Auth, User, Coach, Lesson, $location) {
  
    $scope.coach = User.get();
    /**
     * Auth stuff
     */
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;
    
    $scope.lessons = Lesson.query({id: "Coach1"});
    
    /**
     * Form stuff
     */
    $scope.lesson = { coach:"Coach1",
                      student:$scope.getCurrentUser().email,
                      for:"myself",
                      count:1,
                      age:"18-30",
                      exp:"beginner",
                      startTime:null,
                      endTime:null
                    };
    $scope.errors = {};
    
    $scope.book = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        console.log($scope.lesson);
        
        Auth.createLesson($scope.lesson)
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};
        
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
        
      }
    }
     
    var roundedDate = function(h) {
      var date = new Date();

      date.setHours( date.getHours() + Math.round(date.getMinutes()/60) + (h||0));
      date.setMinutes(0);
      date.setSeconds(0);

      return date;
    };
     
    $scope.lesson.startTime = roundedDate();
    $scope.lesson.endTime = roundedDate(1);
    
    $scope.hstep = 1;
    $scope.mstep = 30;
    
    /**
     * Timetable stuff
     */
    $scope.days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    $scope.times = ['6am','7am','8am','9am','10am',
                    '11am','12pm','1pm','2pm','3pm',
                    '4pm','5pm','6pm','7pm','8pm','9pm'];
        
    $scope.available = 'available';
    $scope.booked = 'booked';
    $scope.empty = 'empty';
                
    $scope.available = 'available';
              
  });