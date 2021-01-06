'use strict'

var mongoose = require('mongoose');
var app = require('./app'); // Incorpora la instancia de express
var port = 3800; // Puerto para ejecutarlo

// Anexar al código
mongoose.set('useFindAndModify', false);

// Conexion a la bases de datos en la PC de Itconectas
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mean_social', {useMongoClient:true}).then(
    () => { console.log("La conexión a la bases de datos curso_mean_social se ha realizado correctamente"),

app.listen(port, () => {console.log("Servidor corriendo en http://localhost:3800");});
}).catch(err => console.log(err)); 

/*
mongoose.connect('mongodb://localhost:27017/curso-mean-social', {useMongoClient:true}).then(
    () => { console.log("La conexión a la bases de datos curso_mean_social se ha realizado correctamente"),

app.listen(port, () => {console.log("Servidor corriendo en http://localhost:3800");});
}).catch(err => console.log(err));
*/