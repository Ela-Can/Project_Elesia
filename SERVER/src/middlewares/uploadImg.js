import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileTypeFromBuffer } from "file-type";

export default async (req, res, next) => {
    try {

        const folder = req.params.folder;
        if (!folder) {
            return res.status(400).json({ error: "No folder specified" });
        }


        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "No file uploaded. Existing image used." });
        }   

        const file = req.files.image;
    
        const maxSize = 2 * 1024 * 1024; // 2 Mo
        if (file.size > maxSize) {
            return res.status(400).json({ error: "The file size exceeds the 2MB limit" });
        }
        
        if (file && file.name) {
            const fileExtension = path.extname(file.name).toLowerCase();
        } else {
            return res.status(400).json({ error: "Invalid file: File name is missing" });
        }

        const validExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

        const fileExtension = path.extname(file.name).toLowerCase();

        
        const buffer = file.data;
        const type = await fileTypeFromBuffer(buffer);

        if (!type || !validExtensions.includes(`.${type.ext}`)) {
            return res.status(400).json({ error: "Invalid file type detected during upload" });
        }

        const fileName = `${uuidv4()}${fileExtension}`;
        const uploadPath = path.join(process.cwd(), 'public', 'img', folder, fileName);

        await file.mv(uploadPath);

        req.body.image = `/img/${folder}/${fileName}`;
        
        next();

    } catch (err) {
        return res.status(500).json({ error: "Error in file upload middleware", details: err.message });
    }
};