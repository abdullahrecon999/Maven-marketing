var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('./config/passport')(passport);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var brandRouter = require('./routes/brand');
var influencerRouter = require('./routes/influencer');

var app = express();

const corsOptions = {
    origin: 'http://localhost:5000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    optionsSuccessStatus: 200,
    credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));
app.enable('trust proxy');
//app.options('*', cors()); 
app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(logger('dev'));

// API Rate Limiting
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
//app.use('/api', limiter); // 100 requests per hour
app.disable('etag');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(mongoSanitize()); // Data sanitization against NoSQL query injection
app.use(xss()); // Data sanitization against XSS
app.use(compression())

app.use(
session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    })
);
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/brand', brandRouter);
app.use('/users', usersRouter);
app.use('/influencer', influencerRouter);

app.all('*', (req, res, next) => {
      res.status(404).json({'Error':`Cant Find ${req.originalUrl}`}); // 404 Not Found
});

module.exports = app;
