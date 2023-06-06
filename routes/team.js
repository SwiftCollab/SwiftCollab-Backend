const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { checkRole } = require("../middlewares/role");
const teamController = require("../controllers/teamController");

//Creates a Team
//http://localhost:3000/teams
router.post(
  "/",
  auth,
  checkRole("admin"),
  teamController.createTeam
);

//Creates a Team by id
//http://localhost:3000/teams/${id}
router.get(
  "/:id",
  auth,
  checkRole("admin", "moderator", "user"),
  teamController.getTeamById
);

//Modify a Team by id
//http://localhost:3000/teams/${id}
router.put(
  "/:id",
  auth,
  checkRole("admin", "moderator"),
  teamController.updateTeam
);

//Deletes a Team by id
//http://localhost:3000/teams/${id}
router.delete(
  "/:id",
  auth,
  checkRole("admin"),
  teamController.deleteTeam
);

module.exports = router;
