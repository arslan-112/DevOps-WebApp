const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure that the file is saved in the 'public/uploads' directory
    cb(null, path.join(__dirname, "..", "public", "uploads")); // path.join ensures correct path across OS
  },
  filename: (req, file, cb) => {
    // Save the file with a timestamp to avoid name collisions
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only images are allowed"), false); // Reject the file
  }
};

// Create multer instance
const upload = multer({ storage, fileFilter });

module.exports = upload;
