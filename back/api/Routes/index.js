const router = require('express').Router();
const passport = require('passport');
const { User, Product, Cart, CartProductQuantity, Category } = require('../Models/index');
router.get("/", (req, res) => {
  res.json({ message: "ElectrHogar API" });
});

const nodemailer = require('nodemailer');

const sanitizeUser = (user) => {
  if (!user) {
    return {};
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
  };
};

// -------- User Register Routes -------- //
router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  User.create({
    firstName,
    lastName,
    email,
    password,
  })
    .then((user) => {
      res.status(201).json(sanitizeUser(user));
    })
    .catch((error) => {
      console.error("Error al registrar usuario:", error.message);
      res.sendStatus(400);
    });
});

router.get("/auth/facebook", 
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  function (req, res) {
    res.redirect(`${process.env.FRONTEND_URL}/products`);
  }
);

// -------- User Login Route -------- //
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(sanitizeUser(req.user));
});

// -------- User LogOut Route -------- //
router.post("/logout", (req, res) => {
    if(req.isAuthenticated()){
      req.logOut();
    }  
    res.sendStatus(200);
});


// -------- Products Routes -------- //
router.get('/products', (req,res) => {
  Product.findAll({
    include:[{
      model: Category
    }]
  }).then((product) => {
    res.send(product);
  })
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
router.get('/categories', (req,res) => {
  Category.findAll({
    include:[{
      model: Product
    }]
  }).then((category) => {
    res.send(category);
  })
});


// -------- User Routes -------- //
router.get("/me", (req, res) => {
  res.json(sanitizeUser(req.user));
});

function requireAuth(req, res, next) {
  if (!req.user) {
    return res.sendStatus(401);
  }

  next();
}

function requireAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.sendStatus(403);
  }

  next();
}

// -------- Admin Routes -------- //
router.get("/admin", requireAdmin, (req, res) => {
  User.findAll({
    where: {
      isAdmin : [true]
    }
  }).then((users) => {
    res.send(users)
  })
});

router.get("/admin/products", requireAdmin, (req,res) => {
  Product.findAll({
    include:[{
      model: Category
    }]
  }).then((product) => {
    res.send(product);
  })
});

router.post("/admin/newproduct", requireAdmin, async (req, res) => {
  try {
    const { name, price, imgUrl, stock, description } =
      req.body.product || {};

    const categoryIds =
      req.body.category &&
      Array.isArray(req.body.category.category)
        ? req.body.category.category
        : [];

    if (
      !name ||
      price === undefined ||
      stock === undefined ||
      !description
    ) {
      return res.sendStatus(400);
    }

    const product = await Product.create({
      name,
      price,
      imgUrl,
      stock,
      description,
    });

    if (categoryIds.length > 0) {
      await product.addCategory(categoryIds);
    }

    res.sendStatus(201);
  } catch (error) {
    console.error(
      "Error al crear producto:",
      error
    );
    res.sendStatus(500);
  }
});

router.put("/admin/users/destroy", requireAdmin, (req, res) => {
  if (!req.body.user || !req.body.user.id) {
    return res.sendStatus(400);
  }

  User.findByPk(req.body.user.id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(404);
      }

      if (user.isAdmin === true) {
        return res
          .status(403)
          .send("No se puede eliminar a un administrador");
      }

      return User.destroy({
        where: {
          id: user.id,
        },
      }).then(() => res.sendStatus(200));
    })
    .catch((error) => {
      console.error("Error al eliminar usuario:", error);
      res.sendStatus(500);
    });
});

router.put("/admin/products/destroy", requireAdmin, async (req, res) => {
  try {
    if (!req.body.product || !req.body.product.id) {
      return res.sendStatus(400);
    }

    const product = await Product.findByPk(
      req.body.product.id
    );

    if (!product) {
      return res.sendStatus(404);
    }

    await product.destroy();

    res.sendStatus(200);
  } catch (error) {
    console.error(
      "Error al eliminar producto:",
      error
    );
    res.sendStatus(500);
  }
});

router.put("/admin/products/:id", requireAdmin, async (req, res) => {
  try {
    const { name, price, imgUrl, stock, description } =
      req.body.product || {};

    if (
      !name ||
      price === undefined ||
      stock === undefined ||
      !description
    ) {
      return res.sendStatus(400);
    }

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.sendStatus(404);
    }

    await product.update({
      name,
      price,
      imgUrl,
      stock,
      description,
    });

    if (
      Array.isArray(req.body.category) &&
      req.body.category.length > 0
    ) {
      await product.setCategories(req.body.category);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(
      "Error al editar producto:",
      error
    );
    res.sendStatus(500);
  }
});

router.get('/admin/categories', requireAdmin, (req,res) => {
  Category.findAll().then((category) => {
    res.send(category);
  })
});

router.put("/admin/category/destroy", requireAdmin, async (req, res) => {
  try {
    if (!req.body.category || !req.body.category.id) {
      return res.sendStatus(400);
    }

    const category = await Category.findByPk(
      req.body.category.id
    );

    if (!category) {
      return res.sendStatus(404);
    }

    await category.destroy();

    res.sendStatus(200);
  } catch (error) {
    console.error(
      "Error al eliminar categoría:",
      error
    );
    res.sendStatus(500);
  }
});

router.put("/admin/categories/:id", requireAdmin, async (req, res) => {
  try {
    const { name, imgUrl } = req.body.category || {};

    if (!name) {
      return res.sendStatus(400);
    }

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.sendStatus(404);
    }

    await category.update({
      name,
      imgUrl,
    });

    res.sendStatus(200);
  } catch (error) {
    console.error(
      "Error al editar categoría:",
      error
    );
    res.sendStatus(500);
  }
});

router.post("/admin/newcategory", requireAdmin, async (req, res) => {
  try {
    const { name, imgUrl } = req.body.category || {};

    if (!name) {
      return res.sendStatus(400);
    }

    await Category.create({
      name,
      imgUrl,
    });

    res.sendStatus(201);
  } catch (error) {
    console.error(
      "Error al crear categoría:",
      error
    );
    res.sendStatus(500);
  }
});


router.get("/admin/users", requireAdmin, (req, res) => {
  User.findAll({
    attributes: [
      "id",
      "firstName",
      "lastName",
      "email",
      "isAdmin",
    ],
  })
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.error("Error al obtener usuarios:", error);
      res.sendStatus(500);
    });
});


router.put("/admin/users/rol", requireAdmin, (req, res) => {
  if (!req.body.user || !req.body.user.id) {
    return res.sendStatus(400);
  }

  User.findByPk(req.body.user.id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(404);
      }

      if (user.isAdmin === true) {
        return res
          .status(403)
          .send("El usuario ya es administrador");
      }

      return User.update(
        {
          isAdmin: true,
        },
        {
          where: {
            id: user.id,
          },
        }
      ).then(() => res.sendStatus(200));
    })
    .catch((error) => {
      console.error("Error al promover usuario:", error);
      res.sendStatus(500);
    });
});

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

router.get("/cart", requireAuth, (req, res) => {
  Cart.findAll({
    where: {
      UserId: req.user.id,
      isPaid: false,
    },
    include: [{ model: Product }],
  }).then((cart) => {
    if (cart.length === 0) {
      return res.json({ Products: [] });
    }

    res.send(cart[0]);
  });
});

//Modificar cantidad (mandar user object, product object y {cant: 1} (ó -1 dependiendo el caso))
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

//Eliminar del carro
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




// -------- CheckOut Route -------- //
router.put("/checkout", requireAuth, async (req, res) => {
  try {
    const address =
      typeof req.body.address === "string"
        ? req.body.address.trim()
        : "";

    if (!address || address.length > 200) {
      return res.status(400).json({
        error: "Ingresá una dirección válida",
      });
    }

    const cart = await Cart.findOne({
      where: {
        UserId: req.user.id,
        isPaid: false,
      },
      include: [{ model: Product }],
    });

    if (!cart || !cart.Products || cart.Products.length === 0) {
      return res.status(400).json({
        error: "El carrito está vacío",
      });
    }

    const total = cart.Products.reduce((sum, product) => {
      const quantity = product.CartProductQuantity.quantity;
      return sum + product.price * quantity;
    }, 0);

    const orderItems = cart.Products.map((product) => {
      const quantity = product.CartProductQuantity.quantity;
      const subtotal = product.price * quantity;

      return {
        name: product.name,
        price: product.price,
        quantity,
        subtotal,
      };
    });

    const orderRows = orderItems
      .map(
        (item) => `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">
              ${escapeHtml(item.name)}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">
              ${item.quantity}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
              $${item.price.toLocaleString("es-AR")}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
              $${item.subtotal.toLocaleString("es-AR")}
            </td>
          </tr>
        `
      )
      .join("");

    await cart.update({
      address: address,
      date: new Date(),
      isPaid: true,
      total,
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log("Email no configurado. Se omite el envío.");

      return res.status(200).json({
        message: "Compra realizada con éxito",
        total,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const purchaseDate = new Date().toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      hour12: false,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.user.email,
      subject: "Confirmación de compra - ElectrHogar",

      html: `
        <div
          style="
            max-width: 700px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
            color: #333;
          "
        >
          <h2 style="text-align: center;">
            ElectrHogar
          </h2>

          <h3>
            ¡Compra realizada con éxito!
          </h3>

          <p>
            Hola ${escapeHtml(req.user.firstName || "")},
          </p>

          <p>
            Tu pedido fue registrado correctamente.
            A continuación podés ver el detalle de la compra.
          </p>

          <p>
            <strong>Fecha:</strong> ${purchaseDate}
          </p>

          <p>
            <strong>Dirección de entrega:</strong>
            ${escapeHtml(address)}
          </p>

          <table
            style="
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            "
          >
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; text-align: left;">
                  Producto
                </th>
                <th style="padding: 10px; text-align: center;">
                  Cantidad
                </th>
                <th style="padding: 10px; text-align: right;">
                  Precio
                </th>
                <th style="padding: 10px; text-align: right;">
                  Subtotal
                </th>
              </tr>
            </thead>

            <tbody>
              ${orderRows}
            </tbody>
          </table>

          <h3 style="text-align: right; margin-top: 20px;">
            Total: $${total.toLocaleString("es-AR")}
          </h3>

          <p style="margin-top: 30px;">
            Muchas gracias por tu compra.
          </p>

          <hr style="margin-top: 30px;" />

          <p
            style="
              font-size: 12px;
              color: #777;
              text-align: center;
            "
          >
            Esta es una compra ficticia realizada en ElectrHogar,
            un proyecto de demostración.
            No se realizó ningún cobro real.
          </p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(
          "No se pudo enviar el email:",
          error.message
        );
      } else {
        console.log("Email enviado");
      }

      res.status(200).json({
        message: "Compra realizada con éxito",
        total,
      });
    });
  } catch (error) {
    console.error("Error durante el checkout:", error);
    res.sendStatus(500);
  }
});

const escapeHtml = (value) => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

router.get("/orders", requireAuth, async (req, res) => {
  try {
    const orders = await Cart.findAll({
      where: {
        UserId: req.user.id,
        isPaid: true,
      },
    });

    res.json(orders);
  } catch (error) {
    console.error("Error al obtener compras:", error);
    res.sendStatus(500);
  }
});

router.get("/compras/:cartId", requireAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: {
        id: req.params.cartId,
        UserId: req.user.id,
        isPaid: true,
      },
      include: [{ model: Product }],
    });

    if (!cart) {
      return res.sendStatus(404);
    }

    res.json(cart);
  } catch (error) {
    console.error("Error al obtener compra:", error);
    res.sendStatus(500);
  }
});

module.exports = router
