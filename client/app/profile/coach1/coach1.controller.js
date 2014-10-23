'use strict';

angular.module('tennisBookingSiteApp')
  .controller('Coach1Ctrl', function ($scope, $modal, $log, Auth) {
    
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;
    
    $scope.days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    $scope.times = ['6am','7am','8am','9am','10am',
                    '11am','12pm','1pm','2pm','3pm',
                    '4pm','5pm','6pm','7pm','8pm','9pm'];
        
    $scope.available = 'available';
    $scope.booked = 'booked';
    $scope.empty = 'empty';
                
    $scope.available = 'available';
    
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
  
angular.module('tennisBookingSiteApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, selectedTime) {

  $scope.items = items;
  $scope.selectedTime = selectedTime;
  
  console.log(items+' '+selectedTime);
  
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