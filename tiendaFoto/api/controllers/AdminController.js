
const path = require('path'); 
const fs = require('fs')
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
              let fotos = await Foto.find()
              respuesta.view('pages/admin/principal', {fotos:fotos})
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
        peticion.addFlash('men', 'Sesión finalizada')
        return respuesta.redirect("/");
      },
      crearFoto: async (peticion, respuesta)=>{
          respuesta.view('pages/admin/agregar_foto')
      }, 
      procesarFoto: async (peticion, respuesta)=>{
          let foto = await Foto.create({
              precio: peticion.body.precio, 
              activa: false
          }).fetch(); 
          peticion.file('foto').upload({}, async(error, archivos)=>{
              if(archivos && archivos[0]){
                  let upload_path = archivos[0].fd;
                  let ext = path.extname(upload_path); 
                  await fs.createReadStream(upload_path).pipe(fs.createWriteStream(path.resolve(sails.config.appPath,`assets/images/${foto.id}${ext}`)))
                  await Foto.update({id:foto.id}, {contenido: `/images/${foto.id}${ext}`, activa:true})
                  peticion.addFlash('men', 'Foto Agregada')
                  return respuesta.redirect("/admin/index");
              }
                  peticion.addFlash('men', 'No llegaron archivos')
                  return respuesta.redirect("/admin/index");
          })
      }, 
      activarFoto: async (peticion, respuesta)=>{
        let foto = Foto.findOne({id:peticion.params.id}); 
        if(foto){
            await Foto.update({id:peticion.params.id}, {activa:true})
            peticion.addFlash('men', 'Foto activada')
            return respuesta.redirect("/admin/index");
        }else{
            peticion.addFlash('men', 'Foto inexistente')
            return respuesta.redirect("/admin/index");
        }

      }, 
      desactivarFoto: async (peticion, respuesta)=>{
        let foto = Foto.findOne({id:peticion.params.id}); 
        if(foto){
            await Foto.update({id:peticion.params.id}, {activa:false})
            peticion.addFlash('men', 'Foto desactivada')
            return respuesta.redirect("/admin/index");
        }else{
            peticion.addFlash('men', 'Foto inexistente')
            return respuesta.redirect("/admin/index");
        }
      },

      clientes: async (peticion, respuesta)=>{
        let clientes = await Cliente.find(); 
        if(peticion.session && peticion.session.admin){
          respuesta.view('pages/admin/clientes', {clientes:clientes})
        }else{
          peticion.addFlash('men', 'Sesion invalida!!'); 
          return respuesta.redirect('/admin/inicio-sesion')
        }
      }, 
      ordenes: async(peticion, respuesta)=>{
        if(peticion.session && peticion.session.admin){
          let ordenes = await OrdenDeCompra.find({cliente:peticion.params.id }).sort('id desc'); 
          respuesta.view('pages/admin/ordenes', {ordenes:ordenes})
        }else{
          peticion.addFlash('men', 'Sesion invalida!!'); 
          return respuesta.redirect('/admin/inicio-sesion')
        }
      },

      orden:async (peticion, respuesta)=>{
        if(peticion.session && peticion.session.admin){
          var orden = await OrdenDeCompra.findOne({id:peticion.params.id})
          if(orden){
              let detalles = await OrdenDetalle.find({orden:orden.id}).populate('foto'); 
              respuesta.view('pages/admin/orden_detalle', {detalles:detalles, total:orden.total, numero:orden.id, fecha:orden.fecha})
          }else{
              return respuesta.redirect('/admin/index')
          }
        }else{
          peticion.addFlash('men', 'Sesion invalida!!'); 
          return respuesta.redirect('/admin/inicio-sesion')
        }
      },
      desactivarCliente:async(peticion, respuesta)=>{
        if(peticion.session && peticion.session.admin){
          await Cliente.update({id:peticion.params.id}, {activa:false}); 
          peticion.addFlash('men', 'Cuenta desactivada!');
          return respuesta.redirect('/admin/clientes')
        }else{
          peticion.addFlash('men', 'Sesion invalida!!'); 
          return respuesta.redirect('/admin/inicio-sesion')
        }
      },
      activarCliente:async(peticion, respuesta)=>{
        if(peticion.session && peticion.session.admin){
          await Cliente.update({id:peticion.params.id}, {activa:true}); 
          peticion.addFlash('men', 'Cuenta Activada!!');
          return respuesta.redirect('/admin/clientes')
        }else{
          peticion.addFlash('men', 'Sesion invalida!!'); 
          return respuesta.redirect('/admin/inicio-sesion')
        }
      },
}