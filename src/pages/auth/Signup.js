import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showOTP, setShowOTP] = useState(false);

  const handleOTP = async () => {
    setShowOTP(true);
    console.log("send otp");
  };
  return (
    <>
      <div className="sm:mb-8 mb-6 text-center">
        <div className="sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2">
          Create Account
        </div>
        <span className="text-font-color-100 inline-block">
          Free access to our dashboard.
        </span>
      </div>
      <div className="">
        <div className="mb-15 flex gap-15">
          <div className="form-control">
            <label htmlFor="firstName" className="form-label">
              Firstname
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="John"
              className="form-input"
            />
          </div>
          <div className="form-control">
            <label htmlFor="lastName" className="form-label">
              Lastname
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Parker"
              className="form-input"
            />
          </div>
        </div>
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
            <input
              type="password"
              id="password"
              placeholder=""
              className="form-input"
            />
          </div>
        )}

        {/* <div className="form-control mb-15">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="8+ characters required"
            className="form-input"
          />
        </div> */}
        <div className="form-check mb-30">
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
        <Link to="/" className="btn btn-secondary large w-full uppercase">
          Sign Up
        </Link>
        <div className="text-center sm:mt-30 mt-6 text-font-color-100">
          <p>Already have an account?</p>
          <Link to="/auth-signin" className="text-primary">
            Sign in here
          </Link>
        </div>
      </div>
    </>
  );
}
