var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//session 
const session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var positionsRouter = require('./routes/positions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//使用express-session 中间件，使得Express 应用支持seeion处理
app.use(session({
	secret:'asdfkjasidfjwoeqijrlksadufoashdf',
	resave:false,
	saveUninitialized:true,
	cookie:{ maxAge : 30*60*1000}
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //访问"/"下面目录的资源
app.use('/api/users', usersRouter);//访问 "/api/users"目录下的资源
app.use('/api/positions',positionsRouter);//访问"/api/positions"目录下的资源

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
