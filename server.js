const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require("connect-mongo");


const ensureLoggedIn = require('./middleware/ensureLoggedIn.js')

const authController = require('./controllers/auth.js');
const championsController = require('./controllers/champions.js');
const passGlobalDataToViews = require('./middleware/passGlobalDataToViews.js');


const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

server.use(express.urlencoded({ extended: false }));
server.use(methodOverride('_method'));
server.use(morgan('dev'));
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

server.use(passGlobalDataToViews);

server.get('/', (req, res) => {
    res.render('index.ejs', {
      user: req.session.user,
    });
  });



server.use('/auth', authController);
server.use('/champions', ensureLoggedIn, championsController);


server.listen(port, () => {
    console.log(`The express server is ready on port ${port}!`);
  });