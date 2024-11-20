import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileTypeFromBuffer } from "file-type";

export default async (req, folder) => {
    try {

        //console.log('Request body at start:', req.body);
        //console.log('Request files at start:', req.files);

        if (!folder) {
            console.error("No folder specified.");
            throw new Error("No folder specified");
        }


        if (req.files && req.files.image) {
            console.log("Fichier reçu :", req.files.image);  
        } else {
            console.log("Aucun fichier reçu");
            throw new Error("No file uploaded");
        }

        const file = req.files.image;
    
        const maxSize = 2 * 1024 * 1024; // 2 Mo
        if (file.size > maxSize) {
            console.error("File size exceeds the 2MB limit.");
            throw new Error("The file size exceeds the 2MB limit");
        }
        
        if (file && file.name) {
            const fileExtension = path.extname(file.name).toLowerCase();
            console.log("Extension du fichier :", fileExtension);
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
        console.log("Chemin de destination :", uploadPath);

        await file.mv(uploadPath);
        console.log('File successfully moved to:', uploadPath);

        //req.body.image = `/img/${folder}/${fileName}`;
            
        //console.log("Chemin de l'image ajouté à req.body.image :", req.body.image);

        return `/img/${folder}/${fileName}`;

    } catch (err) {
        console.error('Error in file upload middleware:', err);
        throw err;
    }
};