'use strict'

let express = require('express');
let MessageController = require('../controllers/message');
let api = express.Router();

let md_auth = require('../middlewares/authenticate');

api.get('/probando-mb', md_auth.ensureAuth, MessageController.probando);
api.post('/message', md_auth.ensureAuth, MessageController.saveMessage);
api.get('/my-messages/:page?', md_auth.ensureAuth, MessageController.getReceivedMessage);
api.get('/messages/:page?', md_auth.ensureAuth, MessageController.getEmitMessages);
api.get('/unviewed-messages', md_auth.ensureAuth, MessageController.getUnviewedMessages);
api.get('/set-viewed-messages', md_auth.ensureAuth, MessageController.setViewedMessages);

module.exports = api;