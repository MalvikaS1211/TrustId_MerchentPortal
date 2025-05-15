import React from "react";
import { Link, Outlet } from "react-router-dom";
import CompanyLogo from "../common/CompanyLogo";
import {
  IconBrandFacebookFilled,
  IconBrandGithubFilled,
  IconBrandTwitterFilled,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import QRcode from "./QRcode";

export default function AuthLayout() {
  return (
    <div className='admin-wrapper min-h-svh py-6 px-4 flex items-center justify-center bg-body-color after:fixed after:w-full after:h-full after:start-0 after:top-0 after:opacity-90 after:bg-[url("../../assets/images/auth.png")]'>
      <div className="container-fluid width-80">
        <div className="flex  w-full relative z-[1]">
          <div
            className="items-center justify-center lg:flex hidden"
            style={{ width: "90%" }}
          >
            <div className="max-w-[400px]">
              {/* <div className="mb-4">
                <CompanyLogo className="text-primary w-[116px] h-auto" />
              </div>
              <p className="mb-12 text-[32px]/[40px] font-medium">
                Build digital products with:
              </p>
              <div className="mb-8">
                <p className="text-[24px]/[30px] mb-2">All-in-one tool</p>
                <p>
                  Amazing Features to make your life easier & work efficient
                </p>
              </div>
              <div className="mb-12">
                <p className="text-[24px]/[30px] mb-2">
                  Easily add & manage your services
                </p>
                <p>
                  It brings together your tasks, projects, timelines, files and
                  more
                </p>
              </div> */}

              {/* <div className='flex flex-wrap gap-4 mb-4'>
                                <Link to="#" className='transition-all hover:text-primary'>
                                    Home
                                </Link>
                                <Link to="#" className='transition-all hover:text-primary'>
                                    About Us
                                </Link>
                                <Link to="#" className='transition-all hover:text-primary'>
                                    FAQs
                                </Link>
                            </div> */}

              <QRcode />
              <div className="sm:mb-6 mb-4 text-center">
                <div className="mt-6 flex items-center">
                  <span className="inline-block h-[1px] w-full bg-font-color-400"></span>
                  <span className="px-30 text-font-color-400">OR</span>
                  <span className="inline-block h-[1px] w-full bg-font-color-400"></span>
                </div>
              </div>
              <div
                className="flex flex-wrap gap-4 "
                style={{ justifyContent: "center" }}
              >
                <Link
                  to="#"
                  className="w-[34px] h-[34px] rounded-full bg-border-color flex items-center justify-center text-white transition-all hover:bg-secondary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-brand-google-play"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 3.71v16.58a.7 .7 0 0 0 1.05 .606l14.622 -8.42a.55 .55 0 0 0 0 -.953l-14.622 -8.419a.7 .7 0 0 0 -1.05 .607z" />
                    <path d="M15 9l-10.5 11.5" />
                    <path d="M4.5 3.5l10.5 11.5" />
                  </svg>
                  {/* <IconBrandFacebookFilled width="18" height="18" /> */}
                </Link>
                <Link
                  to="#"
                  className="w-[34px] h-[34px] rounded-full bg-border-color flex items-center justify-center text-white transition-all hover:bg-secondary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-brand-appstore"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M8 16l1.106 -1.99m1.4 -2.522l2.494 -4.488" />
                    <path d="M7 14h5m2.9 0h2.1" />
                    <path d="M16 16l-2.51 -4.518m-1.487 -2.677l-1 -1.805" />
                  </svg>
                  {/* <IconBrandTwitterFilled width="18" height="18" /> */}
                </Link>
                <Link
                  to="#"
                  className="w-[34px] h-[34px] rounded-full bg-border-color flex items-center justify-center text-white transition-all hover:bg-secondary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-brand-chrome"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M12 9h8.4" />
                    <path d="M14.598 13.5l-4.2 7.275" />
                    <path d="M9.402 13.5l-4.2 -7.275" />
                  </svg>
                  {/* <IconBrandGithubFilled width="18" height="18" /> */}
                </Link>
                <Link
                  to="#"
                  className="w-[34px] h-[34px] rounded-full bg-border-color flex items-center justify-center text-white transition-all hover:bg-secondary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-brand-firefox"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4.028 7.82a9 9 0 1 0 12.823 -3.4c-1.636 -1.02 -3.064 -1.02 -4.851 -1.02h-1.647" />
                    <path d="M4.914 9.485c-1.756 -1.569 -.805 -5.38 .109 -6.17c.086 .896 .585 1.208 1.111 1.685c.88 -.275 1.313 -.282 1.867 0c.82 -.91 1.694 -2.354 2.628 -2.093c-1.082 1.741 -.07 3.733 1.371 4.173c-.17 .975 -1.484 1.913 -2.76 2.686c-1.296 .938 -.722 1.85 0 2.234c.949 .506 3.611 -1 4.545 .354c-1.698 .102 -1.536 3.107 -3.983 2.727c2.523 .957 4.345 .462 5.458 -.34c1.965 -1.52 2.879 -3.542 2.879 -5.557c-.014 -1.398 .194 -2.695 -1.26 -4.75" />
                  </svg>
                  {/* <IconBrandYoutubeFilled width="18" height="18" /> */}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex  justify-center" style={{ width: "90%" }}>
            <div className="bg-card-color rounded-xl sm:p-4 p-2 max-w-[500px] w-full shadow-shadow-sm border border-dashed border-border-color">
              <div className="sm:max-h-[calc(100svh-48px-32px)] max-h-[calc(100svh-48px-16px)] sm:p-4 p-3 overflow-auto custom-scrollbar">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
