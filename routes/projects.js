const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { checkRole } = require("../middlewares/role");
const projectController = require("../controllers/projectController");


// Route to create a new project
//http://localhost:3000/projects
router.post(
  "/",
  auth,
  checkRole("admin", "moderator"),
  projectController.createProject
);

// Route to get all projects
//http://localhost:3000/projects
router.get(
  "/",
  auth,
  checkRole("admin", "user", "moderator"),
  projectController.getAllProjects
);

// Route to get a single project by ID
// http://localhost:3000/projects/${id}
router.get(
  "/:id",
  auth,
  checkRole("admin", "user", "moderator"),
  projectController.getProjectById
);

// Route to update a project by ID
// http://localhost:3000/projects/${id}
router.put(
  "/:id",
  auth,
  checkRole("admin", "moderator"),
  projectController.updateProject
);

// Route to delete a project by ID
// http://localhost:3000/projects/${id}
router.delete(
  "/:id",
  auth,
  checkRole("admin", "moderator"),
  projectController.deleteProject
);

module.exports = router;