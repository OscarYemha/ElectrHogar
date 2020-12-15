const router = require('express').Router();
const passport = require('passport');
const {User, Product, Cart, CartProductQuantity, Category, Category_Product} = require('../Models/index');
const S = require('sequelize');



// router.get("/", (req,res) => {
//     res.send("Estamos en el back")
// });


router.post("/register", (req, res) => {
  //console.log('req.body del /register=',req.body)
    User.create(req.body).then((users) => {
      console.log("Estás registrado!");
      res.send(users);
    });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    console.log("Estás logueado!");
    res.send(req.user);
});

router.post("/logout", (req, res) => {
    console.log("Te deslogueaste!");
    req.logOut();
    res.sendStatus(200);
});


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


router.get('/categories', (req,res) => {
  Category.findAll({
    include:[{
      model: Product
    }]
  }).then((category) => {
    res.send(category);
  })
});

// router.get('/singlecategory/:id', (req,res) => {
//     Category.findByPk(req.params.id).then((singleCategory) => {
//       // console.log('singleCategory', singleCategory)
      
//       res.send(singleCategory);
//     })
//   });

// router.get('/singlecategory/:id', (req,res) => {
//   Category.findByPk(req.params.id).then((singleCategory) => {
//     // console.log('singleCategory', singleCategory)
    
//     res.send(singleCategory);
//   })
// });


router.get("/users", (req, res) => {
  User.findAll().then((users) => {
    res.send(users);
  });
});


router.get("/me", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }
    console.log('Estás en tu perfil!', req.user)
    res.send(req.user);
});


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
      state: false,
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
      state: false,
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
      state: false
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
      state: false,
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
      state: false,
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


module.exports = router