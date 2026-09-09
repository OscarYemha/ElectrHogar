const express = require("express");
const router = express.Router();

const {
  Product,
  Cart,
  CartProductQuantity,
} = require("../Models");

function requireAuth(req, res, next) {
  if (!req.user) {
    return res.sendStatus(401);
  }

  next();
}

// -------- Cart Routes -------- //

router.post("/cart", requireAuth, async (req, res) => {
  try {
    if (!req.body.product || !req.body.product.id) {
      return res.sendStatus(400);
    }

    const productId = req.body.product.id;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.sendStatus(404);
    }

    let cart = await Cart.findOne({
      where: {
        UserId: req.user.id,
        isPaid: false,
      },
    });

    if (!cart) {
      cart = await Cart.create({
        UserId: req.user.id,
      });
    }

    const cartQuant = await CartProductQuantity.findOne({
      where: {
        CartId: cart.id,
        ProductId: productId,
      },
    });

    if (!cartQuant) {
      await CartProductQuantity.create({
        quantity: 1,
        ProductId: productId,
        CartId: cart.id,
      });
    } else {
      await cartQuant.increment("quantity", {
        by: 1,
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(
      "Error al agregar producto al carrito:",
      error
    );
    res.sendStatus(500);
  }
});

router.get("/cart", requireAuth, async (req, res) => {
  try {
    const cart = await Cart.findAll({
      where: {
        UserId: req.user.id,
        isPaid: false,
      },
      include: [{ model: Product }],
    });

    if (cart.length === 0) {
      return res.json({ Products: [] });
    }

    res.send(cart[0]);
  } catch (error) {
    console.error(
      "Error al obtener carrito:",
      error
    );
    res.sendStatus(500);
  }
});

router.put("/cart/cant", requireAuth, async (req, res) => {
  try {
    if (
      !req.body.product ||
      !req.body.product.id ||
      !req.body.cant ||
      typeof req.body.cant.cant !== "number"
    ) {
      return res.sendStatus(400);
    }

    const cart = await Cart.findOne({
      where: {
        UserId: req.user.id,
        isPaid: false,
      },
    });

    if (!cart) {
      return res.sendStatus(404);
    }

    const cartQuant = await CartProductQuantity.findOne({
      where: {
        CartId: cart.id,
        ProductId: req.body.product.id,
      },
    });

    if (!cartQuant) {
      return res.sendStatus(404);
    }

    const nuevaCantidad =
      cartQuant.quantity + req.body.cant.cant;

    if (nuevaCantidad < 1) {
      return res.status(400).json({
        error: "La cantidad mínima es 1",
      });
    }

    cartQuant.quantity = nuevaCantidad;
    await cartQuant.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(
      "Error al modificar cantidad del carrito:",
      error
    );
    res.sendStatus(500);
  }
});

router.put("/cart/destroy", requireAuth, async (req, res) => {
  try {
    if (!req.body.product || !req.body.product.id) {
      return res.sendStatus(400);
    }

    const cart = await Cart.findOne({
      where: {
        UserId: req.user.id,
        isPaid: false,
      },
    });

    if (!cart) {
      return res.sendStatus(404);
    }

    const cartQuant = await CartProductQuantity.findOne({
      where: {
        CartId: cart.id,
        ProductId: req.body.product.id,
      },
    });

    if (!cartQuant) {
      return res.sendStatus(404);
    }

    await cartQuant.destroy();

    res.sendStatus(200);
  } catch (error) {
    console.error(
      "Error al eliminar producto del carrito:",
      error
    );
    res.sendStatus(500);
  }
});

module.exports = router;
