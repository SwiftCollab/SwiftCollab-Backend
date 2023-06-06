const Inventory = require("../models/Inventory");

// Create Inventory Item
exports.createInventoryItem = async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.status(201).send({ inventory });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Update Inventory Item
exports.updateInventoryItem = async (req, res) => {
  const _id = req.params.id;
  try {
    const inventory = await Inventory.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
    if (!inventory) {
      return res.status(404).send();
    }
    res.send({ inventory });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete Inventory Item
exports.deleteInventoryItem = async (req, res) => {
  const _id = req.params.id;
  try {
    const inventory = await Inventory.findByIdAndDelete(_id);
    if (!inventory) {
      return res.status(404).send();
    }
    res.send({ inventory });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get All Inventory Items
exports.getAllInventoryItems = async (req, res) => {
  try {
    const inventory = await Inventory.find({});
    res.send({ inventory });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get inventory item by ID
exports.getInventoryItemById = async (req, res) => {
    const _id = req.params.id;
    try {
      const inventory = await Inventory.findById(_id);
      if (!inventory) {
        return res.status(404).send();
      }
      res.send({ inventory });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
