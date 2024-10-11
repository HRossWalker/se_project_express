const ClothingItem = require("../models/clothingItem");
const { errorSelector, ForbiddenError, CREATED } = require("../utils/errors");

const createItem = (req, res) => {
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
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (req.user._id === item.owner.toString()) {
        return ClothingItem.findByIdAndDelete(item._id).then(() => {
          res.send({ message: "Item successfully deleted." });
        });
      }
      console.log("hi");
      return Promise.reject(new ForbiddenError());
    })
    .catch((err) => {
      errorSelector(res, err);
    });
};

const likeItem = (req, res) => {
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
        errorSelector(res, err);
      });
};

const dislikeItem = (req, res) => {
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
