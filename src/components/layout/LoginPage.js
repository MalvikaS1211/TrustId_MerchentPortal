import React, { useState, useRef, useEffect } from "react";
import "../../components/css/Login.css";
import QRcode from "./QRcode";
import QRious from "qrious";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Logo from "../../assets/images/TrustIdLogo.png";
import IndiaFlag from "../../assets/images/IndiaFlag.png";
import QRCode, { QRCodeCanvas } from "qrcode.react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import LoginLeftSide from "./LoginLeftSide";
import {
  checkSession,
  createSession,
  generateOTP,
  verifyOTP,
} from "../Helper/ApiFunction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FaceRecognition from "./FaceRecognition";
import TrustId from "../../trustid/trustidsdk";
import { assignWith } from "lodash";
export default function LoginPage() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showOTP, setshowOTP] = useState(false);
  const [showOTPSection, setshowOTPSection] = useState(false);
  const [inputMobile, setInputMobile] = useState();
  const [OTP, setOTP] = useState();
  const [sendOTPBtn, setSendOTPBtn] = useState("Send OTP");
  const trustid = new TrustId();

  const [timer, setTimer] = useState(0);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const [connectExtension, setconnectExtension] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleExtension = async () => {
    try {
      const resConnect = await trustid.connect();
      const isConnected = resConnect?.data?.result?.approved;
      console.log("resConnect", resConnect?.data?.result?.approved);

      if (isConnected == true) {
        const resToken = await trustid.getAccessToken();
        console.log("Access token response:", resToken);
        const res = await trustid.getKYCData();
        console.log("KYC response:", res);

        const token = resToken?.data?.result?.token;
        console.log("token :", token);
        const userId = res?.data?.userdata?.userId;
        if (token && userId) {
          sessionStorage.setItem("Token", token);
          sessionStorage.setItem("UserId", userId);

          console.log("Login successful. userId:", userId);
          toast.success("Login Successful!");

          setTimeout(() => navigate("/dashboard"), 100);
        } else {
          sessionStorage.removeItem("Token");
          sessionStorage.removeItem("UserId");

          console.warn("Login rejected. Missing token or userId.");
          toast.error("Login Rejected!");
        }
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      toast.error(errorMessage);
      console.error("Error during login flow:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (timer <= 0) return;

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);
  const togglePasswordVisibility = () => {
    setshowOTP(!showOTP);
  };
  const [sessionId, setSessionId] = useState("");

  const handleOTP = async () => {
    if (!phone || phone.trim().length !== 10 || !/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const res = await generateOTP(phone);
      if (res?.status === 200) {
        setshowOTPSection(true);
        setSendOTPBtn("Resend OTP");
        setTimer(120); // Start 2-minute countdown
      } else {
        toast.error(res?.message || "User Not Exist");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await verifyOTP(phone, OTP);
      console.log(res, "handleLogin");

      if (res?.status == 200) {
        sessionStorage.setItem("Token", res?.token);
        sessionStorage.setItem("UserId", res?.data?.userId);
        // sessionStorage.setItem("Login", true);
        // sessionStorage.setItem("businessAdd", res?.data?.businessAdd);

        console.log("UserId", res?.data?.userId);
        toast.success(res.message);
        setshowOTPSection(false);

        navigate("/dashboard");
      } else {
        toast.error(res.message);
        setOTP("");
        console.error("OTP verification failed:", res?.message || res);
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  };
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (showTooltip) {
      genrateSeeionId();
    }
  }, [showTooltip]);
  const genrateSeeionId = async () => {
    try {
      const response = await createSession();
      console.log(response, "response", response?.session);

      if (response?.status === 200) {
        sessionStorage.setItem("SessionId", response?.session);
        console.log(response?.session, "Sessionid:::");
        setSessionId(response?.session);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error, "Erroe In the genrateSeeionId()");
    }
  };
  useEffect(() => {
    if (!showTooltip || !sessionId) return;
    let interval;
    const pollSession = async () => {
      try {
        if (!showTooltip) return;

        const response = await checkSession(sessionId);

        console.log(response, "checkSession");
        if (response?.status === 200 && response?.token) {
          console.log("Session Verified!", response);
          console.log(response?.userInfo, "Userinfo");
          sessionStorage.setItem("Token", response.token);
          sessionStorage.setItem("UserId", response?.userInfo?.userId);

          toast.success("Login successful");
          navigate("/dashboard");
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error in checkSession():", error);
      }
    };

    interval = setInterval(pollSession, 3000);

    return () => clearInterval(interval);
  }, [sessionId, showTooltip, navigate]);

  return (
    <>
      <div className="flex flex-col lg:flex-row md:flex-row  w-full min-h-screen">
        <main className="w-full lg:w-[50%] ">
          <div className="content-layout">
            <div className=" content-card first-screen-content">
              <div class="icon-wrap">
                <img src={Logo} alt="Logo" width="13%"></img>
              </div>
              <div className="flex justify-between items-center mb-8 login-header">
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
                                  {sessionId && (
                                    <QRCodeCanvas value={sessionId} />
                                  )}
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
                    className="bn-formItem-label phone-label"
                    htmlFor="bn-formItem-username"
                  >
                    Phone Number
                  </label>
                  <div>
                    <div className="relative w-full max-w-md mx-auto"></div>
                  </div>
                  <div className="flex items-center gap-1 ">
                    <div className="flex items-center pl-[7px] pr-[13px] py-[12px]  rounded-md border gap-1 country-code-div">
                      <img src={IndiaFlag} width={20}></img>
                      <span className="">+91</span>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={10}
                        className="w-full border border-gray-300 rounded px-4 py-2 pr-28 text-sm max-w-360:text-[13px] username-input-field"
                        placeholder="Enter number"
                        value={phone}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setPhone(value);
                          }
                        }}
                      />

                      <button
                        type="button"
                        className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 pl-3 pr-[18px] py-1 max-w-360:text-[13px] text-sm whitespace-nowrap send-otp-btn"
                        onClick={handleOTP}
                        disabled={timer > 0}
                      >
                        {timer > 0
                          ? `Resend in ${Math.floor(timer / 60)}:${(timer % 60)
                              .toString()
                              .padStart(2, "0")}`
                          : sendOTPBtn}
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
                  className="bn-button bn-button__primary data-size-large mt-6 "
                  style={{ width: "100%" }}
                  type="button"
                  data-e2e="btn-accounts-form-submit"
                  disabled={
                    !phone ||
                    phone.trim().length !== 10 ||
                    !OTP ||
                    OTP.trim().length === 0
                  }
                  onClick={handleLogin}
                >
                  Log In
                </button>
              </form>

              <div class="flex items-center my-4 md:mt-6 md:mb-2">
                <div class="flex-1 bg-[--color-line] h-[1px]"></div>
                <div class="px-4 or-section">or</div>
                <div class="flex-1 bg-[--color-line] h-[1px]"></div>
              </div>
              <button
                className="bn-button bn-button__primary data-size-large mt-6"
                style={{ width: "100%" }}
                type="button"
                data-e2e="btn-accounts-form-submit"
                // onClick={() => {
                //   trustid.getKYCData().then((res) => {
                //     console.log(res, "response ");
                //   });
                // }}
                onClick={handleExtension}
              >
                Connect with Trust Id
              </button>

              {/* <div className="face-detection-mobile block md:hidden">
                <div className="flex items-center my-4 md:mt-6 md:mb-2">
                  <div className="flex-1 bg-[--color-line] h-[1px]"></div>
                  <div className="px-4">or</div>
                  <div className="flex-1 bg-[--color-line] h-[1px]"></div>
                </div>

                <button
                  className="bn-button bn-button__primary data-size-large w-full"
                  type="button"
                  data-e2e="btn-accounts-form-submit"
                  onClick={openModal}
                >
                  Log In with Face ID
                </button>

                {isModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <FaceRecognition />
                    <div className="bg-white p-8 rounded-lg w-[90%] max-w-md text-center">
                      <h2 className="text-xl font-semibold mb-4">
                        Face ID Authentication
                      </h2>
                      <p className="mb-6">
                        Please look into your camera to log in.
                      </p>
                      <button
                        onClick={closeModal}
                        className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </main>
        <LoginLeftSide />
      </div>
    </>
  );
}
