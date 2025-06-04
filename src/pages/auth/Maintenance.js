// import React from 'react'
// import { Link } from 'react-router-dom'
// import { auth_maintenance } from '../../assets/images'

// export default function Maintenance() {
//     return (
//         <>
//             <div className='flex justify-center sm:mb-6 mb-4'>
//                 <img src={auth_maintenance} width="240" height="148" alt='auth maintenance' />
//             </div>
//             <p className='sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2 text-center'>
//                 Under Construction!
//             </p>
//             <p className='text-center sm:mb-12 mb-6 text-font-color-100'>
//                 To make things right we need some time to rebuild
//             </p>
//             <div className='floating-form-control mb-20'>
//                 <input type='email' id='email' className='form-input' placeholder="Email" />
//                 <label htmlFor='email' className='form-label'>Email</label>
//             </div>
//             <Link to="/" className='btn btn-secondary large w-full uppercase mb-20'>
//                 Send
//             </Link>
//             <p className='text-font-color-100 text-center'>
//                 Get notified when we are done.
//             </p>
//         </>
//     )
// }





import React from 'react';
import { Link } from 'react-router-dom';
import { auth_maintenance } from '../../assets/images';
import Logo from "../../assets/images/TrustIdLogo.png";
import LoginLeftSide from "../../components/layout/LoginLeftSide";
export default function Maintenance() {
    return (
        <div className="flex flex-col lg:flex-row md:flex-row w-full min-h-screen">
            <main className="w-full lg:w-1/2">
                <div className="content-layout">
                    <div className="content-card first-screen-content">
                        <div className="icon-wrap">
                            <img src={Logo} alt="Logo" width="13%" />
                        </div>
                        <div className="flex justify-center mt-6 mb-4">
                            <img
                                src={auth_maintenance}
                                width="200"
                                height="200"
                                alt="auth maintenance"
                                className="object-contain"
                            />
                        </div>
                        <p className="sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2 text-center">
                            Under Construction!
                        </p>
                        <p className="text-center sm:mb-12 mb-6 text-font-color-100">
                            To make things right we need some time to rebuild
                        </p>
                        <div className="floating-form-control mb-8">
                            <input
                                type="email"
                                id="email"
                                className="form-input"
                                placeholder="Email"
                            />
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                        </div>
                        <Link
                            to="/"
                            className="bn-button bn-button__primary data-size-large w-full uppercase mb-20"
                        >
                            Send
                        </Link>
                        <p className="text-font-color-100 text-center">
                            Get notified when we are done.
                        </p>
                    </div>
                </div>
            </main>
            <LoginLeftSide />
        </div>
    );
}
