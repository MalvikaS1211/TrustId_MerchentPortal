import Routers from "./routers/Routers";
import "./assets/css/main.css";
import "./assets/css/font.css";
import "react-quill/dist/quill.snow.css";
import "lightbox.js-react/dist/index.css";
import "./components/css/custom.css";
import "./components/css/QRcode.css";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Routers />
      <Toaster />
    </>
  );
}
