const express = require('express');
const mongoose = require('mongoose');
const cookieSession =  require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser'); 
const keys = require('./config/keys')
require('./models/User');
require('./services/passport');

const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const app=express();

app.use(bodyParser.json());
app.use(cookieSession({
    maxAge : 30 * 24 * 60 * 60* 1000,
    keys : [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURL);

authRoutes(app);
billingRoutes(app);

// app.get('/',(req,res)=>{
//     res.send({hi :'there'});
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT);

