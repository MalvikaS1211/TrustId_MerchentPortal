// import React from 'react'
// import { Link } from 'react-router-dom'
// import { auth_two_step } from '../../assets/images'

// export default function TwoStep() {
//   return (
//     <>
//       <div className='flex justify-center sm:mb-6 mb-4'>
//         <img src={auth_two_step} width="240" height="178" alt='forgot password' />
//       </div>
//       <p className='sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2 text-center'>
//         2-step Verification
//       </p>
//       <p className='text-center sm:mb-12 mb-6 text-font-color-100'>
//         We sent a verification code to your email. Enter the code from the email in the field below.
//       </p>
//       <div className='flex gap-15 mb-20'>
//         <div className='form-control'>
//           <input type='number' id='twoStep1' placeholder='-' className='form-input text-center' />
//         </div>
//         <div className='form-control'>
//           <input type='number' id='twoStep2' placeholder='-' className='form-input text-center' />
//         </div>
//         <div className='form-control'>
//           <input type='number' id='twoStep3' placeholder='-' className='form-input text-center' />
//         </div>
//         <div className='form-control'>
//           <input type='number' id='twoStep4' placeholder='-' className='form-input text-center' />
//         </div>
//       </div>
//       <Link to="/" className='btn btn-secondary large w-full uppercase'>
//         Verify my account
//       </Link>
//       <div className='text-center sm:mt-30 mt-6 text-font-color-100'>
//         <p>
//           Haven't received it?
//         </p>
//         <Link to="#" className='text-primary'>
//           Resend a new code.
//         </Link>
//       </div>
//     </>
//   )
// }




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth_two_step } from '../../assets/images';
import Logo from "../../assets/images/TrustIdLogo.png";
import LoginLeftSide from "../../components/layout/LoginLeftSide";
import OtpInput from 'react-otp-input';

export default function TwoStep() {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('OTP submitted:', otp);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const handleResend = (e) => {
    e.preventDefault();
    console.log('Resending OTP...');
  };

  return (
    <div className="flex flex-col lg:flex-row md:flex-row w-full min-h-screen">
      <main className="w-full lg:w-1/2">
        <div className="content-layout">
          <div className="content-card first-screen-content">
            <div className="icon-wrap">
              <img src={Logo} alt="Logo" width="13%"></img>
            </div>
            <div className="flex justify-center my-2">
              <img
                src={auth_two_step}
                width="200"
                height="200"
                alt='two step verification'
                className="object-contain"
              />
            </div>

            <div className="card-page-title !mb-2 text-center">
              2-step Verification
            </div>

            <p className="text-center text-font-color-100 mb-6">
              We sent a verification code to your email. Enter the code from the email in the field below.
            </p>
            <div className="mb-8 flex justify-center">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="bn-textField-input !w-12 h-12 mx-1 text-center"
                  />
                )}
                inputType="number"
                shouldAutoFocus
                containerStyle="justify-center"
              />
            </div>

            <button
              onClick={handleVerify}
              disabled={otp.length < 6 || isSubmitting}
              className={`bn-button bn-button__primary data-size-large w-full uppercase ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {isSubmitting ? 'Verifying...' : 'Verify my account'}
            </button>

            <div className="flex items-center my-6">
              <div className="flex-1 bg-[--color-line] h-[1px]"></div>
              <div className="px-4">or</div>
              <div className="flex-1 bg-[--color-line] h-[1px]"></div>
            </div>

            <div className="text-center text-font-color-100">
              <p>Haven't received it?</p>
              <button
                onClick={handleResend}
                className="text-primary hover:underline focus:outline-none"
              >
                Resend a new code
              </button>
            </div>
          </div>
        </div>
      </main>
      <LoginLeftSide />
    </div>
  );
}