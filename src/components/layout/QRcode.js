// QRBox.jsx
import React, { useEffect, useRef } from "react";
import QRious from "qrious";

const QRcode = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const currentUrl = window.location.href;

    new QRious({
      element: canvasRef.current,
      size: 150,
      value: currentUrl,
      level: "H",
    });
  }, []);

  return (
    <canvas
      id="sb-qr"
      ref={canvasRef}
      style={{ height: "180px", width: "180px" }}
    ></canvas>
  );
};

export default QRcode;
