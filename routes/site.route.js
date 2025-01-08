const express = require("express");
const Site = require("../models/site.model.js");
const router = express.Router();
const {getSites, getSite, createSite, updateSite, deleteSite} = require('../controllers/site.controller.js');

router.get('/', getSites);
router.get("/:id", getSite);
router.post("/", createSite);
router.put("/:id", updateSite);
router.delete("/:id", deleteSite);

module.exports = router;