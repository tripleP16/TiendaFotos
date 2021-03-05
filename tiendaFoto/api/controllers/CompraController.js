/**
 * CompraController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */






module.exports = {
  
    agregarCompra: async (peticion, respuesta)=>{
        let foto = await CarroCompra.findOne({cliente:peticion.session.cliente.id, foto:peticion.params.id}); 
        if(foto){
            peticion.addFlash('men','La foto ya esta en su carrito!!')
        }else{
            await CarroCompra.create({
                cliente:peticion.session.cliente.id, 
                foto:peticion.params.id
            })

            peticion.session.carro =  await CarroCompra.find({cliente:peticion.session.cliente.id})
            peticion.addFlash('men','Foto agregada satisfactoriamente!!')
        }

        return respuesta.redirect('/index')
    },

    carrito: async (peticion, respuesta)=>{
        if(!(peticion.session && peticion.session.cliente)){
            return respuesta.redirect('/')
        }else{
            let elementos = await CarroCompra.find({cliente:peticion.session.cliente.id}).populate('foto')
            respuesta.view('pages/carrito', {elementos:elementos})
        }
           
    },

    eliminarCompra: async (peticion,respuesta)=>{
        let foto = await CarroCompra.findOne({cliente:peticion.session.cliente.id, foto:peticion.params.id}); 
        if(foto){
            await CarroCompra.destroy({
                cliente:peticion.session.cliente.id, foto:peticion.params.id}
            )
            peticion.session.carro =  await CarroCompra.find({cliente:peticion.session.cliente.id})
            peticion.addFlash('men','Foto eliminada satisfactoriamente!!')
        }
        return respuesta.redirect('/carro-de-compra')
    }
    
};

