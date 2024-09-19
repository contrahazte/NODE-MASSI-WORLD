import { Router } from 'express';
import { getAll, getOneById, create, updateById, deleteById } from '../controllers/planetsController';
import upload from '../utils/multer-config'; // Importa la configuración de multer
import db from '../db'; // db importa la configuración de pg-promise

const router = Router();

router.get('/', getAll);
router.get('/:id', getOneById);
router.post('/', create);
router.put('/:id', updateById);
router.delete('/:id', deleteById);


// Ruta para subir una imagen
router.post('/:id/image', upload.single('image'), async (req, res) => {
    const planetId = req.params.id;
    const imagePath = req.file?.path;
  
    if (!imagePath) {
      return res.status(400).send('No se ha subido ninguna imagen');
    }
  
    // Normaliza la ruta a barras diagonales
    imagePath = imagePath.replace(/\\/g, '/');

    try {
    // Actualiza la imagen del planeta en la base de datos
      await db.none('UPDATE planets SET image=$1 WHERE id=$2', [imagePath, planetId]);
      res.status(200).send('Imagen subida correctamente');
    } catch (error) {
      console.error('Error al actualizar la imagen del planeta:', error);
      res.status(500).send('Error al subir la imagen');
    }
  });
  


export default router;
