const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    email: {
      type: String,

    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ModelUser = mongoose.model('User', usersSchema);
module.exports = ModelUser;
