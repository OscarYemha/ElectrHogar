const express = require("express");
const router = express.Router();

const {
  Product,
  Category,
} = require("../Models");

// -------- Products Routes -------- //

router.get("/products", (req, res) => {
  Product.findAll({
    include: [
      {
        model: Category,
      },
    ],
  })
    .then((products) => {
      res.send(products);
    })
    .catch((error) => {
      console.error(
        "Error al obtener productos:",
        error
      );
      res.sendStatus(500);
    });
});

router.get("/singleproduct/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }],
    });

    if (!product) {
      return res.sendStatus(404);
    }

    res.json(product);
  } catch (error) {
    console.error(
      "Error al obtener producto:",
      error
    );
    res.sendStatus(500);
  }
});

// -------- Category Route -------- //

router.get("/categories", (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((categories) => {
      res.send(categories);
    })
    .catch((error) => {
      console.error(
        "Error al obtener categorías:",
        error
      );
      res.sendStatus(500);
    });
});

module.exports = router;
