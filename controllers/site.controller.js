const Site = require("../models/site.model.js");

const getSites = async (req, res) => {
  try {
    const sites = await Site.find({});
    res.status(200).json(sites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSite = async (req, res) => {
  try {
    const { id } = req.params;
    const site = await Site.findById(id);
    res.status(200).json(site);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSite = async (req, res) => {
  try {
    const site = await Site.create(req.body);
    res.status(200).json(site);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSite = async (req, res) => {
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
};

const deleteSite = async (req, res) => {
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
};

module.exports = {
  getSites,
  getSite,
  createSite,
  updateSite,
  deleteSite,
};