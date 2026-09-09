import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

function Confirmacion() {
  const history = useHistory();
  const location = useLocation();
  const purchaseCompleted = location.state?.purchaseCompleted;

  useEffect(() => {
    if (!purchaseCompleted) {
      history.replace("/");
      return;
    }

    const timer = setTimeout(() => {
      history.push("/");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [history, purchaseCompleted]);

  return (
    <div style={{ textAlign: "center", marginTop: "5%" }}>
      <h2>¡Compra realizada con éxito!</h2>

      <p>
        Gracias por tu compra. Te enviamos el comprobante
        a tu correo electrónico.
      </p>

      <p className="text-muted">
        Redirigiendo al inicio automáticamente...
      </p>
    </div>
  );
}

export default Confirmacion;