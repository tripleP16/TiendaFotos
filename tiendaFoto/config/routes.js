/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /':'PrincipalController.inicio',
  '/acerca-de':{view:'pages/acerca_de'},
  '/index':{ action: 'Principal/inicio', locals:{layout:'layouts/iniciado'} },
  'GET /registro':'SesionController.registro',
  'POST /procesar-registro':'SesionController.procesarRegistro',
  'GET /inicio-sesion':'SesionController.iniciarSesion', 
  'POST /procesar-inicio':'SesionController.procesarInicio',
  'GET /cerrar-sesion':'SesionController.cerrar',
  'GET /agregar-carro-compra/:id':'CompraController.agregarCompra',
  '/carro-de-compra':{ action: 'Compra/carrito', locals:{layout:'layouts/iniciado'} },
  'GET /eliminar-carrito/:id':'CompraController.eliminarCompra',
  'GET /pagar':'CompraController.pagar', 
  'GET /ordenes':{ action: 'Compra/ordenes', locals:{layout:'layouts/iniciado'} }, 
  'GET /ver-orden/:id':{ action: 'Compra/verOrdenes', locals:{layout:'layouts/iniciado'} }, 
  'GET /top-vendidas':'PrincipalController.topVendidas',
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
