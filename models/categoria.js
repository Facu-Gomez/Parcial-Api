const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // El campo name es obligatorio
    },
    juegos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Juegos',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ModelCategoria = mongoose.model('Categoria', categoriaSchema);
module.exports = ModelCategoria;
