import {
  Router
} from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import jwt from 'jsonwebtoken';

import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.CLIENT_ID);


const loginRoute = Router();

loginRoute.post('/login', (req, res) => {

  const {
    body
  } = req;

  User.findOne({
    email: body.email
  }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!userDB) {
      return res.status(500).json({
        ok: false,
        err: {
          message: "(Usuario) o contraseña incorrectos"
        }
      });
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario o (contraseña) incorrectos"
        }
      });
    }
    
    const token = jwt.sign({
      user: userDB
    },process.env.SEED,{ expiresIn: process.env.EXP } );
    

    res.json({
      ok: true,
      user: userDB,
      token
    });
  });
});

// Configuraciones de google
async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  return {
    username: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true
  }
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}

loginRoute.post('/google',async (req,res)=>{
  try{
    /* BUSCA ALGUN USUARIO DE GOOGLE */
    const googleUser = await verify(req.body.idtoken);
    /* VERIFICAMOS SI TENEMOS DICHO USUARIO DENTRO DE NUESTRA BASE DE DATOS */
    User.findOne({ email: googleUser.email } , (err, userDB )=>{
      /* HUBO UN ERROR EN LA BASE DE DATOS Y NO SE PUDO BUSCAR */
      if(err){
        return res.status(500).json({
          ok: false,
          err
        });
      }
      /* ENCONTRO EL USUARIO EN LA BASE DE DATOS, POR LO TANTO DEBE DE HACER LOGIN NOMAS */
      if(userDB){
        /* SI EL USUARIO YA ANTES SE HABIA CREADO SU CUENTA MEDIANTE LA FORMA NORMAL, YA NO LO PUEDE HACER POR EL
        BOTON DE GOOGLE */
        if(!userDB.google){
          return res.status(400).json({
            ok: false,
            err: {
              message: 'Debe de usar su authentificacion normal'
            }
          });
        }else{
          /* SI EL USUARIO SE LOGEA COMO LO HIZO LA PRIMERA VEZ */
          let token = jwt.sign({
            user: userDB
          }, process.env.SEED, { expiresIn : process.env.EXP});
          res.json({
            ok: true,
            user: userDB,
            token
          });
        }
      }else{
        /* SI EL USUARIO NO ESTA EN LA BASE DE DATOS ENTONCES SE DEBE CREAR DICHO USUARIO */
        const user = new User();
        console.log(googleUser);
        user.username = googleUser.username;
        user.email = googleUser.email;
        user.img = googleUser.img;
        user.google = true;
        user.password = ':)';
        user.save((err, userDB)=>{
          if(err){
            return res.status(500).json({
              ok: false,
              err
            });
          }
    
          let token = jwt.sign({
            user: userDB
          }, process.env.SEED, { expiresIn : process.env.EXP});
          res.json({
            ok: true,
            user: userDB,
            token
          });
        });
      }
    });
  }catch(e){
    return res.status(403).json({
      ok:false,
      err: e
    });
  }
});

export default loginRoute;