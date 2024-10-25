import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

export const uploadImage = async (imageFile) => {
    try {

        const response = await fetch(`${APIDOMAIN}/api/v1/fileupload`, {
            method: 'POST',
            body: imageFile
        })

        const data = await response.json(); // Asegúrate de convertir la respuesta a JSON

        console.log(data); // URLs de los archivos subidos
        return data;
        
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        return error;
    }
}

