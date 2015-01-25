/* jshint ignore:start */

'use strict';

angular.module('tennisBookingSiteApp')
  .controller('CoachCtrl', function ($stateParams, $scope, $modal, $log, Auth, User, Coach, Lesson, $location, uiGmapGoogleMapApi) {

    /**
     * Auth stuff
     */
    $scope.user = Auth.getCurrentUser();
    $scope.isLoggedIn = Auth.isLoggedIn;

    console.log($scope.user);

    /**
     * Timetable stuff
     */
    $scope._days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    $scope._times = ['6am','7am','8am','9am','10am',
                    '11am','12pm','1pm','2pm','3pm',
                    '4pm','5pm','6pm','7pm','8pm','9pm'];

    // $scope.available = 'available';
    // $scope.booked = 'booked';
    // $scope.empty = 'empty';

    $scope.availability = 'available';

    $scope.days = {'Mon':{},'Tue':{},'Wed':{},'Thu':{},'Fri':{},'Sat':{},'Sun':{}};

    /**
     * Get coach info
     */
    $scope.coach = Coach.get({
       url: $stateParams.coachId
    }, function(coach) {
      if(coach.availableTimes) $scope.days = coach.availableTimes;

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
     * Lesson Stuff
     */
    // $scope.lessons = Lesson.query({id: 'Coach1'});

    /**
     * Form stuff
     */

    $scope.errors = {};

    $scope.book = function(day, time) {

      $scope.days[day][time] = 'booked';

      var user = $scope.getCurrentUser();

      var start = new Date(),
          end = new Date();

      Auth.createLesson({
        coach: $scope.coach._id,
        user: user._id,
        for: user.for,
        count: user.count,
        age: user.age,
        exp: user.exp,
        startTime: start,
        endTime: end
      })
      .then( function() {
        $scope.message = 'booked';
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
    };

    var roundedDate = function(h) {
      var date = new Date();

      date.setHours( date.getHours() + Math.round(date.getMinutes()/60) + (h||0));
      date.setMinutes(0);
      date.setSeconds(0);

      return date;
    };

    /**
     * Modal things
     */
    $scope.open = function (day, time) {
      if(!$scope.days.hasOwnProperty(day)) {
        return;
      }
      if(!$scope.days[day].hasOwnProperty(time)) {
        return;
      }

      var modalInstance = $modal.open({
        templateUrl: 'bookModalContent.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          time: function () {
            return time;
          },
          day: function () {
            return day;
          }
        }
      });

      modalInstance.result.then(function () {
        $scope.book(day, time);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    /**
     *  Message stuff
     */

    $scope.message = function() {

      var modalInstance = $modal.open({
       templateUrl: 'messageModalContent.html',
       controller: 'MessageModalInstanceCtrl',
       resolve: {
         user: function () {
           return $scope.user;
         },
         coach: function () {
           return $scope.coach;
         }
       }
      });

      modalInstance.result.then(function () {

      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  });

angular.module('tennisBookingSiteApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, Auth, User, time, day) {

  /**
  * Auth stuff
  */
  $scope.getCurrentUser = Auth.getCurrentUser;
  $scope.isLoggedIn = Auth.isLoggedIn;

  // $scope.user = User.get(function(){
  //   console.log($scope.user);
  // });

  $scope.time = time;
  $scope.day = day;

  $scope.book = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

angular.module('tennisBookingSiteApp').controller('MessageModalInstanceCtrl', function ($scope, $modalInstance, Auth, Message, user, coach) {

  $scope.coach = coach;
  $scope.user = user;

  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.message = '';

  $scope.send = function () {

    if($scope.message.Length > 0) {
      Message.send({
        to: coach._id,
        message: $scope.message,
      });
    } else {
      $scope.error = 'The message is too short!'
    }

    console.log($scope.message);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
