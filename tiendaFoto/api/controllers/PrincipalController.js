/**
 * PrincipalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
    inicio:async (peticion, respuesta)=>{
        let fotos = await Foto.find({activa:true}); 
        respuesta.view("pages/inicio", {fotos:fotos})

    },
    topVendidas: async (peticion, respuesta)=>{
        let query = `SELECT contenido, count(*) AS cantidad FROM orden_detalle INNER JOIN foto ON orden_detalle.foto_id = foto.id GROUP BY contenido, foto_id ORDER BY COUNT(*) DESC LIMIT 10 `;
        await OrdenDetalle.query(query, [], (errores, resultado)=>{
            let fotos = resultado.rows; 
            respuesta.view('pages/top_vendidas', {fotos:fotos})
        })
    },
};

