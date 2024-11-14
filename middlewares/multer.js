// multerConfig.
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isPDF = file.mimetype === 'application/pdf';
    return {
      folder: 'profile_uploads',
      allowed_formats: ['jpg', 'png', 'pdf'],
      resource_type: isPDF ? 'raw' : 'image', 
      
    };
  }
});

export const upload = multer({ 
    storage:storage,
    limits: {
        fileSize: 1024 * 1024, // 5 MB
      },
 });
 const Companystorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'company_logo', 
    allowed_formats: ['jpg', 'png', 'pdf'], 
  },
});
export const Companyupload = multer({ 
  storage:Companystorage,
  limits: {
      fileSize: 1024 * 1024, // 5 MB
    },
});


