const ClothingItem = require("../models/clothingItem");
const { errorSelector, CREATED } = require("../utils/errors");

const createItem = (req, res) => {
  // console.log(req);
  // console.log(req.body);
  // console.log(req.user._id);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.status(CREATED).send({ data: item });
    })
    .catch((err) => {
      // console.error(err);
      errorSelector(res, err);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.send(items);
    })
    .catch((err) => {
      // console.error(err);
      errorSelector(res, err);
    });
};

const getItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((items) => {
      res.send(items);
    })
    .catch((err) => {
      // console.error(err);
      errorSelector(res, err);
    });
};

// const updateItem = (req, res) => {
//   // console.log(req.body);
//   const { itemId } = req.params;
//   const { imageUrl } = req.body;
//   ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
//     .orFail()
//     .then((items) => {
//       res.send(items);
//     })
//     .catch((err) => {
//       // console.error(err);
//       errorSelector(res, err);
//     });
// };

const deleteItem = (req, res) => {
  const itemId = req.params;
  // console.log(itemId.itemId);
  ClothingItem.findByIdAndDelete(itemId.itemId)
    .orFail()
    .then(() => {
      res.send({ message: "Item successfully deleted." });
    })
    .catch((err) => {
      // console.error(err);
      errorSelector(res, err);
    });
};

const likeItem = (req, res) => {
  // console.log(req.params.itemId);
  if (req.user._id)
    ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
      .orFail()
      .then((item) => {
        res.send(item);
      })
      .catch((err) => {
        // console.error(err);
        errorSelector(res, err);
      });
};

const dislikeItem = (req, res) => {
  // console.log(req.params.itemId);
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      // console.error(err);
      errorSelector(res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  getItem,
  // updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
