// exportamos las librerias para el servidor
const express = require('express');
const cors = require('cors');
const { subirDatos, obtenerDatos, conexion } = require('./database.config');

const app = express();

app.use(express.json())
app.use(cors());

app.listen(5000, () => console.log(''));


app.get('/', (req, res) => {
    obtenerDatos(conexion, (response) => res.json(response));
})

app.post('/',(req,res) =>{
    const datos = req.body
    console.log(datos)
    subirDatos(conexion,datos.nombre,(response) => res.json(response));
})