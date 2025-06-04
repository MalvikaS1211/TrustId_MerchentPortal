// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { IconEye, IconEyeOff } from '@tabler/icons-react';
// import { profile_av } from '../../assets/images'

// export default function Lockscreen() {

//     const [showPassword, setShowPassword] = useState(false);
//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <>
//             <div className='sm:mb-12 mb-6 text-center flex flex-col items-center'>
//                 <img src={profile_av} alt='user profile' width="160" height="160" className='mb-4 sm:w-[160px] sm:h-[160px] sm:min-w-[160px] w-[100px] h-[100px] min-w-[100px] object-cover rounded-full p-1 bg-body-color border border-border-color shadow-shadow-sm saturate-50 transition-all hover:saturate-100' />
//                 <p className='sm:text-[20px]/[26px] font-medium'>
//                     Manuella Nevoresky
//                 </p>
//             </div>
//             <div className='form-control mb-20'>
//                 <label htmlFor='password' className='form-label'>
//                     Enter Password
//                 </label>
//                 <div className='relative'>
//                     <input
//                         type={showPassword ? 'text' : 'password'}
//                         id='password'
//                         placeholder='**********'
//                         className='form-input !pr-12'
//                     />
//                     <button onClick={togglePasswordVisibility} className='absolute top-[50%] translate-y-[-50%] right-3 text-font-color-100'>
//                         {showPassword ? <IconEyeOff /> : <IconEye />}
//                     </button>
//                 </div>
//             </div>
//             <Link to="/" className='btn btn-secondary large w-full uppercase'>
//                 Sign In
//             </Link>
//             <div className='text-center sm:mt-30 mt-6 text-font-color-100'>
//                 <p>
//                     Don't have an account yet?
//                 </p>
//                 <Link to="/auth-signup" className='text-primary'>
//                     Sign up here
//                 </Link>
//             </div>
//         </>
//     )
// }




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { profile_av } from '../../assets/images';
import Logo from "../../assets/images/TrustIdLogo.png";
import LoginLeftSide from '../../components/layout/LoginLeftSide';

export default function Lockscreen() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="flex flex-col lg:flex-row md:flex-row w-full min-h-screen">
            <main className="w-full lg:w-1/2">
                <div className="content-layout">
                    <div className="content-card first-screen-content">
                        <div className="icon-wrap">
                            <img src={Logo} alt="Logo" width="13%" />
                        </div>
                        <div className="text-center flex flex-col items-center mt-6 mb-8">
                            <img
                                src={profile_av}
                                alt="User Profile"
                                width="200"
                                height="200"
                                className="mb-4 w-[100px] h-[100px] sm:w-[160px] sm:h-[160px] object-cover rounded-full p-1 bg-body-color border border-border-color shadow-shadow-sm saturate-50 transition-all hover:saturate-100"
                            />
                            <p className="sm:text-[20px]/[26px] font-medium text-font-color-100">
                                Manuella Nevoresky
                            </p>
                        </div>
                        <div className="form-control mb-8">
                            <label htmlFor="password" className="form-label text-font-color-100">
                                Enter Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="**********"
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
                        <Link
                            to="/"
                            className="bn-button bn-button__primary data-size-large w-full uppercase"
                        >
                            Sign In
                        </Link>
                        <div className="flex items-center my-6">
                            <div className="flex-1 bg-[--color-line] h-[1px]"></div>
                            <div className="px-4 text-font-color-100">or</div>
                            <div className="flex-1 bg-[--color-line] h-[1px]"></div>
                        </div>
                        <div className="text-center text-font-color-100">
                            <p>Don't have an account yet?</p>
                            <Link to="/auth-signup" className="text-primary hover:underline focus:outline-none">
                                Sign up here
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <LoginLeftSide />
        </div>
    );
}
