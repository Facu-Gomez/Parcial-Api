const mongoose = require('mongoose');

const juegosSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
      required: true,
    },
    // Agregar una referencia a la empresa propietaria
    empresa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Empresa'
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ModelJuegos = mongoose.model('Juegos', juegosSchema);
module.exports = ModelJuegos;
