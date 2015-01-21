'use strict';
/*jshint loopfunc:true */ 

var CronJob = require('cron').CronJob;
var Lesson = require('../api/lesson/lesson.model');
var User = require('../api/user/user.model');
var mail = require('../mail');
var jwt = require('jsonwebtoken');
var config = require('../config/environment');
var _ = require('lodash');

// Run every hour - check for completed lessons that havent sent a review email

var job = new CronJob({
  cronTime: '0 * * * *',
  onTick: function(){
    console.log("Starting review email process");
    
    // Find all the unreviewed lessons
    Lesson.find({"endTime":{$lt: new Date()}, sent_review: false }, function(err, lessons) {
      if(err) return console.log(err);
      if(!lessons) return;

      for(var lesson_id in lessons) {
        var user_id = lessons[lesson_id].user;
        
        // Send email to each user
        (function(lesson_id){
          User.findById(user_id, function(err, user){
            if(err) return console.log(err);
            if(!user) return;
                  
            var lesson = lessons[lesson_id];
                      
            var reviewToken = jwt.sign({lesson_id:lesson._id}, config.secrets.reviewConfirmation, {expiresInMinutes: 60 * 24 * 60});
                          
            mail.lessonReview.sendMail(user.name, lesson.coachName, user.email, reviewToken, function(error){
              if(error) return console.log(error);
                          
              lesson.sent_review = true;
              lesson.save(function(err) {
                if(err) console.log(err);
                return;
              })
            });
          
          })
        })(lesson_id);
      }
            
    });
    
  },
  onComplete: function () {
    console.log("Stopping review email process");
    // This function is executed when the job stops
  },
  start: false
});

module.exports = job.start();