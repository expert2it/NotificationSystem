
var mongoose = require('mongoose')

// User Model
exports.Users = mongoose.model('Users', {
    userID: Number,  
    username: String,
    password: String,
    deviceID: String,
    fullname: String,
    email: String,
    user_type: String,
    created_date: Date
  });

  // Activty Model
  exports.Activities = mongoose.model('Activities', {
    userID: Number,  
    type: String,
    last_seen: Date
  });

  // Notification Model
  exports.Notifications = mongoose.model('Notifications', {
    userID: Number,  
    message: String,
    created_date: Date
  });

   // Configurations Model
   exports.Configurations = mongoose.model('Configurations', {
    status: String,  
    idle_days: Number
  });
