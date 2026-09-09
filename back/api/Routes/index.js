const router = require('express').Router();
const productsRouter = require("./products");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const cartRouter = require("./cart");
const checkoutRouter = require("./checkout");

router.use(productsRouter);
router.use(authRouter);
router.use(adminRouter);
router.use(cartRouter);
router.use(checkoutRouter);

router.get("/", (req, res) => {
  res.json({ message: "ElectrHogar API" });
});


module.exports = router