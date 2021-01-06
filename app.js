'use strict'

let express = require('express');
let bodyParser = require('body-parser');

let app = express();




// Cargar las rutas
let user_routes = require('./routes/user');
let follow_routes = require('./routes/follow');
let publication_routes = require('./routes/publication');
let message_routes = require('./routes/message');

// Middlewares un control que se ejecuta antes de cargar un modulo
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cors
// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});


// Rutas -> http://localhost:3800/api/home
app.use('/api', user_routes);
app.use('/api', follow_routes);
app.use('/api', publication_routes);
app.use('/api', message_routes);

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



// app.get("/", (req, res) => {res.status(200).send({message: 'Hola mundo desde el servidor de NodeJs'}); });
// app.get("/pruebas", (req, res) => {console.log(req.body); res.status(200).send({message: 'Acción de pruebas en el servidor de NodeJs'}); });
// Exportar
module.exports = app;