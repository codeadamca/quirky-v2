const express = require("express");
const Site = require("../models/site.model.js");
const router = express.Router();
const {getSites, getSite, createSite, updateSite, deleteSite} = require('../controllers/site.controller.js');

router.get('/sites/', getSites);
router.get("/sites/:id", getSite);
router.post("/sites/", createSite);
router.put("/sites/:id", updateSite);
router.delete("/sites/:id", deleteSite);

module.exports = router;