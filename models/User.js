const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Destructure way
//   const {Schema} = mongoose ;

const userSchema = new Schema({
    googleId : String
});

mongoose.model('users',userSchema);