const express = require('express');
const app = express();
const cors = require('cors');
const methodOverride = require('method-override');
require('dotenv').config();

/* middle ware*/
const corsOptions = {
    origin: '*',
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));

//to be removed
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });
  
//router
const addRouter = require('./router/addRouter');
app.use('/api', addRouter);

//mongoDB
const connectToMongoDB = require('./database/mongoDB');

//call port from .env file
const PORT = process.env.PORT
app.listen(PORT,(()=>{
    console.log(`app is listening on port ${PORT}`);
    connectToMongoDB();
}))
