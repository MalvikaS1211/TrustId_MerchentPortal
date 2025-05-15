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
    <div className="scanbox">
      <p>Scan QR Code</p>
      <div className="sb-container">
        <canvas
          id="sb-qr"
          ref={canvasRef}
          style={{ height: "180px", width: "180px" }}
        ></canvas>
        <div className="sb-frame"></div>
        <div className="sb-divider active"></div>
      </div>
    </div>
  );
};

export default QRcode;
