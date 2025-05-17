import React, { useState, useRef, useEffect } from "react";
import "../../components/css/Login.css";
import QRcode from "./QRcode";
import QRious from "qrious";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Logo from "../../assets/images/TrustIdLogo.png";
import IndiaFlag from "../../assets/images/IndiaFlag.png";

import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import LoginLeftSide from "./LoginLeftSide";
import { generateOTP, verifyOTP } from "../Helper/ApiFunction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function LoginPage() {
  const [showTooltip, setShowTooltip] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  // Close tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [showOTP, setshowOTP] = useState(false);
  const [showOTPSection, setshowOTPSection] = useState(false);
  const [inputMobile, setInputMobile] = useState();
  const [OTP, setOTP] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setshowOTP(!showOTP);
  };
  const handleOTP = async () => {
    const res = await generateOTP(phone);
    console.log(res, generateOTP);
    setshowOTPSection(true);
    console.log("send otp");
  };

  const handleLogin = async () => {
    try {
      const res = await verifyOTP(phone, OTP);
      console.log(res, "handleLogin");

      if (res?.status == 200) {
        toast(res.message);
        navigate("/");
      } else {
        console.error("OTP verification failed:", res?.message || res);
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  };
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");

  const clearPhone = () => setPhone("");
  return (
    <>
      <div className="flex flex-col lg:flex-row md:flex-row  w-full min-h-screen">
        <main className="w-full lg:w-[75%] ">
          <div className="content-layout">
            <div className=" content-card first-screen-content">
              <div class="icon-wrap">
                <img src={Logo} alt="Logo" width="13%"></img>
              </div>
              <div className="flex justify-between items-center mb-8">
                <div
                  className="card-page-title !mb-0"
                  role="heading"
                  aria-level="1"
                >
                  Log in
                </div>

                <div className="max-md:hidden h-[40px]">
                  <div className="bn-tooltips-wrap " ref={wrapperRef}>
                    <div
                      className="bn-tooltips-ele"
                      onClick={() => setShowTooltip((prev) => !prev)}
                    >
                      <div
                        className="p-[4px] w-[40px] h-[40px] rounded-[8px] hover:bg-[--color-Input] cursor-pointer qr-login-icon bg-[--color-Vessel]"
                        role="button"
                        aria-label="QR code login"
                        aria-expanded="false"
                        tabIndex="0"
                      >
                        <svg
                          fill="currentColor"
                          className="bn-svg w-[32px] h-[32px] text-[--color-textPrimary] qrcode-login-popup"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm11 0h-2v4h4v-2h3v-2h-4v2h-1v-2zm5 3h-2v2h-2v2h4v-4zm-5 2h-2v2h2v-2zM13 4h7v7h-7V4zM8.5 6.5h-2v2h2v-2zm-2 9h2v2h-2v-2zm11-9h-2v2h2v-2z"
                          />
                        </svg>
                      </div>
                    </div>
                    {showTooltip && (
                      <div className="relative inline-block">
                        {showTooltip && (
                          <div
                            role="tooltip"
                            tabIndex="0"
                            className="top-full mt-2 right-0 z-50 w-[385px] bg-[#f6eee3] rounded-xl shadow-lg p-[2rem] border border-gray-200 qrcode-container"
                          >
                            <div className="absolute w-3 h-3 bg-[#f6eee3]  rotate-45 arrow-style"></div>

                            <div className="flex flex-col items-center">
                              <div className="relative w-[180px] h-[180px] border border-gray-200 rounded-2xl bg-white flex items-center justify-center">
                                <div className="absolute w-[26px] h-[26px] bg-white flex items-center justify-center rounded">
                                  <QRcode />
                                </div>
                              </div>

                              <div className="mt-6 text-center text-sm">
                                Scan this code with the Trust Id App to log in
                                instantly.
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <form autoComplete="off">
                <div className="bn-formItem">
                  <label
                    className="bn-formItem-label"
                    htmlFor="bn-formItem-username"
                  >
                    Phone Number
                  </label>
                  <div>
                    <div className="relative w-full max-w-md mx-auto">
                      {/* <input
                      className="w-full border border-gray-300 rounded px-4 py-2 pr-28 text-sm username-input-field"
                      placeholder="Enter your phone number"
                      type="text"
                      name="no-autofill-phone"
                      id="no-autofill-phone"
                      autoComplete="off"
                      inputMode="tel"
                    /> */}
                      {/* 
                    <button
                      type="button"
                      className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm whitespace-nowrap"
                      onClick={handleOTP}
                    >
                      Send OTP
                    </button> */}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ">
                    {/* Country Code Selector */}
                    <div className="flex items-center pl-[7px] pr-[13px] py-[12px]  rounded-md border gap-1 country-code-div">
                      <img src={IndiaFlag} width={20}></img>
                      <span>+91</span>
                    </div>

                    {/* Phone Input */}
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-4 py-2 pr-28 text-sm username-input-field"
                        placeholder="Enter number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 pl-3 pr-[18px] py-1 text-sm whitespace-nowrap"
                        onClick={handleOTP}
                      >
                        Send OTP
                      </button>
                      {phone && (
                        <button
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={() => setPhone("")}
                        >
                          <IoMdCloseCircleOutline size={16} color="grey" />
                        </button>
                      )}
                    </div>
                  </div>
                  {showOTPSection && (
                    <div className="form-control mb-15">
                      <label
                        className="bn-formItem-label pb-1"
                        htmlFor="bn-formItem-username"
                      >
                        OTP
                      </label>
                      <div className="relative pt-2">
                        <input
                          className="bn-textField-input w-full"
                          type={showOTP ? "text" : "password"}
                          id="password"
                          placeholder="Enter OTP"
                          value={OTP}
                          onChange={(e) => setOTP(e.target.value)}
                          autoComplete="off"
                        />

                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute top-[59%] translate-y-[-50%] right-3 text-font-color-100"
                        >
                          {showOTP ? <IconEyeOff /> : <IconEye />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className="bn-button bn-button__primary data-size-large mt-6"
                  style={{ width: "100%" }}
                  type="button"
                  data-e2e="btn-accounts-form-submit"
                  onClick={handleLogin}
                >
                  Log In
                </button>
              </form>

              <div class="flex items-center my-4 md:mt-6 md:mb-2">
                <div class="flex-1 bg-[--color-line] h-[1px]"></div>
                <div class="px-4">or</div>
                <div class="flex-1 bg-[--color-line] h-[1px]"></div>
              </div>
              <button
                className="bn-button bn-button__primary data-size-large mt-6"
                style={{ width: "100%" }}
                type="submit"
                data-e2e="btn-accounts-form-submit"
              >
                Connect with Trust Id
              </button>
            </div>
          </div>
        </main>
        <LoginLeftSide />
      </div>
    </>
  );
}
