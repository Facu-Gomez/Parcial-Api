const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ModelEmpresa = mongoose.model('Empresa', empresaSchema);
module.exports = ModelEmpresa;
