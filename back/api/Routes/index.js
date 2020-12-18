const router = require('express').Router();
const passport = require('passport');
const {User, Product, Cart, CartProductQuantity, Category, Category_Product} = require('../Models/index');
const S = require('sequelize');
const nodemailer = require('nodemailer');



// -------- User Register Route -------- //
router.post("/register", (req, res) => {
    User.create(req.body).then((users) => {
      console.log("Estás registrado!");
      res.send(users);
    });
});

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


// -------- Admin Routes -------- //
router.get("/admin",(req,res) => {
  User.findAll({
    where: {
      isAdmin : [true]
    }
  }).then((users) => {
    console.log('Users admin = ', users)
    res.send(users)
  })
});

router.get("/admin/products", (req,res) => {
  Product.findAll({
    include:[{
      model: Category
    }]
  }).then((product) => {
    res.send(product);
  })
});

router.put('/admin/products/destroy', (req,res) => { // PREGUNTAR SI ES PUT O POST
  Product.destroy({
    where: {
      id: req.body.product.id,
    },
  }).then(() => res.sendStatus(200));
});

router.post('/admin/newproduct', (req,res) => {
  Product.create(req.body.product)
  .then((product) => {
    product.addCategory(req.body.category.category);
  }).then(() => res.sendStatus(201));
});

router.put('/admin/products/:id', (req,res) => {
  Product.update(req.body.product,{
    where: {
      id: req.params.id,
    },
  }).then(() => res.sendStatus(200));
});


router.get('/admin/categories', (req,res) => {
  Category.findAll().then((category) => {
    res.send(category);
  })
});

router.put('/admin/category/destroy', (req,res) => {
  Category.destroy({
    where: {
      id: req.body.category.id,
    },
  }).then(() => res.sendStatus(200)); 
});

router.post('/admin/newcategory', (req,res) => {
  Category.create(req.body.category).then(()=> {
    res.sendStatus(201);
  })
});


router.get("/admin/users", (req, res) => {
  User.findAll({}).then((users) => {
      console.log("USERS ADMIN", users)
    res.send(users);
  });
});


router.put("/admin/users/destroy", (req, res) => {
  User.destroy({
    where: {
      id: req.body.user.id,
    },
  })
  .then(() => res.sendStatus(200));
});  

router.put("/admin/users/rol", (req, res) => {
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
            CartId: userId,
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

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("http://localhost:3001");
  }
);



router.put("/checkout", (req, res) => {

  var transporter = nodemailer.createTransport({
    service: "gmail",  
    port: 587,
    secure: false,
    auth: {
      user: "oscaryemha1990@gmail.com",
      pass: "OsIY1990",
      // type: 'OAuth2',
      // clientId: '622571131623-fieolaq9ecm1tknhtj9c53gv7nne8h5a.apps.googleusercontent.com',
      // clientSecret: 'AobHBzWtbrLOo756GtX-TI7F',
    },
    tls: { rejectUnauthorized: false },
  });

  var mailOptions = {
    from: "Remitente",
    to: req.body.user.email,
    subject: "Confirmación de compra",
    text: `Muchas gracias por tu compra!`,
  };
  console.log("req.body de /checkout",req.body);
  Cart.update(
    {
      address: req.body.address,
      cardNumber: req.body.card,
      cardCvv: req.body.cvv,
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
    .then((cart) => {
      return Cart.findByPk(cart[1].id, { include: [{ model: Product }] });
    })
    .then((cart) => {
      let mailOptions = {
        from: "oscaryemha1990@gmail.com",
        to: `${req.body.user.email}`,
        subject: "Confirmacion de compra",
        html: `<h1>ESTO ES H1 ${cart}</h1>`,
      };
    })
    .then((cart) => {
      transporter.sendMail(mailOptions,  (error, info) => {
        console.log("entre al sendmail")
        if (error) {
          console.log("error.message",error.message)
          res.status(500).send(error.message);
        } else {
          console.log("Email enviado");
          res.status(200).jsonp(req.body)
        }
      })
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