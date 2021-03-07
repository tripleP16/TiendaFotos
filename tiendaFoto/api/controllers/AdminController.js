module.exports = {
    inicio: async (peticion, respuesta)=>{
        respuesta.view('pages/admin/inicio_sesion')
    }, 
    procesarInicio: async (peticion, respuesta)=>{
        let admin = await Administrador.findOne({email:peticion.body.email, contrasena:peticion.body.contrasena}); 
        if(admin){
          peticion.addFlash('men', 'Sesion Iniciada !!'); 
          peticion.session.admin = admin;
          peticion.session.cliente = undefined;
          return respuesta.redirect('/admin/index')
        }else{
          peticion.addFlash('men', 'Error en el inicio de sesion verifique el correo y la contrasena!!'); 
          return respuesta.redirect('/admin/inicio-sesion')
          
        }
      },
      principal: async (peticion, respuesta)=>{
          if(peticion.session && peticion.session.admin){
              respuesta.view('pages/admin/principal')
          }else{
            peticion.addFlash('men', 'Sesion invalida!!'); 
            return respuesta.redirect('/admin/inicio-sesion')
          }
      },
      cerrar: async (peticion, respuesta) => {
        peticion.session.cliente = undefined;
        peticion.session.carro = undefined;
        peticion.session.lista =  undefined;
        peticion.session.admin = undefined;
        peticion.addFlash('mensaje', 'Sesión finalizada')
        return respuesta.redirect("/");
      },
}