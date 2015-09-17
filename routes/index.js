var express = require('express');
var router = express.Router();
var models = require('../models/');
var Promise = require('bluebird');

/* GET home page. */
router.get('/', function(req, res, next) {
  Promise.all([ Hotel.find(), Restaurant.find(), Activity.find()])
    .then(function(results){
      var data = {
        all_hotels: results[0],
        all_restaurants: results[1],
        all_activities: results[2],
        apiKey: process.env.API_KEY
      };
      data.dropDownItems = function(label, items){
        return {
          items: items,
          label: label
        }
      }
      return data;

    })
    .then(function(data){
      res.render('index', data);
    })
    .catch(function(err){
      next(new Error(err));
    });
});


// router.get('/', function(req, res, next) {
//   Promise.all([])
//   models.Hotel.find({}).exec().then(function(hotels){
// 		models.Restaurant.find({}).exec().then(function(restaurants) {
// 			models.Activity.find({}).exec().then(function(activities) {
// 		  	res.render('index', {
// 		  		all_hotels: hotels, 
// 		  		all_restaurants: restaurants,
// 		  		all_activities: activities
// 		  	});
// 			}).then(null, console.log);
// 		}).then(null, console.log);
//   }).then(null, console.log);
// });

module.exports = router;
