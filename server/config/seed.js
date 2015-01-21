/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Lesson = require('../api/lesson/lesson.model');
var mongoose = require('mongoose');

var coach1 = mongoose.Types.ObjectId();
var user1 = mongoose.Types.ObjectId();
var user2 = mongoose.Types.ObjectId();

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    _id: user2,
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  },{
    _id: user1,
    provider: 'local',
    name: 'Fergus',
    email: 'fergurburgerman@gmail.com',
    password: 'test',
    confirmed: true
  },
  {
    _id: coach1,
    provider: 'local',
    role: 'coach',
    name: 'Coach1',
    url: 'coach1',
    about: "Hi, my name is Miha and I'm orginally from Slovenia. I was number 1 junior in the world 14 and under and a top 10 junior in the world 18 and under (semi-finalist orange bowl-quarter -finalist of junior Wimbledon). I played professional for 10 years with my highest ATP ranking 400. I won a few futures events and played Davis cup for Slovenia for 4 years. I have been coaching in Florida for the last 7 years. I worked at Rick Macci tennis academy and worked on my own for last 5 years with top juniors in Florida and a few ATP ranked players as well! I have wins over top ATP players including Juan Carlos Ferrero, Fernando Gonzales, Ivan Ljubicic and Ivo Karlovic.",
    email: 'coach@coach.com',
    password: 'coach',
    availableTimes : { "Sat" : { "1pm" : "available", "12pm" : "available" }, "Fri" : { "11am" : "available", "1pm" : "available", "2pm" : "available", "3pm" : "available", "12pm" : "available" }, "Thu" : { "12pm" : "available", "1pm" : "available" }, "Wed" : { "7am" : "available" }, "Tue" : { "7am" : "available", "8am" : "available", "6am" : "available" }, "Mon" : { "7am" : "available" }},
    loc: [53.42644809999999, -6.249909800000069]
  },
  {
    provider: 'local',
    role: 'coach',
    name: 'Zach B.',
    url: 'zach-b.',
    about: "As a top USTA nationally ranked junior player, I was recruited to play at the University of Arizona. After my freshman year I left school to tour professionally. Eight months into my career, I endured a career-ending back injury that shifted my focus to the coaching side of the game. With the importance of physical maintenance and fitness, I bring a unique combination of high-level playing experience and fitness training to the game. My passionate and patient approach allows me to thrive with players of all skill levels. I was recently featured in national fitness programs and DVDs, allowing me to keep expanding my knowledge base and tailor workout plans to help clients of all levels succeed on and off the court.",
    email: 'zach@zach.com',
    password: 'coach',
    loc: [53.42644809999999, -6.249909800000069]
  },
  {
    provider: 'local',
    role: 'coach',
    name: 'Luke S.',
    url: 'luke-s',
    about: "Hi, my name is Luke and I teach tennis all over South Florida. I have extensive experience with tennis. I grew up in a tennis family and I have played all over the world. I have received instruction in my junior years from the best coach in the history of the game: Rick Macci. I enjoy giving lessons to students of all ages and I recognize that different levels call for different approaches. My style and approach caters to what the student or the students parents want from me. Casual players in their 50s are obviously not going to be pushed as hard as I push my junior phenoms. Everyone always ends up happy working with me. I grew up in South Florida and I have beaten former top players Mardy Fish and Alex Bogomolov while also pushing Roddick to 3 sets twice.",
    email: 'luke@coach.com',
    password: 'coach',
    loc: [53.42644809999999, -6.249909800000069]
  },
  {
    provider: 'local',
    role: 'coach',
    name: 'An Other coach',
    url: 'an-other-coach',
    about: "Hi, my name is Luke and I teach tennis all over South Florida. I have extensive experience with tennis. I grew up in a tennis family and I have played all over the world. I have received instruction in my junior years from the best coach in the history of the game: Rick Macci. I enjoy giving lessons to students of all ages and I recognize that different levels call for different approaches. My style and approach caters to what the student or the students parents want from me. Casual players in their 50s are obviously not going to be pushed as hard as I push my junior phenoms. Everyone always ends up happy working with me. I grew up in South Florida and I have beaten former top players Mardy Fish and Alex Bogomolov while also pushing Roddick to 3 sets twice.",
    email: 'other@coach.com',
    password: 'coach',
    loc: [53.42644809999999, -6.249909800000069]
  },
   {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Lesson.find({}).remove(function() {
  Lesson.create(
  { 
    coach : coach1,
    coachName: "CoachName",
    user : user1,
    bookDate : "2015-01-17T02:18:21.043Z",
    startTime : "2015-01-17T02:18:21.034Z",
    endTime : "2015-01-17T02:18:21.034Z"
  },
  { 
    coach : coach1,
    coachName: "Some CoachName",
    user : user2,
    bookDate : "2015-01-17T02:18:21.043Z",
    startTime : "2015-01-22T02:18:21.034Z",
    endTime : "2015-01-17T02:18:21.034Z"
  },
  {
    coach: 'coach1',
    user: 'Test User',
    for: 'myself',
    count: 2,
    age: '18-30',
    exp: 'beginner',
    startTime: new Date(),
    endTime: new Date()
  },
  {
    coach: 'Zach B.',
    user: 'Test User',
    for: 'myself',
    count: 1,
    age: '18-30',
    exp: 'beginner',
    startTime: new Date(),
    endTime: new Date()
  }, function() {
      console.log('finished populating lessons');
    }
  );
});