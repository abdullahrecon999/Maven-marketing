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
const socket = require('socket.io')

// importing the router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var brandRouter = require('./routes/brand');
var influencerRouter = require('./routes/influencer');
var MessageRouter = require("./routes/chat");
var campaign = require("./routes/campaign")
var socialAutomate = require("./routes/socialAutomate")

var listing = require("./routes/listing")


// import the cron jobs
const ExpireContract = require("./CronJobs/updateContractJobs")
var app = express();

const corsOptions = {
    //multiple origins
    origin: "http://localhost:5173",
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
    credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));
app.enable('trust proxy');
// app.set('trust proxy', 1);
// app.options('*', cors()); 
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

// app.use(
// session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: 'mongodb+srv://root:root@cluster0.trpwg.mongodb.net/mavenMarketing', ttl: 60 * 60 * 24, autoRemove: 'native' }),
//     })
// );

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: 'mongodb+srv://root:root@cluster0.trpwg.mongodb.net/mavenMarketing', ttl: 60 * 60 * 24, autoRemove: 'native' }),
    })
);

//app.use(session({ secret: 'anything' }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// app.use(cors(corsOptions))
//calling the routers
// app.use('/', indexRouter);

// app.use(express.static(path.join(__dirname, '../frontend', 'dist')));
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
// })


app.get('/', (req, res, next) => {
    // If there is code in the query string, then redirect to the callback URL
    if (req.query.code) {
        passport.authenticate('tiktok', {
            successRedirect: 'http://localhost:5173/brandhome',
            failureRedirect: '/login',
            session: false
        })(req, res, next);
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'))
    }
});


// app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/brand', brandRouter);
app.use('/users', usersRouter);
app.use('/influencer', influencerRouter);
app.use("/chats", MessageRouter)
app.use("/campaign", campaign)
app.use("/automate", socialAutomate)
app.use("/list", listing)

app.all('*', (req, res, next) => {
    res.status(404).json({ 'Error': `Cant Find ${req.originalUrl}` }); // 404 Not Found
});

const server = app.listen(5000, () => {
    console.log("socket server started at 5000")
})

const io = socket(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
})

global.onlineUsers = new Map();
global.offlineTime = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        console.log("the user is", socket.id)

        onlineUsers.set(userId, socket.id)
        console.log("the map is", onlineUsers)
    })
    socket.on("send-msg", async (data) => {
        const sendUserSocket = await onlineUsers.get(data.to)
        console.log(onlineUsers)
        console.log("data user id is ", sendUserSocket)

        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.text)
            console.log("message is", data.text)
        }
    })
    socket.on("checkOnline", (userId) => {
        if (onlineUsers.has(userId))
            socket.emit("userOnline", "online")
        else {
            socket.emit("userOnline", "offline")
            console.log(offlineTime)
            if (offlineTime.has(userId)) {
                const time = offlineTime.get(userId)
                socket.emit("offlineTime", time)
            }
        }
    })
    socket.on('logout', (userId) => {

        if (onlineUsers.has(userId)) {
            onlineUsers.delete(userId)

            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;

            offlineTime.set(userId, dateTime)
            socket.emit("userOnline", "offline")
        }
    })
})



//ExpireContract.start()
module.exports = app;
