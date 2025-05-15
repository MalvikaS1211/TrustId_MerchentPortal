import React, { useState, useRef, useEffect } from "react";
import "../../components/css/Login.css";
import QRcode from "./QRcode";
import QRious from "qrious";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
export default function LoginPage() {
  const [showTooltip, setShowTooltip] = useState(false);
  const wrapperRef = useRef(null);

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
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleOTP = async () => {
    setShowOTP(true);
    console.log("send otp");
  };
  return (
    <>
      <main className="w-full lg:w-1/2">
        <div className="content-layout">
          <div className=" content-card first-screen-content">
            <div class="icon-wrap">
              <img src="" alt="Logo"></img>
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
                <div
                  className="bn-tooltips-wrap qrcode-login-popup"
                  ref={wrapperRef}
                >
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
                        className="bn-svg w-[32px] h-[32px] text-[--color-textPrimary]"
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
                          className="top-full mt-2 right-0 z-50 w-[350px] bg-[#f6eee3] rounded-xl shadow-lg p-[2rem] border border-gray-200 qrcode-container"
                        >
                          {/* Arrow */}
                          <div className="absolute w-3 h-3 bg-[#f6eee3]  rotate-45 arrow-style"></div>

                          {/* QR Code Container */}
                          <div className="flex flex-col items-center">
                            <div className="relative w-[180px] h-[180px] border border-gray-200 rounded-2xl bg-white flex items-center justify-center">
                              <div className="absolute w-[26px] h-[26px] bg-white flex items-center justify-center rounded">
                                <canvas
                                  id="sb-qr"
                                  ref={canvasRef}
                                  style={{ height: "180px", width: "180px" }}
                                ></canvas>
                              </div>
                            </div>

                            {/* Tooltip Message */}
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
            <form>
              <div className="bn-formItem">
                <label
                  className="bn-formItem-label"
                  htmlFor="bn-formItem-username"
                >
                  Phone Number
                </label>
                <div>
                  <div className="css-4cffwv">
                    <div
                      className="bn-textField bn-textField__line data-size-large username-input-field css-8x1t0r"
                      role="group"
                      aria-labelledby="bn-formItem-username-label"
                    >
                      <input
                        className="bn-textField-input !w-[inherit]"
                        placeholder="Enter your phone number "
                        type="text"
                        role="textbox"
                        aria-label="Username field for email or phone number"
                        name="username"
                        id="bn-formItem-username"
                        autoCapitalize="off"
                        autoComplete="username"
                        data-e2e="input-username"
                        spellCheck="false"
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn-primary absolute right-[41%] top-[47%] -translate-y-1/2 px-3 py-1 text-sm"
                        onClick={handleOTP}
                      >
                        Send OTP
                      </button>
                    </div>
                  </div>
                </div>
                {showOTP && (
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
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Enter OTP"
                        autoFocus
                      />

                      <button
                        onClick={togglePasswordVisibility}
                        className="absolute top-[50%] translate-y-[-50%] right-3 text-font-color-100"
                      >
                        {showPassword ? <IconEyeOff /> : <IconEye />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                className="bn-button bn-button__primary data-size-large mt-6"
                style={{ width: "100%" }}
                type="submit"
                data-e2e="btn-accounts-form-submit"
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
    </>
  );
}
