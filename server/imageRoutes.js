const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the schema and model for saved images with timestamps
const savedImageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true }); // Ensure timestamps are enabled

const SavedImage = mongoose.model('SavedImage', savedImageSchema);

// Endpoint to save an image
router.post('/saveImage', async (req, res) => {
  const { userId, imageUrl } = req.body;
  const newSavedImage = new SavedImage({ userId, imageUrl });

  try {
    await newSavedImage.save();
    res.status(200).json({ message: 'Image saved successfully' });
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ message: 'Error saving image', error: error.message });
  }
});

// Endpoint to get saved images for a user
router.get('/savedImages/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const savedImages = await SavedImage.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(savedImages);
  } catch (error) {
    console.error('Error fetching saved images:', error);
    res.status(500).json({ message: 'Error fetching saved images', error: error.message });
  }
});

module.exports = router;
