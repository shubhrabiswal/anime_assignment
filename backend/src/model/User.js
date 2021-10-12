const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [validateEmail, "Please enter a valid email address"],
    trim:true,
    unique:true
  },
  password: {
    type: String,
    trim:true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  }
},{ timestamps: true });

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);