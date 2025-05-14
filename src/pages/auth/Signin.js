import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconBrandGoogleFilled,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";

export default function Signin() {
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
      <div className="sm:mb-8 mb-6 text-center">
        <div className="sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2">
          Log In
        </div>
        <span className="text-font-color-100 inline-block">
          Free access to our dashboard.
        </span>
      </div>
      <div className="sm:mb-6 mb-4 text-center">
        {/* <Link to="#" className='btn btn-white !border-border-color'>
                    <IconBrandGoogleFilled className='fill-font-color-100' />
                    Sign in with Google
                </Link> */}
        <div className="mt-6 flex items-center">
          <span className="inline-block h-[1px] w-full bg-font-color-400"></span>
          <span className="px-30 text-font-color-400">OR</span>
          <span className="inline-block h-[1px] w-full bg-font-color-400"></span>
        </div>
      </div>
      <div className="">
        <div className="form-control mb-15">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>
          <div className="relative">
            <input
              type="tel"
              id="mobile"
              placeholder="Enter mobile number"
              className="form-input pr-28"
            />
            <button
              type="button"
              className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm"
              onClick={handleOTP}
            >
              Send OTP
            </button>
          </div>
        </div>
        {showOTP && (
          <div className="form-control mb-15">
            <label htmlFor="password" className="form-label">
              OTP
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter the password"
                className="form-input !pr-12"
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

        {/* <div className="flex flex-wrap items-center justify-between gap-10 sm:mb-30 mb-6">
          <div className="form-check">
            <input
              type="checkbox"
              id="forgotPassword"
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="forgotPassword">
              Remember me
            </label>
          </div>
          <Link
            to="/auth-forgot-password"
            className="text-primary sm:text-[16px]/[24px] text-[14px]/[20px]"
          >
            Forgot Password?
          </Link>
        </div> */}
        <Link to="/" className="btn btn-secondary large w-full uppercase">
          Log In
        </Link>
        {/* <div className="text-center sm:mt-30 mt-6 text-font-color-100">
          <p>Don't have an account yet?</p>
          <Link to="/auth-signup" className="text-primary">
            Sign up here
          </Link>
        </div> */}
      </div>
    </>
  );
}
