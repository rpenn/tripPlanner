var mongoose = require('mongoose');
var chalk = require('chalk');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/tripPlanner', function(err) {
  if(err) {
    return console.log(chalk.red(err));
  }
  console.log(chalk.green("connect to database " + mongoose.connection.name));
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var placeSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  phone: String,
  location: [Number]
});

var hotelSchema = new mongoose.Schema({
  name: String,
  place: [placeSchema],
  num_stars: {type: Number, min: 1, max: 5},
  amenities: String // needs to be comma delimited string list

});

var activitySchema = new mongoose.Schema({
  name: String,
  place: [placeSchema],
  age_range: String
});

var restaurantSchema = new mongoose.Schema({
  name: String,
  place: [placeSchema],
  cuisines: String, // needs to be comma delimited string list
  price:  {type: Number, min: 1, max: 5}
});

var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var Activity = mongoose.model('Activity', activitySchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);


module.exports = {
  Place: Place,
  Hotel: Hotel,
  Restaurant: Restaurant,
  Activity: Activity
};