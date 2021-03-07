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
            let calculoTotal = `SELECT sum(precio) as total from carro_de_compra INNER JOIN foto ON foto_id = foto.id WHERE cliente_id  = ${peticion.session.cliente.id}`;
            let total = await sails.sendNativeQuery(calculoTotal);
            
            respuesta.view('pages/carrito', {elementos:elementos, total:total.rows[0].total})
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
    }, 
    pagar: async (peticion, respuesta)=>{
        if(peticion.session && peticion.session.cliente){
            if(peticion.session.carro.length > 0){
                let fecha = new Date(); 
                let fec = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`; 
                let calculoTotal = `SELECT sum(precio) as total from carro_de_compra INNER JOIN foto ON foto_id = foto.id WHERE cliente_id  = ${peticion.session.cliente.id}`;
                let total = await sails.sendNativeQuery(calculoTotal);
                total = total.rows[0].total
                let orden = await OrdenDeCompra.create({
                    fecha: fec, 
                    total: total, 
                    cliente:peticion.session.cliente.id,
                }).fetch();
                let elementos = await CarroCompra.find({cliente:peticion.session.cliente.id}).populate('foto')
                for (let i = 0; i < elementos.length; i++) {
                    let detalle = await OrdenDetalle.create({
                        orden: orden.id, 
                        foto : elementos[i].foto.id
                    })
                    
                }
                await CarroCompra.destroy({
                    cliente: peticion.session.cliente.id
                });
                peticion.session.carro =  await CarroCompra.find({cliente:peticion.session.cliente.id}) 
            }
            
            return respuesta.redirect('/index')
        }else{
            return respuesta.redirect('/')
        }
    }, 

    ordenes: async (peticion, respuesta) =>{
        if(peticion.session && peticion.session.cliente){
            let ordenes = await OrdenDeCompra.find({cliente:peticion.session.cliente.id }).sort('id desc'); 
            respuesta.view('pages/ordenes', {ordenes:ordenes})
        }else{
            return respuesta.redirect('/')
        }
    },

    verOrdenes: async (peticion, respuesta)=>{
        if(peticion.session && peticion.session.cliente){
            var orden = await OrdenDeCompra.findOne({id:peticion.params.id, cliente:peticion.session.cliente.id})
            if(orden){
                let detalles = await OrdenDetalle.find({orden:orden.id}).populate('foto'); 
                respuesta.view('pages/orden_detalle', {detalles:detalles, total:orden.total, numero:orden.id, fecha:orden.fecha})
            }else{
                return respuesta.redirect('/index')
            }
        }else{
            return respuesta.redirect('/')
        }
    }, 
    agregarLista: async (peticion, respuesta)=>{
            let foto = await ListaDeDeseos.findOne({cliente:peticion.session.cliente.id, foto:peticion.params.id}); 
            if(foto){
                peticion.addFlash('men','La foto ya esta en su lista!!')
            }else{
                
                await ListaDeDeseos.create({
                    cliente:peticion.session.cliente.id, 
                    foto:peticion.params.id
                })

    
                peticion.session.lista =  await ListaDeDeseos.find({cliente:peticion.session.cliente.id})
                peticion.addFlash('men','Foto agregada satisfactoriamente!!')
                
            }
            return respuesta.redirect('/index')
        
    }, 

    verLista: async (peticion, respuesta)=>{
        if(peticion.session && peticion.session.cliente){
            let elementos =  await ListaDeDeseos.find({cliente:peticion.session.cliente.id}).populate('foto')
            if(elementos){
                respuesta.view('pages/lista', {elementos:elementos});
            }else{
                return respuesta.redirect('/index')
            }
        }else{
            return respuesta.redirect('/')
        }
    },

    eliminarLista: async(peticion, respuesta)=>{
        let foto = await ListaDeDeseos.findOne({cliente:peticion.session.cliente.id, foto:peticion.params.id}); 
        if(foto){
            await ListaDeDeseos.destroy({
                cliente:peticion.session.cliente.id, foto:peticion.params.id}
            )
            peticion.session.lista =  await ListaDeDeseos.find({cliente:peticion.session.cliente.id})
            peticion.addFlash('men','Foto eliminada satisfactoriamente!!')
        }
        return respuesta.redirect('/ver-lista')
    }
    
};

