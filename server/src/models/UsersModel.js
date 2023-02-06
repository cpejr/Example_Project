import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import ROLES_LIST from '../config/rolesList.js';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    cpf: {
      type: String,
      require: true,
      unique: true,
    },
    role: {
      type: Number,
      default: ROLES_LIST.USER,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  const user = this;
  const saltFactor = 10;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(saltFactor, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
