const router = require("express").Router();
const { auth } = require("../middlewares/auth");

// CRUD
const {
  createItem,
  getItems,
  getItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Create
router.post("/", auth, createItem);

// Get
router.get("/", getItems);
router.get("/:itemId", getItem);
// Delete
router.delete("/:itemId", auth, deleteItem);
// Likes
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
