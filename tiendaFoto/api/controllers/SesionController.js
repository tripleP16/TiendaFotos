/**
 * SesionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  registro:async (peticion, respuesta)=>{
      respuesta.view('pages/registro')
  },
  procesarRegistro: async (peticion, respuesta)=>{
    let cliente = await Cliente.findOne({email:peticion.body.email}); 
    if(cliente){
      peticion.addFlash('men', 'Cliente existente verifique sus datos !!'); 
      return respuesta.redirect('/registro')
    }else{
      let cliente = await Cliente.create({
        email: peticion.body.email, 
        nombre:peticion.body.nombre, 
        contrasena:peticion.body.contrasena
      })
      peticion.session.cliente = cliente;
      peticion.addFlash('men', 'Cliente Registrado !!'); 
      return respuesta.redirect('/')
    }
  },
  procesarInicio: async (peticion, respuesta)=>{
    let cliente = await Cliente.findOne({email:peticion.body.email, contrasena:peticion.body.contrasena}); 
    if(cliente){
      peticion.addFlash('men', 'Sesion Iniciada !!'); 
      peticion.session.cliente = cliente;
      return respuesta.redirect('/index')
    }else{
      peticion.addFlash('men', 'Error en el inicio de sesion verifique el correo y la contrasena!!'); 
      return respuesta.redirect('/inicio-sesion')
      
    }
  },

  iniciarSesion:async (peticion, respuesta)=>{
    respuesta.view('pages/iniciar_sesion')
},
  cerrar: async (peticion, respuesta) => {
    peticion.session.cliente = undefined;
    peticion.addFlash('mensaje', 'Sesión finalizada')
    return respuesta.redirect("/");
  },

};

