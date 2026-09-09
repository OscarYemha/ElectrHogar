import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Error = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "60px",
      }}
    >
      <h3>Necesitás iniciar sesión para acceder al carrito.</h3>

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        <Link
          to="/login"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Iniciar sesión
        </Link>
      </Button>
    </div>
  );
};

export default Error;