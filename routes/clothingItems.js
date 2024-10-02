const router = require("express").Router();

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
router.post("/", createItem);

// Get
router.get("/", getItems);
router.get("/:itemId", getItem);
// Update
// router.put("/:itemId", updateItem);
// Delete
router.delete("/:itemId", deleteItem);

router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
