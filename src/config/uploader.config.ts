import fs from "fs";
import multer from "multer";
import path from "path";

const multerStorage = (destination: any, allowedTypes = /jpeg|jpg|png|webp/) => {
  // create the destination directory if is doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  // multer configs
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },

    filename: (req, file, cb) => {
      const unique = Date.now() * Math.floor(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${unique}${ext}`);
    },
  });

  const fileFilter = (req: any, file: any, cb: any) => {
    // allow extension
    if (allowedTypes.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  };

  const uploader = multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter,
  });

  return uploader;
};

export default multerStorage;
