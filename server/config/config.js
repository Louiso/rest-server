// ====================
// PUERTO
// ====================

process.env.PORT = process.env.PORT || 3000;

// ====================
// Entorno
// ====================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ====================
// Base de datos
// ====================

let urlDB;
if(process.env.NODE_ENV === 'dev'){
  urlDB = 'mongodb://127.0.0.1:27017/cafe';
}else{
  urlDB = 'mongodb://admin:159753mierda@ds231991.mlab.com:31991/cafe-pro';
}

process.env.URLDB = urlDB;