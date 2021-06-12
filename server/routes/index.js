// Importando el router de home
import homeRouter from './home';
// Importando router de users
import userRouter from './user';

// const { route } = require('./users');

/* GET home page. */
// router.use('/', homeRouter);
// router.use('/user', userRouter);

// Agregando las rutas a la aplicación
const addRoutes = (app) => {
  app.use('/', homeRouter);
  app.use('/user', userRouter);
  return app;
};

export default {
  addRoutes,
};

/* Agregando nueva ruta
router.get('/greeting', function(req, res, next){
  res.send('Hola Campeon de la Fullstack Web');
}); //callback="Te llamo despues" */

// /*Mi Ruta Nueva*/
// router.get('/holamundo', function(req, res, next){
//   res.send('Hola, esta es mi ruta nueva, hola mundo');
// });
