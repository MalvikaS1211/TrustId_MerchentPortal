// import React from 'react'
// import { auth_forgot_password } from '../../assets/images'
// import { Link } from 'react-router-dom'

// export default function ForgotPassword() {
//     return (
//         <>
//             <div className='flex justify-center sm:mb-6 mb-4'>
//                 <img src={auth_forgot_password} width="240" height="178" alt='forgot password' />
//             </div>
//             <p className='sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2 text-center'>
//                 Forgot password?
//             </p>
//             <p className='text-center sm:mb-12 mb-6 text-font-color-100'>
//                 Enter the email address you used when you joined and we'll send you instructions to reset your password.
//             </p>
//             <div className='form-control mb-20'>
//                 <label htmlFor='email' className='form-label'>
//                     Email
//                 </label>
//                 <input type='email' id='email' placeholder='name@example.com' className='form-input' />
//             </div>
//             <Link to="/auth-two-step" className='btn btn-secondary large w-full uppercase'>
//                 Submit
//             </Link>
//             <div className='text-center sm:mt-30 mt-6'>
//                 <Link to="/auth-signin" className='text-primary'>
//                     Back to Sign in
//                 </Link>
//             </div>
//         </>
//     )
// }


import React from 'react'
import { auth_forgot_password } from '../../assets/images'
import { Link } from 'react-router-dom'
import Logo from "../../assets/images/TrustIdLogo.png";
import LoginLeftSide from "../../components/layout/LoginLeftSide";

export default function ForgotPassword() {
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
                                src={auth_forgot_password}
                                width="200"
                                height="100"
                                alt='forgot password'
                                className="object-contain"
                            />
                        </div>

                        <div className="card-page-title !mb-2 text-center">
                            Forgot password?
                        </div>

                        <p className="text-center  text-font-color-100">
                            Enter the email address you used when you joined and we'll send you instructions to reset your password.
                        </p>

                        <div className="bn-formItem mb-6">
                            <label htmlFor="email" className="bn-formItem-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="name@example.com"
                                className="bn-textField-input w-full"
                            />
                        </div>

                        <Link
                            to="/auth-two-step"
                            className="bn-button bn-button__primary data-size-large w-full uppercase"
                        >
                            Submit
                        </Link>

                        <div className="flex items-center">
                            <div className="flex-1 bg-[--color-line] h-[1px]"></div>
                            <div className="px-4">or</div>
                            <div className="flex-1 bg-[--color-line] h-[1px]"></div>
                        </div>

                        <div className="text-center text-font-color-100">
                            <Link to="/auth-signin" className="text-primary">
                                Back to Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <LoginLeftSide />
        </div>
    )
}