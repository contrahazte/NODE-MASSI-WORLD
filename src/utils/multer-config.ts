import multer from 'multer';
import path from 'path';

// Configura el almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Renombrar el archivo
  }
});

const upload = multer({ storage });

export default upload;
