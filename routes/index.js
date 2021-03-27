var express = require('express');
const { route } = require('./users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', author: 'Armando Valencia', appName: 'WebApp' });
});

/*Agregando nueva ruta
router.get('/greeting', function(req, res, next){
  res.send('Hola Campeon de la Fullstack Web');
}); //callback="Te llamo despues"*/

/*Agregando nueva ruta*/
router.get('/greeting', function(req, res, next){
  res.status(200).json({message: 'Hola Campeón de la Fullstack Web'});
});

/*Mi Ruta Nueva*/
router.get('/holamundo', function(req, res, next){
  res.send('Hola, esta es mi ruta nueva, hola mundo');
});

module.exports = router;
