import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const farmerSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'First name must be at least 3 characters long'],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, 'Last name must be at least 3 characters long'],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Last name must be at least 3 characters long'],
  },
  password: {
    type: String,
    required: true,
    select: false,    // this ensures that password is hidden by default whenever a farmer query is made
  },
  // this is used for live-tracking of farmer
  socketId: {
    type: String,
  },
});

farmerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};

farmerSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

farmerSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const Farmer = mongoose.model('farmers', farmerSchema);

export default Farmer;
