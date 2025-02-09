var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import { Request, Response, NextFunction} from "express";  
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const viewsPath = __dirname +"\\..\\"
// view engine setup
app.set('views', path.join(viewsPath, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(viewsPath, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: { message: any; status: any; }, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
