const express = require('express');
const mongoose = require('mongoose');
const cookieSession =  require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser'); 
const keys = require('./config/keys')
require('./models/User');
require('./models/Survey');
require('./services/passport');

const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
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
surveyRoutes(app);

if (process.env.NODE_ENV === 'production'){
    //express will serve up production assests like our main.js or main.css file
    app.use(express.static('client/build'));

    //express will surve te index.html file if it doesn't recognize the route

    const path =require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    })
}

// app.get('/',(req,res)=>{
//     res.send({hi :'there'});
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT);

