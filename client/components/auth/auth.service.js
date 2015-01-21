'use strict';

angular.module('tennisBookingSiteApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, Coach, Lesson, Review, $cookieStore, $q, Local) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {
      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create user
       *
       * @param  {String}  user - user info
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;
        
        return User.createUser(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          }, function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },
      
      /**
       * Create a new Coach
       *
       * @param  {Object}   coach - coach info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createCoach: function(coach, callback) {
        var cb = callback || angular.noop;

        return Coach.createCoach(coach,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(coach);
          }, function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },
      
      confirmEmail: function(mailConfirmationToken, callback) {
        var cb = callback || angular.noop;
        
        return Local.confirmMail({
          mailConfirmationToken: mailConfirmationToken
        }, function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          return cb(currentUser);
        }, function(err) {
          return cb(err);
        }.bind(this)).$promise;
      },
      
      submitReview: function(reviewToken, lessonReview, callback) {
        var cb = callback || angular.noop;
                
        return Review.submitReview({
          id:reviewToken
        },
          lessonReview, function(review) {
          return cb(review);
        }, function(err) {
          return cb(err);
        }.bind(this)).$promise;
      },
      
      
      /**
       * Create a new lesson
       *
       * @param  {Object}   lesson - lesson info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createLesson: function(lesson, callback) {
        var cb = callback || angular.noop;

        return Lesson.save(lesson,
          function(lesson) {
            return cb(lesson);
          },
          function(err) {
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },
      
      changeProfile: function(profile, callback) {
        var cb = callback || angular.noop;
        
        return User.changeProfile({ id: currentUser._id }, {
          profile: profile
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },
      
      changeAbout: function(about, callback) {
        var cb = callback || angular.noop;

        return User.changeAbout({ id: currentUser._id }, {
          about: about
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },
      
      changeAvailability: function(availability, callback) {
        var cb = callback || angular.noop;

        return User.changeAvailability({ id: currentUser._id }, {
          availability: availability
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },
      
      /**
       * Check if a user is a coach
       *
       * @return {Boolean}
       */
      isCoach: function() {
        return currentUser.role === 'coach';
      },
      
      isUser: function() {
        return currentUser.role === 'user';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      },
      
      /**
       * Check if a user's mail is confirmed
       *
       * @return {Boolean}
       */
      isMailconfirmed: function() {
        return currentUser.confirmedEmail;
      },
      
      /**
       * Confirm mail
       *
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      sendConfirmationMail: function(callback) {
        var cb = callback || angular.noop;

        return Local.verifyMail(function() {
          return cb();
        }, function(err) {
          return cb(err);
        }).$promise;
      },
      
      /**
       * Coach Confirm mail
       *
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      sendCoachConfirmationMail: function(callback) {
        var cb = callback || angular.noop;

        return Local.verifyMail(function() {
          return cb();
        }, function(err) {
          return cb(err);
        }).$promise;
      },
      
       /**
       * Set session token
       *
       * @param  {String}   session token
       * @return {Promise}
       */
      setSessionToken: function(sessionToken, callback) {
        var cb = callback || angular.noop;
        $cookieStore.put('token', sessionToken);
        currentUser = User.get(cb);
      }
    };
  });
