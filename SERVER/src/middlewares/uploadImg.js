import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileTypeFromBuffer } from "file-type";

export default async (req, res, next) => {
    try {
        const saveFolder = req.params.folder;

        if (!saveFolder) {
            return res.status(400).json({ msg: "No folder specified" });
        }

        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        let file;

        if (req.files && req.files.image) {
            console.log(req.files);
            file = req.files.image;
        }

        if (!file) {
            return res.status(400).json({ msg: "No image file found" });
        }

        const maxSize = 2 * 1024 * 1024; // 2 Mo
        if (file.size > maxSize) {
            return res.status(400).json({ msg: "The file size exceeds the 2MB limits" });
        }

        const validExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
        const fileExtension = path.extname(file.name).toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
            return res.status(400).json({ msg: "Format not File format not allowed. Please upload a valid image file !" });
        }

        const buffer = file.data;
        const type = await fileTypeFromBuffer(buffer);

        if (!type || !validExtensions.includes(`.${type.ext}`)) {
            return res.status(400).json({ msg: "An error occurred during the file upload." });
        }

        const fileName = `${uuidv4()}${fileExtension}`;
        const uploadPath = path.join(process.cwd(), 'public', 'img', saveFolder, fileName);

        await file.mv(uploadPath);

        req.body.image = `/img/${saveFolder}/${fileName}`;
        next();

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "A mistake happened" });
    }
};