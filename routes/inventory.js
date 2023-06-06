const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { checkRole } = require("../middlewares/role");
const inventoryController = require("../controllers/inventoryControllers");

// Create a new inventory item
// URL: http://localhost:3000/inventory/
router.post(
  "/",
  auth,
  checkRole("admin", "moderator"),
  inventoryController.createInventoryItem
);

// Get all inventory items
// URL: http://localhost:3000/inventory/
router.get(
  "/",
  auth,
  checkRole("admin", "moderator", "user"),
  inventoryController.getAllInventoryItems
);

// Get inventory item by ID
// URL: http://localhost:3000/inventory/${id}
router.get(
  "/:id",
  auth,
  checkRole("admin", "moderator", "user"),
  inventoryController.getInventoryItemById
);

// Update inventory item
// URL: http://localhost:3000/inventory/${id}
router.put(
  "/:id",
  auth,
  checkRole("admin", "moderator"),
  inventoryController.updateInventoryItem
);

// Delete inventory item
// URL: http://localhost:3000/inventory/${id}
router.delete(
  "/:id",
  auth,
  checkRole("admin", "moderator"),
  inventoryController.deleteInventoryItem
);

module.exports = router;
