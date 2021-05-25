//Importación de las Dependencias
//var createError = require('http-errors');
//var express = require('express');
//var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

//Enrutamiento
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
import indexRouter from '@s-routes/index';
import usersRouter from '@s-routes/users';

//Webpack Modules
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config';
import webpackDevConfig from '../webpack.dev.config';

//Consultar el modo en que se esta ejecutando la aplicación
const env = process.env.NODE_ENV || 'development';

//Se crea la aplicación express
var app = express();

//Verificando el modo de ejecuación de la aplicación
if(env === 'development'){
  console.log('> Excecuting in Development Mode: Webpack Hot Reloading');
  // Paso 1. Agregando la ruta del HMR
  // Reload=true: Habilita la recarga del frontend cuando hay cambios en el codigo
  // fuente del frontend
  // timeout=1000: Tiempo de espera entre recarga y recarga de la pagina
  webpackConfig.entry = ['webpack-hot-middleware/client?reload=true&timeout=1000', webpackConfig.entry];

  // Paso 2. Agregamos el plugin
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Paso 3. Crear el compilador de webpack
  const compiler = webpack(webpackConfig);

  // Paso 4. Agregando el middleware a la cadena de Middlewares
  // de nuestra aplicación
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath
  }));

  // Paso 5. Agregando el Webpack Hot middleware
  app.use(webpackHotMiddleware(compiler));
}else{
  console.log('> Executing in Production Mode...');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..','public'))); //app.use(express.static('/mnt/c/Users/ITGAM/ProjNotes/public'));
app.use("/saludo",function(req, res, next){
  console.log(req.ip)
  console.log("Saludo")
  next()
},function(req,res,next){
  res.json({"Mensaje":"Hola buen dia"})
}); //Tambien es posible utilizar GET en vez de USE

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
