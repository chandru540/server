const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Destructure way
//   const {Schema} = mongoose ;

const userSchema = new Schema({
    googleId : String,
    credits : {type : Number , default : 0 }
});


//load model to the mongoose library
mongoose.model('users',userSchema);
