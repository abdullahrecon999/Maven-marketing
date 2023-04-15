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
const MongoStore = require('connect-mongo');
require('./config/passport')(passport);

// importing the router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var brandRouter = require('./routes/brand');
var influencerRouter = require('./routes/influencer');
var MessageRouter = require("./routes/chat");
var campaign = require("./routes/campaign")

var app = express();

const corsOptions = {
    //multiple origins
    origin: "http://localhost:5173",
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
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
// app.use(express.static(path.join(__dirname, 'public')));

app.use(mongoSanitize()); // Data sanitization against NoSQL query injection
app.use(xss()); // Data sanitization against XSS
app.use(compression())

app.use(
session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://root:root@cluster0.trpwg.mongodb.net/mavenMarketing', ttl: 60 * 60 * 24, autoRemove: 'native' }),
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//calling the routers
// app.use('/', indexRouter);

app.use(express.static(path.join(__dirname, '../frontend', 'dist')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
})

app.use('/admin', adminRouter);
app.use('/brand', brandRouter);
app.use('/users', usersRouter);
app.use('/influencer', influencerRouter);
app.use("/chats", MessageRouter)
app.use("/campaign", campaign)

app.all('*', (req, res, next) => {
      res.status(404).json({'Error':`Cant Find ${req.originalUrl}`}); // 404 Not Found
});

module.exports = app;
