'use strict'

let moment = require("moment");
let mongoosePaginate = require('mongoose-pagination');

let User = require('../models/user');
let Follow = require('../models/follow');
let Message = require('../models/message');

function probando(req, res){
    res.status(200).send({message: 'Esto es una prueba desde Mensaje'});
}//end-test


function saveMessage(req, res){
    let params = req.body;

    if(!params.text || !params.receiver){
        res.status(200).send({message: 'Es importante llenar los campos necesarios'});
    }

    let message = new Message();

    message.emitter = req.user.sub;
    message.receiver = params.receiver;
    message.text = params.text;
    message.created_at = moment().unix();

    message.viewed = 'false';

    message.save((err, messageStored) => {
        if(err) res.status(500).send({message: 'Error en la perticion'});
        if(!messageStored) res.status(200).send({message: 'Error al enviar el mensaje'});
        return res.status(200).send({message: messageStored});
    });

}//end-enviar-message


function getReceivedMessage(req, res){
    let userId = req.user.sub;

    let page = 1;
    if(req.params.page){
        page = req.params.page;
    }
    let itemsPerPage = 4;
    Message.find({receiver: userId}).populate('emitter', 'name surname image nick _id').sort('-created_at').paginate(page, itemsPerPage, (err, messages, total) => {
        if(err) res.status(500).send({message: 'Error en la perticion'});
        if(!messages) res.status(200).send({message: 'No hay mensajes'});
        return res.status(200).send({
            total: total,
            pages: Math.ceil(total/itemsPerPage),
            messages});
    });
}


function getEmitMessages(req, res){
    let userId = req.user.sub;

    let page = 1;
    if(req.params.page){
        page = req.params.page;
    }
    let itemsPerPage = 4;
    Message.find({emitter: userId}).populate('emitter receiver', 'name surname image nick _id').sort('-created_at').paginate(page, itemsPerPage, (err, messages, total) => {
        if(err) res.status(500).send({message: 'Error en la perticion'});
        if(!messages) res.status(200).send({message: 'No hay mensajes'});
        return res.status(200).send({
            total: total,
            pages: Math.ceil(total/itemsPerPage),
            messages});
    });
}//end-function


function getUnviewedMessages(req, res){
    let userId = req.user.sub;
    Message.count({receiver: userId, viewed: 'false'}).exec((err, count) => {
        if(err) res.status(500).send({message: 'Error en la perticion'});
        return res.status(200).send({
            'unviewed':count
        });
    });

}//end-function

function setViewedMessages(req, res){
    let userId = req.user.sub;
    Message.update({receiver: userId, viewed:'false'}, {viewed:'true'}, {'multi':true}, (err, messageUpdated) => {
        if(err) res.status(500).send({message: 'Error en la perticion'});
        return res.status(200).send({messages: messageUpdated});
    });
}//end-function

module.exports = {
    probando, saveMessage, getReceivedMessage, getEmitMessages, getUnviewedMessages, setViewedMessages
}//end-functions