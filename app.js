const express = require('express');
const dbconnect = require('./config');
const ModelJuegos = require('./models/juegos');
const ModelEmpresa = require('./models/empresas');
const ModelCategoria = require('./models/categoria');
const ModelUser = require('./models/users');

const app = express();

const router = express.Router(); 

//Ruta para juegos
router.post('/juegos', async (req, res) => {
    const body = req.body;
    try {
      const respuesta = await ModelJuegos.create(body);
      res.status(201).json(respuesta); // 201 significa "Created"
    } catch (error) {
      res.status(400).json({ error: 'Solicitud incorrecta o error de validación' });
    }
  });

router.get('/juegos', async (req, res) => {
    const respuesta = await ModelJuegos.find({})

    res.send(respuesta);
});

router.get('/juegos/id', async (req, res) => {
    const id = req.params.id; 
    const respuesta = await ModelJuegos.findById({id})
    res.send(respuesta);
});

router.put('/juegos/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    try {
      const respuesta = await ModelJuegos.findOneAndUpdate({ _id: id }, body);
      if (respuesta) {
        res.json(respuesta);
      } else {
        res.status(404).json({ error: 'Juego no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Solicitud incorrecta o error de validación' });
    }
  });

  router.delete('/juegos/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const respuesta = await ModelJuegos.deleteOne({ _id: id });
      if (respuesta.deletedCount > 0) {
        res.json({ message: 'Juego eliminado exitosamente' });
      } else {
        res.status(404).json({ error: 'Juego no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Solicitud incorrecta o error de validación' });
    }
  });

//Ruta para empresas
router.post('/empresas', async (req, res) => {
    const body = req.body;
    try {
      const respuesta = await ModelEmpresa.create(body);
      res.status(201).json(respuesta);
    } catch (error) {
      res.status(400).json({ error: 'Solicitud incorrecta o error de validación' });
    }
  });
  
  router.get('/empresas', async (req, res) => {
      const respuesta = await ModelEmpresa.find({})
  
      res.send(respuesta);
  });
  
  router.get('/empresas/id', async (req, res) => {
      const id = req.params.id; 
      const respuesta = await ModelEmpresa.findById({id})
      res.send(respuesta);
  });
  
  router.put('/empresas/id', async (req, res) => {
      const body = req.body;
      const id = req.params.id; 
      const respuesta = await ModelEmpresa.findOneAndUpdate({_id: id}, body)
      res.send(respuesta);
  });
  
  router.delete('/empresas/id', async (req, res) => {
      const body = req.body;
      const id = req.params.id; 
      const respuesta = await ModelEmpresa.deleteOne({_id: id})
      res.send(respuesta);
  });


  //Ruta para categorias
  router.post('/categorias', async (req, res) => {
    const body = req.body;
    try {
      const respuesta = await ModelCategoria.create(body);
      res.status(201).json(respuesta);
    } catch (error) {
      res.status(400).json({ error: 'Solicitud incorrecta o error de validación' });
    }
  });
  
  router.get('/categoria', async (req, res) => {
      const respuesta = await ModelCategoria.find({})
  
      res.send(respuesta);
  });
  
  router.get('/categoria/id', async (req, res) => {
      const id = req.params.id; 
      const respuesta = await ModelCategoria.findById({id})
      res.send(respuesta);
  });
  
  router.put('/categoria/id', async (req, res) => {
      const body = req.body;
      const id = req.params.id; 
      const respuesta = await ModelCategoria.findOneAndUpdate({_id: id}, body)
      res.send(respuesta);
  });
  
  router.delete('/categoria/id', async (req, res) => {
      const body = req.body;
      const id = req.params.id; 
      const respuesta = await ModelCategoria.deleteOne({_id: id})
      res.send(respuesta);
  });

  //Ruta para users
router.post('/users', async (req, res) => {
    const body = req.body;
    const respuesta = await ModelEmpresa.create(body);
    res.send(respuesta);
  });
  
  router.get('/users', async (req, res) => {
      const respuesta = await ModelEmpresa.find({})
  
      res.send(respuesta);
  });
  
  router.get('/users/id', async (req, res) => {
      const id = req.params.id; 
      const respuesta = await ModelEmpresa.findById({id})
      res.send(respuesta);
  });
  
  router.put('/users/id', async (req, res) => {
      const body = req.body;
      const id = req.params.id; 
      const respuesta = await ModelEmpresa.findOneAndUpdate({_id: id}, body)
      res.send(respuesta);
  });
  
  router.delete('/users/id', async (req, res) => {
      const body = req.body;
      const id = req.params.id; 
      const respuesta = await ModelEmpresa.deleteOne({_id: id})
      res.send(respuesta);
  });


  router.put('/juegos/:id/categoria/:categoriaId', async (req, res) => {
    const juegoId = req.params.id;
    const categoriaId = req.params.categoriaId;
  
    try {
      const juego = await ModelJuegos.findById(juegoId);
      const categoria = await ModelCategoria.findById(categoriaId);
  
      if (!juego || !categoria) {
        return res.status(404).json({ message: 'Juego o categoría no encontrado' });
      }
  
      // Asignar la categoría al juego y agregar el juego a la lista de juegos de la categoría
      juego.category = categoria._id;
      categoria.juegos.push(juego._id);
  
      await juego.save();
      await categoria.save();
  
      return res.json({ message: 'Categoría asignada al juego con éxito' });
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Ruta para obtener todos los juegos de una categoría
  router.get('/categoria/:categoriaId/juegos', async (req, res) => {
    const categoriaId = req.params.categoriaId;
  
    try {
      const categoria = await ModelCategoria.findById(categoriaId).populate('juegos');
  
      if (!categoria) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
  
      const juegos = categoria.juegos;
  
      return res.json(juegos);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  // Ruta para asignar una empresa a un juego
router.put('/juegos/:id/empresa/:empresaId', async (req, res) => {
    const juegoId = req.params.id;
    const empresaId = req.params.empresaId;
  
    try {
      const juego = await ModelJuegos.findById(juegoId);
      const empresa = await ModelEmpresa.findById(empresaId);
  
      if (!juego || !empresa) {
        return res.status(404).json({ message: 'Juego o empresa no encontrado' });
      }
  
      // Asignar la empresa al juego
      juego.empresa = empresa._id;
      await juego.save();
  
      return res.json({ message: 'Empresa asignada al juego con éxito' });
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Ruta para obtener todos los juegos de una empresa
  router.get('/empresa/:empresaId/juegos', async (req, res) => {
    const empresaId = req.params.empresaId;
  
    try {
      const juegos = await ModelJuegos.find({ empresa: empresaId });
  
      return res.json(juegos);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  

app.use(express.json());
app.use(router);

app.listen(4444, () => {
  console.log("El servidor está en el puerto 4444");
});

dbconnect();
