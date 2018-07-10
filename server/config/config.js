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
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ====================
// Fecha de expiracion
// ====================

process.env.EXP = 60 * 60 * 24 * 30;

// ====================
// Seed de Jwt
// ====================

process.env.SEED = process.env.SEED || 'este-es-mi-seed-desarrollo';