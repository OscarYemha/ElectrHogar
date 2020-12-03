const router = require('express').Router();
const passport = require('passport');
const {User, Product, Cart, CartProductQuantity, Category} = require('../Models/index');
const S = require('sequelize');



router.get("/", (req,res) => {
    res.send("Estamos en el back")
});


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
  Product.findAll().then((product) => {
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
  Category.findAll().then((category) => {
    res.send(category);
  })
});


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
  Product.findAll().then((products) => {
    res.send(products)
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


router.get('/admin/category', (req,res) => {
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
})


module.exports = router