const express = require("express");
const router = express.Router();

const {
  User,
  Product,
  Category,
} = require("../Models");

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
      isAdmin: [true],
    },
  })
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      console.error(
        "Error al obtener administradores:",
        error
      );
      res.sendStatus(500);
    });
});

router.get("/admin/products", requireAdmin, (req, res) => {
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
        "Error al obtener productos de administración:",
        error
      );
      res.sendStatus(500);
    });
});

router.post("/admin/newproduct", requireAdmin, async (req, res) => {
  try {
    const {
      name,
      price,
      imgUrl,
      stock,
      description,
    } = req.body.product || {};

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
      console.error(
        "Error al eliminar usuario:",
        error
      );
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
    const {
      name,
      price,
      imgUrl,
      stock,
      description,
    } = req.body.product || {};

    if (
      !name ||
      price === undefined ||
      stock === undefined ||
      !description
    ) {
      return res.sendStatus(400);
    }

    const product = await Product.findByPk(
      req.params.id
    );

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
      await product.setCategories(
        req.body.category
      );
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

router.get("/admin/categories", requireAdmin, (req, res) => {
  Category.findAll()
    .then((categories) => {
      res.send(categories);
    })
    .catch((error) => {
      console.error(
        "Error al obtener categorías de administración:",
        error
      );
      res.sendStatus(500);
    });
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
    const {
      name,
      imgUrl,
    } = req.body.category || {};

    if (!name) {
      return res.sendStatus(400);
    }

    const category = await Category.findByPk(
      req.params.id
    );

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
    const {
      name,
      imgUrl,
    } = req.body.category || {};

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
      console.error(
        "Error al obtener usuarios:",
        error
      );
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
      console.error(
        "Error al promover usuario:",
        error
      );
      res.sendStatus(500);
    });
});

module.exports = router;

