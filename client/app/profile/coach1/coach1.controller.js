'use strict';

angular.module('tennisBookingSiteApp')
  .controller('Coach1Ctrl', function ($stateParams, $scope, $modal, $log, Auth, Coach, Lesson, $location, uiGmapGoogleMapApi) {
      
    // Map stuff
    $scope.map = {
      center: {
        latitude: 44.41748017333282,
        longitude: 26.106005249023376
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
      
    // Get coach info
    $scope.coach = Coach.get({
       url: $stateParams.coachId 
    }, function(coach) {
      $scope.days = coach.availableTimes;
    });

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
    $scope._days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    $scope._times = ['6am','7am','8am','9am','10am',
                    '11am','12pm','1pm','2pm','3pm',
                    '4pm','5pm','6pm','7pm','8pm','9pm'];
        
    $scope.available = 'available';
    $scope.booked = 'booked';
    $scope.empty = 'empty';
                
    $scope.availability = 'available';
    
    $scope.days = {'Mon':{},'Tue':{},'Wed':{},'Thu':{},'Fri':{},'Sat':{},'Sun':{}};
    
    
    /**
     * Modal things
     */
    $scope.model = {selectedTime: 'hi'};
      
    $scope.log = function() {
      console.log($scope.model.selectedTime);
    };
                  
    // $scope.lessons = [{day:'Mon'}];
    
    $scope.items = ['item1', 'item2', 'item3'];
    
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          },
          selectedTime: function () {
            return $scope.model.selectedTime;
          },
          selectedDay: function () {
            return $scope.model.selectedDay;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
              
  });
  
angular.module('tennisBookingSiteApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, selectedTime, selectedDay) {

  $scope.items = items;
  $scope.selectedTime = selectedTime;
  $scope.selectedDay = selectedDay;
  
  console.log(items+' '+selectedTime+' '+selectedDay);
  
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});