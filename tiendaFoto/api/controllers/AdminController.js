
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
      }
}