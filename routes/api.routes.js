const express = require("express");
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { Site, getRandomSite } = require("../models/site.model.js");

router.get("/sites/random", async (req, res) => {
  try {
    const site = await getRandomSite();
    if (site) {
      res.json(site); 
    } else {
      res.status(404).json({ message: "No random site found" });
    }
  } catch (eerrorrr) {
    res.status(500).json({ message: "Error fetching random site" });
  }
});

router.get('/sites/:id/image', async (req, res) => {
  try {
      const site = await Site.findById(req.params.id);

      if (!site || !site.image) {
          return res.status(404).send('Image not found');
      }

      res.set('Content-Type', 'image/jpeg');
      res.send(site.image);
  } catch (err) {
      res.status(500).send('Error retrieving image');
  }
});

router.get('/sites/', async (req, res) => {
  try {
    const sites = await Site.find({});
    res.status(200).json(sites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/sites/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const site = await Site.findById(id);
    res.status(200).json(site);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/sites/", upload.single('image'), async (req, res) => {
  try {

    const site = new Site({
        name: req.body.name,
        url: req.body.url,
        author: req.body.author,
        github: req.body.github,
        image: req.file.buffer,
        approved: false,
    });
    
    await site.save();
    
    res.status(200).json(site);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/sites/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const site = await Site.findByIdAndUpdate(id, req.body);
  
    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }
  
    const updatedSite = await Site.findById(id);
    res.status(200).json(updatedSite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/sites/:id", async (req, res) => {
  try {
    const { id } = req.params;
  
    const site = await Site.findByIdAndDelete(id);
  
    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }
  
    res.status(200).json({ message: "Site deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;