const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const mongoDbSession = require('connect-mongodb-session')(session);
const cors = require('cors');
const mongoose = require('mongoose');

// initialize config file
dotenv.config();

// initialize express
const app = express();

// database connect
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
    .then(() => {
        console.log('connection to db established')
    })
    .catch(err => {
        throw err;
    })

// session store
const store = new mongoDbSession({
        uri: `${process.env.MONGO_URI}`,
        collection: 'sessions'
    }, (err) => {
        if(err){
            throw err;
        }
    }
)

// middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production'? true : false,
        maxAge: 30*60*1000
    },
    store: store
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const authRoutes = require('./routes/authenticationRoutes');
const userRoutes = require('./routes/userRoutes');
// const resourceRoutes = require('./routes/resourceRoutes');

app.use('/', authRoutes);
app.use('/', userRoutes);
// app.use('/', resourceRoutes);

app.get('/', (req, res) => {
    res.json({ msg: 'welcome to api' });
})

// fire up server
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running in ${process.env.NODE_ENV} on port ${port}`);
})
