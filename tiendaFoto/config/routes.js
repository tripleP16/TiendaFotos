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
  'GET /agregar-lista/:id':'CompraController.agregarLista',
  'GET /ver-lista':{ action: 'Compra/verLista', locals:{layout:'layouts/iniciado'} }, 
  'GET /eliminar-lista/:id':'CompraController.eliminarLista',

  'GET /admin/inicio-sesion':'AdminController.inicio',
  'POST /admin/procesar-inicio-sesion':'AdminController.procesarInicio',
  'GET /admin/index':{ action: 'Admin/principal', locals:{layout:'layouts/iniciado'} },
  'GET /admin/cerrar-sesion':'AdminController.cerrar',
  'GET /admin/agregar-foto':{ action: 'Admin/crearFoto', locals:{layout:'layouts/iniciado'} },
  'POST /admin/procesar-foto':'AdminController.procesarFoto',
  'GET /admin/desactivar-foto/:id':'AdminController.desactivarFoto',
  'GET /admin/activar-foto/:id':'AdminController.activarFoto',
  'GET /admin/clientes':{ action: 'Admin/clientes', locals:{layout:'layouts/iniciado'} },
  'GET /admin/ver-ordenes/:id':{ action: 'Admin/ordenes', locals:{layout:'layouts/iniciado'} },
  'GET /admin/ver-orden/:id':{ action: 'Admin/orden', locals:{layout:'layouts/iniciado'} },
  'GET /admin/desactivar-cliente/:id':'AdminController.desactivarCliente',
  'GET /admin/activar-cliente/:id':'AdminController.activarCliente',
  'GET /admin/administradores':{ action: 'Admin/administradores', locals:{layout:'layouts/iniciado'} },
  'GET /admin/desactivar-administrador/:id':'AdminController.desactivarAdministrador',
  'GET /admin/activar-administrador/:id':'AdminController.activarAdministrador',
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
