import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.get('token');
  jwt.verify(token, process.env.SEED, (err, decoded )=>{
    if(err){
      return res.status(401).json({
        ok:false,
        err:{
          message: 'Token no valid'
        }
      });
    }
    req.user = decoded.user;
    next();
  });  
}

/* Verifica ADMIN_ROLE */
const verificaADMIN_ROLE = (req, res, next) => {
  const user = req.user;
  if(user.role !== 'ADMIN_ROLE'){
    return res.json({
      ok:false,
      err:{
        message: 'El user no es administrador'
      }
    });
  }
  next();
}

export { 
  verifyToken,
  verificaADMIN_ROLE
}