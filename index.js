// exportamos las librerias para el servidor
const express = require('express');
const mysql = require('mysql');

//Cors permite conectar usuarios de ips distintas a la del servidor
const cors = require('cors');


// creamos el servidor
const app = express();


//middlewares
app.use(express.json())
app.use(cors());


//Estableciendo el puerto a usar
app.listen(5000, () => console.log('http://localhost:5000'));




//Configuracion de mysql para poder conectarse
const conexion = mysql.createConnection({
    user: 'root',
    password: 'root',
    database: 'sakila',
    host: 'localhost'
})


//Conectamos a mysql
conexion.connect(function (err, conn) {
    if (err) throw err;
    console.log('Conectado a la bd');
});


//Operaciones de la base de datos
function obtenerDatos(con, callback) {
    con.query('Select * from language', (err,response) => {
        if (err) throw err;
        callback(response);
    })
}

function subirDatos(con,nombre,fecha, callback) {
    con.query(`INSERT languaje VALUES language('${nombre}','${fecha}')`, (err,response) => {
        if (err) throw err;
        callback(response);
    })
}


//Metodos de comunicacion a travez de http


//Get se usa para obtener los datos en e cliente
app.get('/', (req, res) => {
    obtenerDatos(conexion, (response) => res.json(response));
})


//Ingresamos datos a la API
app.post('/:id',(req,res) =>{
    const datos = req.body
    subirDatos(conexion,datos.nombre,datos.fecha,(response) => res.json(response));
})