import {
  Router
} from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';

import _ from 'underscore';

const userRoute = Router();

userRoute.get('/usuario', (req, res) => {

  const from = Number(req.query.from) || 0;
  const limit = Number(req.query.limit) || 5;

  const query = { status: true };
  User.find(query, 'username email role status google img')
    .skip(from)
    .limit(limit)
    .exec((err,usuarios)=>{
      if(err){
        return res.status(400).json({
          ok: false,
          err
        });
      }

      User.count(query,(err, total)=>{

        res.json({
          ok: true,
          usuarios,
          total
        });

      });
    });
});

userRoute.post('/usuario', (req, res) => {
  const {
    body
  } = req;

  const user = new User({
    username: body.username,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10 ),
    role: body.role
  });

  user.save((err, userDB)=>{

    res.json({
      ok: true,
      user: userDB
    });
  });
  
});

userRoute.put('/usuario/:id', (req, res) => {
  
  const id = req.params.id;
  const body = _.pick(req.body, ['nombre','email','img','role','estado']);

  User.findByIdAndUpdate(id, body, { new: true, runValidators : true } ,(err, userDB)=>{
    if(err){
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      user: userDB
    });
  });
});

userRoute.delete('/usuario/:id', (req, res) => {
  
  const { id } = req.params;

  const fieldUpdated = {
    status: false
  };

  // User.findByIdAndRemove(id, (err, userDeleted)=>{
  
  User.findByIdAndUpdate(id, fieldUpdated , { new: true } ,(err, userDeleted)=>{
    if(err){
      return res.status(400).json({
        ok: false,
        err
      });
    }

    if(!userDeleted){
      return res.status(400).json({
        ok: false,
        err: {
          message: 'User not found'
        }
      });
    }

    res.json({
      ok: true,
      user: userDeleted
    });
  });

});

export default userRoute;