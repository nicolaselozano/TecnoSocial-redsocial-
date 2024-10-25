import con from '../../config/database'; // Asegúrate de importar correctamente tu conexión a la base de datos
import { Message } from './messageEntity';

export const messageRepository = con.getRepository(Message);
