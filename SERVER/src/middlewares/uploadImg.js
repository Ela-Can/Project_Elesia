import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileTypeFromBuffer } from "file-type";

export default async (req, res, next) => {
    try {

        console.log("Fichier reçu :", req.files?.image); // Pour vérifier si un fichier est présent
        console.log("Chemin enregistré :", req.body.image);

        const folder = req.params.folder;
        if (!folder) {
            throw new Error("No folder specified");
        }


        if (!req.files || !req.files.image) {
            console.log("Aucun fichier téléchargé. Image existante utilisée.");
            return next(); 
        }   

        const file = req.files.image;
    
        const maxSize = 2 * 1024 * 1024; // 2 Mo
        if (file.size > maxSize) {
            console.error("File size exceeds the 2MB limit.");
            throw new Error("The file size exceeds the 2MB limit");
        }
        
        if (file && file.name) {
            const fileExtension = path.extname(file.name).toLowerCase();
        } else {
            console.log("Le fichier ou son nom est indéfini");
            throw new Error("Fichier non valide");
        }

        const validExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

        const fileExtension = path.extname(file.name).toLowerCase();

        
        const buffer = file.data;
        const type = await fileTypeFromBuffer(buffer);

        if (!type || !validExtensions.includes(`.${type.ext}`)) {
            console.error("Invalid file type detected during upload.");
        throw new Error("Invalid file type detected during upload");
        }

        const fileName = `${uuidv4()}${fileExtension}`;
        const uploadPath = path.join(process.cwd(), 'public', 'img', folder, fileName);

        await file.mv(uploadPath);

        req.body.image = `/img/${folder}/${fileName}`;
        
        next();

    } catch (err) {
        console.error('Error in file upload middleware:', err);
        next(err); 
    }
};