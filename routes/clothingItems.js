const router = require("express").Router();
const { auth } = require("../middlewares/auth");

// CRUD
const {
  createItem,
  getItems,
  getItem,
  // updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Create
router.post("/", auth, createItem);

// Get
router.get("/", getItems);
router.get("/:itemId", getItem);
// Update
// router.put("/:itemId", updateItem);
// Delete
router.delete("/:itemId", auth, deleteItem);

router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
