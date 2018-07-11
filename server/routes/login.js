import {
  Router
} from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import jwt from 'jsonwebtoken';

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

export default loginRoute;