import envs from '@/config/envs';
import { NextFunction, Request, Response } from 'express';
import formidable, { Files } from 'formidable';
import fs from 'fs';
import path from 'path';

// Ruta para manejar la subida de archivos
const FileUpload = (req: Request, res: Response, next: NextFunction) => {
  const uploadDir = path.join('./', envs.UPLOAD_DIR);

  console.log('subiendo archivo en:', uploadDir);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir: uploadDir,
    keepExtensions: true,
    multiples: true,
  });

  //form.parse(req, (err: Error | null, fields: Fields, files: Files) => {
  form.parse(req, (err: Error | null, _, files: Files) => {
    if (err) {
      next(err); // Manejar errores si los hay
      return;
    }

    // Obtener el archivo o archivos
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadedFiles: any[] = [];

    Object.keys(files).forEach((key) => {
      const file = files[key] as formidable.File | formidable.File[]; // Puede ser un array si son múltiples archivos

      if (Array.isArray(file)) {
        file.forEach((f) => uploadedFiles.push(f));
      } else {
        uploadedFiles.push(file);
      }
    });

    // Crear URLs de los archivos subidos
    const fileUrls = uploadedFiles.map((file) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fileUrl: `${req.protocol}://${req.get('host')}/uploads/${path.basename((file as any).newFilename)}`,
      };
    });

    // Responder con la URL de los archivos subidos
    res.json({ fileUrls });
  });
};

export default FileUpload;
