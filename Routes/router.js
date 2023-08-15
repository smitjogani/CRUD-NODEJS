const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/userControllers");

//routes
router.post("/user/register", controllers.userPost);
router.get("/user/getAllUser", controllers.getAllUsers);
router.get("/user/getUser/:id", controllers.getUser);
router.delete("/user/deleteUser/:id", controllers.deleteUser);
router.put("/user/updateUser/:id", controllers.updateUser);



module.exports = router;
