const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { checkRole } = require("../middlewares/role");
const clientController = require("../controllers/clientController");

// Create a new client
//http://localhost:3000/clients
router.post(
  "/",
  auth,
  checkRole("admin", "moderator"),
  clientController.createClient
);

// Get all clients
//http://localhost:3000/clients
router.get(
  "/",
  auth,
  checkRole("admin", "moderator", "user"),
  clientController.getClients
);

// Get client by ID
//http://localhost:3000/clients/${id}
router.get(
  "/:id",
  auth,
  checkRole("admin", "moderator", "user"),
  clientController.getClientById
);

// Update client
//http://localhost:3000/clients/${id}
router.put(
  "/:id",
  auth,
  checkRole("admin", "moderator"),
  clientController.updateClient
);

// Delete client
//http://localhost:3000/clients/${id}
router.delete(
  "/:id",
  auth,
  checkRole("admin", "moderator"),
  clientController.deleteClient
);

// Assign client to user
//http://localhost:3000/clients/${userId}/assign
router.post(
  "/:id/assign",
  auth,
  checkRole("admin", "moderator"),
  clientController.assignClient
);

// Revoke client access from user
//http://localhost:3000/clients/${id}/revoke/${userId}
router.delete(
  "/:id/revoke/:userId",
  auth,
  checkRole("admin", "moderator"),
  clientController.revokeClientAccess
);

module.exports = router;
