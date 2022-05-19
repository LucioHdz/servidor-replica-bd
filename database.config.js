const mysql = require('mysql');


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
    console.log('Corriendo');
});


//Operaciones de la base de datos
function obtenerDatos(con, callback) {
    con.query('Select * from category', (err,response) => {
        if (err) throw err;
        callback(response);
    })
}

function subirDatos(con,nombre, callback) {
    con.query(`INSERT category(name,last_update) VALUES ('${nombre}',NOW())`, (err,response) => {
        if (err) throw err;
        callback(response);
    })
}



module.exports = {obtenerDatos,subirDatos,conexion}