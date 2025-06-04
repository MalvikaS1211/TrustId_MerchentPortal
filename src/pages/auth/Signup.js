// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Signup() {
//   const [showOTP, setShowOTP] = useState(false);

//   const handleOTP = async () => {
//     setShowOTP(true);
//     console.log("send otp");
//   };
//   return (
//     <>
//       <div className="sm:mb-8 mb-6 text-center">
//         <div className="sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2">
//           Create Account
//         </div>
//         <span className="text-font-color-100 inline-block">
//           Free access to our dashboard.
//         </span>
//       </div>
//       <div className="">
//         <div className="mb-15 flex gap-15">
//           <div className="form-control">
//             <label htmlFor="firstName" className="form-label">
//               Firstname
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               placeholder="John"
//               className="form-input"
//             />
//           </div>
//           <div className="form-control">
//             <label htmlFor="lastName" className="form-label">
//               Lastname
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               placeholder="Parker"
//               className="form-input"
//             />
//           </div>
//         </div>
//         <div className="form-control mb-15">
//           <label htmlFor="mobile" className="form-label">
//             Mobile
//           </label>
//           <div className="relative">
//             <input
//               type="tel"
//               id="mobile"
//               placeholder="Enter mobile number"
//               className="form-input pr-28"
//             />
//             <button
//               type="button"
//               className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm"
//               onClick={handleOTP}
//             >
//               Send OTP
//             </button>
//           </div>
//         </div>
//         {showOTP && (
//           <div className="form-control mb-15">
//             <label htmlFor="password" className="form-label">
//               OTP
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder=""
//               className="form-input"
//             />
//           </div>
//         )}

//         {/* <div className="form-control mb-15">
//           <label htmlFor="confirmPassword" className="form-label">
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             placeholder="8+ characters required"
//             className="form-input"
//           />
//         </div> */}
//         <div className="form-check mb-30">
//           <input
//             type="checkbox"
//             id="forgotPassword"
//             className="form-check-input"
//           />
//           <label className="form-check-label" htmlFor="forgotPassword">
//             I accept the{" "}
//             <Link to="/" className="text-primary">
//               Terms and Conditions
//             </Link>
//           </label>
//         </div>
//         <Link to="/" className="btn btn-secondary large w-full uppercase">
//           Sign Up
//         </Link>
//         <div className="text-center sm:mt-30 mt-6 text-font-color-100">
//           <p>Already have an account?</p>
//           <Link to="/auth-signin" className="text-primary">
//             Sign in here
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }



import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/TrustIdLogo.png";
import LoginLeftSide from "../../components/layout/LoginLeftSide";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
export default function Signup() {
  const [showOTPSection, setshowOTPSection] = useState(false);
  const [showOTP, setshowOTP] = useState(false);
  const [OTP, setOTP] = useState();
  const handleOTP = async () => {
    setshowOTPSection(true);
    console.log("send otp");
  };
  const togglePasswordVisibility = () => {
    setshowOTP(!showOTP);
  };
  return (
    <div className="flex flex-col lg:flex-row md:flex-row w-full min-h-screen">
      <main className="w-full lg:w-1/2">
        <div className="content-layout">
          <div className="content-card first-screen-content">
            <div className="flex flex-col justify-between ">

              <div class="icon-wrap">
                <img src={Logo} alt="Logo" width="13%"></img>
              </div>
              <div className="card-page-title !mb-0" role="heading" aria-level="1">
                Create Account
              </div>
            </div>

            <div className="bn-formItem">
              <span className="text-font-color-100 inline-block ">
                Free access to our dashboard.
              </span>

              <div className=" flex gap-4">
                <div className="bn-formItem flex-1">
                  <label htmlFor="firstName" className="bn-formItem-label">
                    Firstname
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    className="bn-textField-input w-full"
                  />
                </div>
                <div className="bn-formItem flex-1">
                  <label htmlFor="lastName" className="bn-formItem-label">
                    Lastname
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Parker"
                    className="bn-textField-input w-full"
                  />
                </div>
              </div>

              <div className="bn-formItem ">
                <label htmlFor="mobile" className="bn-formItem-label">
                  Mobile
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="mobile"
                    placeholder="Enter mobile number"
                    className="bn-textField-input w-full pr-28"
                  />
                  <button
                    type="button"
                    className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm whitespace-nowrap send-otp-btn"
                    onClick={handleOTP}
                  >
                    Send OTP
                  </button>
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

              <div className="form-check mb-6">
                <input
                  type="checkbox"
                  id="forgotPassword"
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="forgotPassword">
                  I accept the{" "}
                  <Link to="/" className="text-primary">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <Link
                to="/"
                className="bn-button bn-button__primary data-size-large w-full uppercase"
              >
                Sign Up
              </Link>

              <div className="flex items-center my-4 md:mt-6 md:">
                <div className="flex-1 bg-[--color-line] h-[1px]"></div>
                <div className="px-4">or</div>
                <div className="flex-1 bg-[--color-line] h-[1px]"></div>
              </div>

              <div className="text-center mt-6 text-font-color-100">
                <p>Already have an account?</p>
                <Link to="/auth-signin" className="text-primary">
                  Sign in here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <LoginLeftSide />
    </div>
  );
}