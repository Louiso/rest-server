import mongoose , { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const rolesValidos = {
  values: ['ADMIN_ROLE','USER_ROLE'],
  message: '{VALUE} no es un role valido'
}

const UserSchema = new Schema({
  username:{
    type: String,
    required: [ true , 'El nombre de usuario es necesario']
  },
  email:{
    type: String,
    required: [ true , 'El correo es necesario'],
    unique: true
  },
  password: {
    type: String,
    required: [ true , 'La contraseña es necesaria']
  },
  img:{
    type: String,
    required: false
  },
  role:{
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  status:{
    type: Boolean,
    default: true
  },
  google:{
    type: Boolean,
    default: false
  }
});

UserSchema.methods.toJSON = function(){
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject; 
}

UserSchema.plugin( uniqueValidator , { message: '{PATH} debe ser unico'});

const User = mongoose.model('User',UserSchema);

export default User;