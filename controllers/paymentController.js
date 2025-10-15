import * as paymentDAO from '../dataAccess/paymentDAO.js'
import { AppError } from '../utils/appError.js'

//nos llega una cantidad y una moneada
const createPayment = async (req, res) => {
    // como es post sera desde el body 
    const { amount, currency } = req.body;
    // validacion
    if (amount <= 0 || !amount ){
        throw new AppError('El monto debe ser mayor a 0', 400);
    }
    //ya validado le decimos a la dao q me cree el payment y lo guardo
    const payment = await paymentDAO.createPayment(amount, currency);
    //lo pongo en un json el link y lo devuelvo como respuesta
    res.json({paymentLink: `http://localhost:3000/payment.html?paymentid=${payment._id}`});
}

//es un put, en este caso solo usaresmos los datos de la url ya q le decimos que ese especifico se proceso, si necesitariamos mas ahi seria
//por el body de ese
const processPayment = async (req, res) => {
    // solo le decimos a la dao q lo ponga como completado
    const payment = await paymentDAO.updatePaymentStatus(req.params.id, 'completed');
    //y devolvemos coqueto
    res.json({message: 'Pago procesado', payment});
}

//
const getPayment = async (req, res) => {
    const payment = await paymentDAO.getPaymentById(req.params.id);

    if(!payment){
        throw new AppError("No se encontro el pago", 404);
    }
    res.json(payment);
}

export { createPayment, getPayment, processPayment }