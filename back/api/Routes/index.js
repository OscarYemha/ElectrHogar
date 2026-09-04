const router = require('express').Router();
const passport = require('passport');
const {User, Product, Cart, CartProductQuantity, Category, Category_Product} = require('../Models/index');
router.get("/", (req, res) => {
  res.json({ message: "ElectrHogar API" });
});

const S = require('sequelize');
const nodemailer = require('nodemailer');



// -------- User Register Routes -------- //
router.post("/register", (req, res) => {
    User.create(req.body).then((users) => {
      console.log("Estás registrado!");
      res.send(users);
    });
});

router.get("/auth/facebook", 
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get("/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("http://localhost:3001");
  }
);

// -------- User Login Route -------- //
router.post("/login", passport.authenticate("local"), (req, res) => {
    console.log("Estás logueado!");
    res.send(req.user);
});

// -------- User LogOut Route -------- //
router.post("/logout", (req, res) => {
    if(req.isAuthenticated()){
      console.log("Te deslogueaste!");
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

router.get('/singleproduct/:id', (req,res) => {
  Product.findByPk(req.params.id).then((singleproduct) => {
    console.log('singleProduct desde el back',singleproduct)
    res.send(singleproduct);
  })
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
router.get("/users", (req, res) => {
  User.findAll().then((users) => {
    res.send(users);
  });
});

router.get("/me", (req, res) => {
    res.send(req.user);
});

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
    console.log('Users admin = ', users)
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

router.put('/admin/products/destroy', requireAdmin, (req,res) => {
  Product.destroy({
    where: {
      id: req.body.product.id,
    },
  }).then(() => res.sendStatus(200));
});

router.post('/admin/newproduct', requireAdmin, (req,res) => {
  Product.create(req.body.product)
  .then((product) => {
    product.addCategory(req.body.category.category);
  }).then(() => res.sendStatus(201));
});

router.put('/admin/products/:id', requireAdmin, (req, res) => {
  Product.update(req.body.product, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => Product.findByPk(req.params.id))
    .then((product) => {
      if (req.body.category) {
        return product.setCategories(req.body.category);
      }
    })
    .then(() => res.sendStatus(200));
});

router.get('/admin/categories', requireAdmin, (req,res) => {
  Category.findAll().then((category) => {
    res.send(category);
  })
});

router.put('/admin/category/destroy', requireAdmin, (req,res) => {
  Category.destroy({
    where: {
      id: req.body.category.id,
    },
  }).then(() => res.sendStatus(200)); 
});

router.post('/admin/newcategory', requireAdmin, (req,res) => {
  Category.create(req.body.category).then(()=> {
    res.sendStatus(201);
  })
});


router.get("/admin/users", requireAdmin, (req, res) => {
  User.findAll({}).then((users) => {
      console.log("USERS ADMIN", users)
    res.send(users);
  });
});


router.put("/admin/users/destroy", requireAdmin, (req, res) => {
  User.destroy({
    where: {
      id: req.body.user.id,
    },
  })
  .then(() => res.sendStatus(200));
});  

router.put("/admin/users/rol", requireAdmin, (req, res) => {
  let newRole;
  if (req.body.rol === false) {
    newRole = true;
  }
  User.update({isAdmin: newRole},{
    where: {
      id: req.body.user.id,
    },
  })
  .then(() => res.sendStatus(200));
}); 


// -------- Cart Routes -------- //
router.post("/cart", (req, res) => {
  const productId = req.body.product.id;
  const userId = req.body.user.id;

  let cant = 1;
  if (req.body.product.CartProductQuantity) {
    cant = req.body.product.CartProductQuantity.quantity;
  }

  Cart.findAll({
    where: {
      UserId: req.body.user.id,
      isPaid: false,
    },
    include: [{ model: Product }],
  })
    .then((cart) => {
      //Si no hay carro creo uno
      if (cart.length === 0) {
        Cart.create({
          UserId: userId,
        }).then((newCart) => {
          CartProductQuantity.create({
            quantity: 1,
            ProductId: productId,
            CartId: newCart.id,
          });
          res.send(newCart);
        });
        //Si ya tiene carro agregá productos
      } else {
        CartProductQuantity.findAll({
          where: {
            CartId: cart[0].id,
            ProductId: productId,
          },
        }).then((cartQuant) => {
          if (cartQuant.length === 0) {
            CartProductQuantity.create({
              quantity: cant,
              ProductId: productId,
              CartId: cart[0].id,
            }).then(() => res.sendStatus(200));
          } else {
            cartQuant[0]
              .increment("quantity", { by: cant })
              .then(() => res.sendStatus(200));
          }
        });
      }
    })
    .catch((error) => console.log(error));
});

router.put("/cart", (req, res) => {
  Cart.findAll({
    where: {
      UserId: req.body.user.id,
      isPaid: false,
    },
    include: [{ model: Product }],
  }).then((cart) => {
    CartProductQuantity.findAll({
      where: {
        CartId: cart[0].id,
        ProductId: req.body.product.id,
      },
    }).then((cartQuant) => {
      cartQuant[0].increment("quantity");
    });
  });
});

router.get("/cart/:userId", (req, res) => {
  Cart.findAll({
    where: {
      UserId: req.params.userId,
      isPaid: false
    },
    include: [{ model: Product }],
  }).then((cart) => {
    res.send(cart[0]);
  });
});

//Modificar cantidad (mandar user object, product object y {cant: 1} (ó -1 dependiendo el caso))
router.put("/cart/cant", (req, res) => {
  console.log("req body", req.body);
  Cart.findAll({
    where: {
      UserId: req.body.user.id,
      isPaid: false,
    },
    include: [{ model: Product }],
  })
    .then((cart) => {
      CartProductQuantity.findAll({
        where: {
          CartId: cart[0].id,
          ProductId: req.body.product.id,
        },
      }).then((cartQuant) => {
        if (cartQuant[0].quantity + req.body.cant.cant < 1) {
          (cartQuant[0].increment = 0), cartQuant[0].save;
        } else {
          cartQuant[0].increment("quantity", { by: req.body.cant.cant });
        }
      });
    })
    .then(() => res.sendStatus(200));
});

//Eliminar del carro
router.put("/cart/destroy", (req, res) => {
  Cart.findAll({
    where: {
      UserId: req.body.user.id,
      isPaid: false,
    },
    include: [{ model: Product }],
  })
    .then((cart) => {
      CartProductQuantity.findAll({
        where: {
          CartId: cart[0].id,
          ProductId: req.body.product.id,
        },
      }).then((cartQuant) => {
        cartQuant[0].destroy();
      });
    })
    .then(() => res.sendStatus(200));
});




// -------- CheckOut Route -------- //
router.put("/checkout", (req, res) => {

  var transporter = nodemailer.createTransport({
    service: "gmail",  
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  var mailOptions = {
    from: "Remitente",
    to: req.body.user.email,
    subject: "Confirmación de compra",
    text: `Muchas gracias por tu compra!`,
  };
  console.log("Procesando checkout para usuario", req.body.user.id);
  Cart.update(
    {
      address: req.body.address,
      date: Date.now(),
      isPaid: true,
      total: req.body.total,
    },
    {
      where: { UserId: req.body.user.id, isPaid: false },
      returning: true,
      plain: true,
    }
  )
    .then(() => {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.log("Email no configurado. Se omite el envío.");
        return res.status(200).json({ message: "Compra realizada con éxito" });
      }

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.log("No se pudo enviar el email:", error.message);
        } else {
          console.log("Email enviado");
        }

        res.status(200).json({ message: "Compra realizada con éxito" });
      });
    });
})

router.get("/orders/:userid", (req, res) => {
  Cart.findAll({
    where: {
      UserId: req.params.userid,
      isPaid: true,
    },
  }).then((r) => {
    //console.log(r)
    res.send(r);
  });
});

router.get("/compras/:cartId", (req, res) => {
  Cart.findAll({
    where: {
      id: req.params.cartId,
      isPaid: true,
    },
    include: [{ model: Product }],
  }).then((cart) => {
    console.log("CART THEN", cart);
    res.send(cart[0]);
  });
});

module.exports = router