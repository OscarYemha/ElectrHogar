const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const {
  Product,
  Cart,
} = require("../Models");

function requireAuth(req, res, next) {
  if (!req.user) {
    return res.sendStatus(401);
  }

  next();
}

const escapeHtml = (value) => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// -------- Checkout Route -------- //

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

    if (
      !cart ||
      !cart.Products ||
      cart.Products.length === 0
    ) {
      return res.status(400).json({
        error: "El carrito está vacío",
      });
    }

    const total = cart.Products.reduce(
      (sum, product) => {
        const quantity =
          product.CartProductQuantity.quantity;

        return sum + product.price * quantity;
      },
      0
    );

    const orderItems = cart.Products.map(
      (product) => {
        const quantity =
          product.CartProductQuantity.quantity;

        const subtotal =
          product.price * quantity;

        return {
          name: product.name,
          price: product.price,
          quantity,
          subtotal,
        };
      }
    );

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
      address,
      date: new Date(),
      isPaid: true,
      total,
    });

    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASSWORD
    ) {
      console.log(
        "Email no configurado. Se omite el envío."
      );

      return res.status(200).json({
        message: "Compra realizada con éxito",
        total,
      });
    }

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

    const purchaseDate =
      new Date().toLocaleString("es-AR", {
        timeZone:
          "America/Argentina/Buenos_Aires",
        hour12: false,
      });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.user.email,
      subject:
        "Confirmación de compra - ElectrHogar",

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
            Hola ${escapeHtml(
              req.user.firstName || ""
            )},
          </p>

          <p>
            Tu pedido fue registrado correctamente.
            A continuación podés ver el detalle de la compra.
          </p>

          <p>
            <strong>Fecha:</strong>
            ${purchaseDate}
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

          <h3
            style="
              text-align: right;
              margin-top: 20px;
            "
          >
            Total:
            $${total.toLocaleString("es-AR")}
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
            Esta es una compra ficticia realizada
            en ElectrHogar, un proyecto de
            demostración. No se realizó ningún
            cobro real.
          </p>
        </div>
      `,
    };

    transporter.sendMail(
      mailOptions,
      (error) => {
        if (error) {
          console.log(
            "No se pudo enviar el email:",
            error.message
          );
        } else {
          console.log("Email enviado");
        }

        res.status(200).json({
          message:
            "Compra realizada con éxito",
          total,
        });
      }
    );
  } catch (error) {
    console.error(
      "Error durante el checkout:",
      error
    );
    res.sendStatus(500);
  }
});

// -------- Orders Routes -------- //

router.get(
  "/orders",
  requireAuth,
  async (req, res) => {
    try {
      const orders = await Cart.findAll({
        where: {
          UserId: req.user.id,
          isPaid: true,
        },
      });

      res.json(orders);
    } catch (error) {
      console.error(
        "Error al obtener compras:",
        error
      );
      res.sendStatus(500);
    }
  }
);

router.get(
  "/compras/:cartId",
  requireAuth,
  async (req, res) => {
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
      console.error(
        "Error al obtener compra:",
        error
      );
      res.sendStatus(500);
    }
  }
);

module.exports = router;
