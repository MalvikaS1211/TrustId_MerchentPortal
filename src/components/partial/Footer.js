import React from "react";
import { Link } from "react-router-dom";
import CompanyLogo from "../common/CompanyLogo";
import Logo from "../../assets/images/TrustIdLogo.png";
export default function Footer({ className }) {
  const CurrentYear = new Date().getFullYear();

  return (
    <div
      className={`${
        className ? className : ""
      } footer md:p-6 sm:p-3 py-3 mt-auto`}
    >
      <div className="container-fluid flex items-center justify-between gap-15 md:flex-row flex-col md:text-[16px]/[24px] text-[14px]/[20px]">
        <p className="text-font-color-100 text-center">
          © {CurrentYear}{" "}
          <Link to="/" className="text-brown">
            Trust ID
          </Link>
          , All Rights Reserved.
        </p>
        <Link to="/">
          <img src={Logo} className="w-[53px] h-[50px]"></img>
          {/* <CompanyLogo className="w-[53px] h-[18px] text-primary transition-all hover:text-secondary" /> */}
        </Link>
        <ul className="flex items-center gap-x-20 gap-y-5 flex-wrap justify-center">
          <li>
            <Link
              to="#"
              className="text-font-color-100 transition-all hover:text-blue"
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="text-font-color-100 transition-all hover:text-blue"
            >
              Licenses
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="text-font-color-100 transition-all hover:text-blue"
            >
              Support
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="text-font-color-100 transition-all hover:text-blue"
            >
              FAQs
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
