const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('./public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');

// Check for login status
const loginCheck = function(req, res, next) {
    if (req.cookies['login'] || req.method !== 'GET' || req.originalUrl === '/users/new') {
        next();
    } else {
        res.redirect('/');
    };
};
app.use('/users', loginCheck);
app.use('/tasks', loginCheck);

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

app.get('/', function(req, res) {
    let loggedIn = false, id = '';
    if (req.cookies['login']) {
        id = req.cookies['login'];
        loggedIn = true;
    };
    res.render('Home', {loggedIn, id});
});

app.listen(3000, () => {
    console.log('Setting sail from port 3000!')
})