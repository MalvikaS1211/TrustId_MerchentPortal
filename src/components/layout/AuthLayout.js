import React from "react";
import { Link, Outlet } from "react-router-dom";
import CompanyLogo from "../common/CompanyLogo";
import {
  IconBrandFacebookFilled,
  IconBrandGithubFilled,
  IconBrandTwitterFilled,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";

export default function AuthLayout() {
  return (
    <div className='admin-wrapper min-h-svh py-6 px-4 flex items-center justify-center bg-body-color after:fixed after:w-full after:h-full after:start-0 after:top-0 after:opacity-90 after:bg-[url("../../assets/images/auth.png")]'>
      <div className="container-fluid">
        <div className="flex gap-15 w-full relative z-[1]">
          <div className="items-center justify-center w-full lg:flex hidden">
            <div className="max-w-[400px]">
              <div className="mb-4">
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
              </div>

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

              {/* <div class="qr-container">
                <div class="qr-head">Quick Log In - Scan using App</div>
                <div class="qr-code">
                  <div>
                    <div>
                      <div
                        class="grecaptcha-badge"
                        data-style="none"
                        style={{
                          width: "256px",
                          height: "60px",
                          position: "fixed",
                          visibility: "hidden",
                        }}
                      >
                        <div class="grecaptcha-logo">
                          <iframe
                            title="reCAPTCHA"
                            width="256"
                            height="60"
                            role="presentation"
                            name="a-mtrcclo433ii"
                            frameborder="0"
                            scrolling="no"
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                            src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LcJ23MUAAAAANDBs4b17DfQ_tP93-0rqY0dloLq&amp;co=aHR0cHM6Ly93d3cuZGVsdGEuZXhjaGFuZ2U6NDQz&amp;hl=en&amp;type=image&amp;v=Hi8UmRMnhdOBM3IuViTkapUP&amp;theme=dark&amp;size=invisible&amp;badge=bottomleft&amp;cb=sm3figiy28lt"
                          ></iframe>
                        </div>
                        <div class="grecaptcha-error"></div>
                        <textarea
                          id="g-recaptcha-response-1"
                          name="g-recaptcha-response"
                          class="g-recaptcha-response"
                          style={{
                            width: "250px",
                            height: "40px",
                            border: "1px solid rgb(193, 193, 193)",
                            margin: "10px 25px",
                            padding: "0px",
                            resize: "none",
                            display: "none",
                          }}
                        ></textarea>
                      </div>
                      <iframe style={{ display: "none" }}></iframe>
                    </div>
                  </div>
                  <div class="style--Jzh7z">
                    <div class="style--BFGpf style--xLZBm">
                      <div class="style--Kp98A"></div>
                      <div class="style--Y6Dpn"></div>
                      <div class="style--ld52s"></div>
                      <div class="style--TzSbI"></div>
                      <div class="style--LEx3M style--u4LBI style--guITc">
                        <div class="style--z3rmc">
                          <div class="style--jQrm2 style--t7cPY">
                            <button
                              class="style--dobOo style--v0F06"
                              tabindex="0"
                              type="button"
                            >
                              <span
                                role="img"
                                class="style--jMfOx"
                                data-palette="DeltaButton"
                              >
                                <svg
                                  width="18"
                                  height="16"
                                  viewBox="0 0 9 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  data-palette="RefreshSymbol"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2.402.496a3.903 3.903 0 0 1 4.678.66l.92.872v-.835a.5.5 0 0 1 1 0v2.08a.5.5 0 0 1-.5.5H6.42a.5.5 0 0 1 0-1h.912l-.945-.897-.011-.01A2.903 2.903 0 0 0 2.89 1.37c-.556.31-.998.795-1.259 1.382a2.998 2.998 0 0 0-.183 1.873c.141.628.48 1.192.966 1.607a2.906 2.906 0 0 0 3.514.205.5.5 0 0 1 .559.83 3.906 3.906 0 0 1-4.722-.275A3.972 3.972 0 0 1 .472 4.845a3.998 3.998 0 0 1 .245-2.498A3.953 3.953 0 0 1 2.402.497Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                              </span>
                              <span class="" data-palette="DeltaButton">
                                Refresh
                              </span>
                            </button>
                          </div>
                          <svg height="150" width="150" viewBox="0 0 29 29">
                            <path
                              fill="#FFFFFF"
                              d="M0,0 h29v29H0z"
                              shape-rendering="crispEdges"
                            ></path>
                            <path
                              fill="#000000"
                              d="M0 0h7v1H0zM12 0h1v1H12zM14 0h1v1H14zM18 0h1v1H18zM20 0h1v1H20zM22,0 h7v1H22zM0 1h1v1H0zM6 1h1v1H6zM8 1h1v1H8zM10 1h1v1H10zM12 1h1v1H12zM14 1h2v1H14zM17 1h2v1H17zM20 1h1v1H20zM22 1h1v1H22zM28,1 h1v1H28zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM11 2h1v1H11zM15 2h1v1H15zM18 2h1v1H18zM22 2h1v1H22zM24 2h3v1H24zM28,2 h1v1H28zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM8 3h3v1H8zM12 3h3v1H12zM16 3h2v1H16zM20 3h1v1H20zM22 3h1v1H22zM24 3h3v1H24zM28,3 h1v1H28zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM9 4h1v1H9zM11 4h1v1H11zM14 4h1v1H14zM16 4h4v1H16zM22 4h1v1H22zM24 4h3v1H24zM28,4 h1v1H28zM0 5h1v1H0zM6 5h1v1H6zM8 5h2v1H8zM12 5h1v1H12zM15 5h1v1H15zM17 5h1v1H17zM20 5h1v1H20zM22 5h1v1H22zM28,5 h1v1H28zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14 6h1v1H14zM16 6h1v1H16zM18 6h1v1H18zM20 6h1v1H20zM22,6 h7v1H22zM9 7h2v1H9zM12 7h1v1H12zM14 7h3v1H14zM18 7h3v1H18zM0 8h5v1H0zM6 8h4v1H6zM11 8h2v1H11zM14 8h2v1H14zM17 8h1v1H17zM19 8h1v1H19zM21 8h1v1H21zM23 8h1v1H23zM25 8h1v1H25zM27 8h1v1H27zM1 9h1v1H1zM5 9h1v1H5zM7 9h2v1H7zM10 9h2v1H10zM13 9h2v1H13zM16 9h1v1H16zM19 9h2v1H19zM22 9h1v1H22zM24 9h2v1H24zM28,9 h1v1H28zM0 10h3v1H0zM4 10h1v1H4zM6 10h1v1H6zM10 10h1v1H10zM15 10h1v1H15zM20 10h2v1H20zM23 10h1v1H23zM25 10h3v1H25zM1 11h1v1H1zM3 11h2v1H3zM7 11h1v1H7zM12 11h1v1H12zM21 11h1v1H21zM23 11h3v1H23zM28,11 h1v1H28zM4 12h8v1H4zM13 12h2v1H13zM17 12h1v1H17zM19 12h1v1H19zM23 12h3v1H23zM1 13h1v1H1zM3 13h3v1H3zM7 13h1v1H7zM9 13h1v1H9zM11 13h1v1H11zM14 13h12v1H14zM27 13h1v1H27zM0 14h2v1H0zM5 14h2v1H5zM9 14h2v1H9zM14 14h2v1H14zM20 14h3v1H20zM0 15h1v1H0zM4 15h2v1H4zM9 15h4v1H9zM18 15h1v1H18zM20 15h1v1H20zM22 15h1v1H22zM24 15h2v1H24zM1 16h2v1H1zM4 16h1v1H4zM6 16h3v1H6zM14 16h1v1H14zM17 16h1v1H17zM19 16h1v1H19zM23 16h2v1H23zM27,16 h2v1H27zM0 17h3v1H0zM5 17h1v1H5zM7 17h3v1H7zM11 17h2v1H11zM14 17h1v1H14zM16 17h1v1H16zM18 17h3v1H18zM22 17h5v1H22zM28,17 h1v1H28zM0 18h1v1H0zM3 18h2v1H3zM6 18h3v1H6zM12 18h1v1H12zM14 18h2v1H14zM17 18h2v1H17zM24 18h2v1H24zM27 18h1v1H27zM0 19h1v1H0zM2 19h1v1H2zM4 19h1v1H4zM7 19h2v1H7zM10 19h1v1H10zM12 19h1v1H12zM14 19h1v1H14zM18 19h1v1H18zM21 19h2v1H21zM24 19h2v1H24zM27,19 h2v1H27zM0 20h1v1H0zM4 20h3v1H4zM8 20h1v1H8zM11 20h1v1H11zM13 20h5v1H13zM19 20h6v1H19zM27,20 h2v1H27zM8 21h1v1H8zM10 21h3v1H10zM16 21h1v1H16zM20 21h1v1H20zM24 21h2v1H24zM28,21 h1v1H28zM0 22h7v1H0zM8 22h3v1H8zM13 22h1v1H13zM15 22h3v1H15zM20 22h1v1H20zM22 22h1v1H22zM24 22h1v1H24zM0 23h1v1H0zM6 23h1v1H6zM11 23h1v1H11zM14 23h2v1H14zM19 23h2v1H19zM24 23h2v1H24zM27,23 h2v1H27zM0 24h1v1H0zM2 24h3v1H2zM6 24h1v1H6zM8 24h1v1H8zM10 24h1v1H10zM12 24h1v1H12zM14 24h2v1H14zM20 24h6v1H20zM27 24h1v1H27zM0 25h1v1H0zM2 25h3v1H2zM6 25h1v1H6zM8 25h1v1H8zM10 25h2v1H10zM13 25h2v1H13zM16 25h5v1H16zM23 25h2v1H23zM26 25h1v1H26zM28,25 h1v1H28zM0 26h1v1H0zM2 26h3v1H2zM6 26h1v1H6zM8 26h1v1H8zM13 26h1v1H13zM15 26h3v1H15zM21 26h1v1H21zM23 26h3v1H23zM27 26h1v1H27zM0 27h1v1H0zM6 27h1v1H6zM8 27h2v1H8zM12 27h1v1H12zM15 27h1v1H15zM18 27h5v1H18zM25 27h1v1H25zM27 27h1v1H27zM0 28h7v1H0zM8 28h5v1H8zM14 28h2v1H14zM19 28h1v1H19zM22 28h4v1H22z"
                              shape-rendering="crispEdges"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="style--Av21i style--bZx7P">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 71.31 139.34"
                        data-palette="ScanToLoginDark"
                      >
                        <defs>
                          <linearGradient
                            id="A"
                            x1="43.67"
                            y1="9.54"
                            x2="45.21"
                            y2="24.1"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0" stop-opacity="0"></stop>
                            <stop
                              offset=".25"
                              stop-color="#08090a"
                              stop-opacity=".04"
                            ></stop>
                            <stop
                              offset=".5"
                              stop-color="#2a2e34"
                              stop-opacity=".22"
                            ></stop>
                            <stop
                              offset=".75"
                              stop-color="#4285f4"
                              stop-opacity=".13"
                            ></stop>
                            <stop
                              offset="1"
                              stop-color="#2894f9"
                              stop-opacity=".53"
                            ></stop>
                          </linearGradient>
                          <path
                            id="B"
                            d="M6.93 45.9h6.06a.87.87 0 0 1 .87.87h0a.87.87 0 0 1-.87.87H6.93a.87.87 0 0 1-.87-.87h0a.87.87 0 0 1 .87-.87z"
                          ></path>
                          <path
                            id="C"
                            d="m19.92,45.9h6.06c.48,0,.87.39.87.87h0c0,.48-.39.87-.87.87h-6.06c-.48,0-.87-.39-.87-.87h0c0-.48.39-.87.87-.87Z"
                          ></path>
                          <path
                            id="D"
                            d="m19.92,132.52h6.06c.48,0,.87.39.87.87h0c0,.48-.39.87-.87.87h-6.06c-.48,0-.87-.39-.87-.87h0c0-.48.39-.87.87-.87Z"
                          ></path>
                          <path
                            id="E"
                            d="M45.9 45.9h6.06a.87.87 0 0 1 .87.87h0a.87.87 0 0 1-.87.87H45.9a.87.87 0 0 1-.87-.87h0a.87.87 0 0 1 .87-.87z"
                          ></path>
                        </defs>
                        <path
                          d="M1.83 5.2C2.46 4.39 3 3.51 3.76 2.81 5.33 1.32 7.34.36 9.48.07c.43-.05.87-.07 1.3-.07h48.4c2.39-.02 4.71.83 6.54 2.38 1.85 1.54 3.08 3.69 3.49 6.07.07.39.11.79.11 1.19v119.94c-.04 1.32-.35 2.61-.91 3.8l-.08.23c-.04.23-.13.45-.27.63a10.58 10.58 0 0 1-3.86 3.83c-1.54.84-3.26 1.27-5.01 1.27-16.13-.01-32.26-.01-48.39 0-1.75 0-3.47-.43-5.01-1.27a11.98 11.98 0 0 1-2.29-1.79c-.56-.58-1.06-1.21-1.48-1.9a28.36 28.36 0 0 0-.68-1.35c-.26-.59-.46-1.21-.6-1.84a13.62 13.62 0 0 1-.26-2.92V10.97C.43 9.23.75 7.5 1.41 5.9c.07-.27.21-.51.42-.69z"
                          fill="#232323"
                        ></path>
                        <path
                          d="M69.51 32.43h.07c.15.03.32.04.26.26a2.45 2.45 0 0 1 .03.54v13.95c.02.21 0 .41-.07.61a.27.27 0 0 1-.05.15h-.23V37.32v-4.89z"
                          fill="#363636"
                        ></path>
                        <path d="M1.75 69.57V11.43c-.05-1.64.27-3.26.95-4.75.41-.82.92-1.59 1.52-2.28.8-.91 1.75-1.66 2.83-2.22.94-.48 1.95-.81 3-.95.74-.08 1.48-.1 2.22-.07h46.66a8.78 8.78 0 0 1 3.42.76c1.12.46 2.13 1.14 2.98 2a9.74 9.74 0 0 1 2.51 4.22c.29 1.11.43 2.26.4 3.41v116.24c0 1.64-.21 3.25-.95 4.75-.4.83-.91 1.59-1.52 2.28a9.84 9.84 0 0 1-5.74 3.17c-.47.07-.95.09-1.43.08H11.24c-2.02 0-3.98-.67-5.57-1.9-1.96-1.45-3.29-3.59-3.73-5.99a12.02 12.02 0 0 1-.18-2.24V69.58z"></path>
                        <path
                          d="M69.82 32.6h.08c.06.21.09.42.09.63v14.01c.02.11 0 .22-.02.32-.03.11-.08.2-.15.29h-.08V33.09c0-.16-.07-.35.08-.5z"
                          fill="#383838"
                        ></path>
                        <path
                          d="M.5 51.49H.26c-.1-.17-.14-.37-.12-.56v-8.85c0-.17.03-.32.04-.49.09-.06.2-.09.32-.08v9.99z"
                          fill="#363636"
                        ></path>
                        <path
                          d="m.5,24.01c-.36.04-.49-.14-.49-.48v-4.06c0-.33.1-.55.49-.55v5.1Z"
                          fill="#383838"
                        ></path>
                        <path
                          d="m.5,38.88c-.11,0-.24.04-.32-.08-.04-.18-.05-.37-.05-.55v-8.67c0-.18,0-.35.04-.53.08-.12.21-.08.32-.08v9.91Z"
                          fill="#363636"
                        ></path>
                        <g fill="#101013">
                          <path d="M4.06 69.65V8.75c.03-1.47.58-2.89 1.55-3.99.98-1.1 2.31-1.82 3.77-2.03.41-.05.82-.08 1.23-.07h5.99c.68 0 .98.32.99.97a4.06 4.06 0 0 0 .31 1.53c.2.48.5.92.87 1.29s.82.66 1.3.86c.49.2 1.01.29 1.53.29h26.86a4 4 0 0 0 2.77-1.16 3.95 3.95 0 0 0 1.17-2.77c0-.73.29-1.02 1.02-1.02h6.48a6.18 6.18 0 0 1 3.34 1.09 6.28 6.28 0 0 1 2.21 2.73 6.89 6.89 0 0 1 .5 2.73v121.19c0 1.51-.54 2.97-1.53 4.11s-2.35 1.89-3.84 2.1a7.93 7.93 0 0 1-.98.07H10.17c-1.47-.03-2.89-.58-3.99-1.55-1.1-.98-1.82-2.31-2.03-3.77-.05-.41-.08-.82-.07-1.23l-.02-60.45z"></path>
                          <rect
                            x="4.33"
                            y="36.38"
                            width="62.36"
                            height="13.86"
                            rx="1"
                          ></rect>
                          <rect
                            x="4.33"
                            y="53.7"
                            width="62.36"
                            height="7.8"
                            rx="1"
                          ></rect>
                          <path d="m4.33,104.07c0-.55.45-1,1-1l59.33.07c.55,0,1,.45,1,1v22.77c0,5.53-4.48,10.01-10.01,10l-41.33-.05c-5.52,0-9.99-4.48-9.99-10v-22.79Z"></path>
                          <path d="M4.33 72.89c0-.55.45-1 1-1l59.42.05c.55 0 1 .45 1 1v30.91c0 .55-.45 1-1 1l-59.42-.05c-.55 0-1-.45-1-1V72.89z"></path>
                        </g>
                        <g fill="#212126">
                          <rect
                            x="14.72"
                            y="9.53"
                            width="24.25"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="6.93"
                            y="38.11"
                            width="6.06"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="6.93"
                            y="124.72"
                            width="6.06"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="6.93"
                            y="63.23"
                            width="19.05"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="27.72"
                            y="63.23"
                            width="7.8"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="38.11"
                            y="63.23"
                            width="7.8"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="48.5"
                            y="63.23"
                            width="7.8"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="19.92"
                            y="38.11"
                            width="6.06"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="19.92"
                            y="124.72"
                            width="6.06"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="32.91"
                            y="38.11"
                            width="6.06"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="32.91"
                            y="124.72"
                            width="6.06"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="45.9"
                            y="38.11"
                            width="6.06"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="45.9"
                            y="124.72"
                            width="6.06"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="58.9"
                            y="38.11"
                            width="6.06"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <rect
                            x="57.73"
                            y="124.72"
                            width="6.06"
                            height="6.06"
                            rx="1"
                          ></rect>
                          <use xmlnsXlink="#B"></use>
                          <use xmlnsXlink="#B" y="86.62"></use>
                          <rect
                            x="6.93"
                            y="55.43"
                            width="4.33"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="6.93"
                            y="72.75"
                            width="4.33"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="6.93"
                            y="81.42"
                            width="4.33"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="6.93"
                            y="90.08"
                            width="4.33"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="6.93"
                            y="98.74"
                            width="4.33"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="6.93"
                            y="107.4"
                            width="4.33"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="6.93"
                            y="116.06"
                            width="4.33"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="15.59"
                            y="55.43"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="15.59"
                            y="72.75"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="15.59"
                            y="81.42"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="15.59"
                            y="90.08"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="15.59"
                            y="98.74"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="15.59"
                            y="107.4"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="15.59"
                            y="116.06"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="30.31"
                            y="55.43"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="30.31"
                            y="72.75"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="30.31"
                            y="81.42"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="30.31"
                            y="90.08"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="30.31"
                            y="98.74"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="30.31"
                            y="107.4"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="30.31"
                            y="116.06"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="44.17"
                            y="55.43"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="44.17"
                            y="72.75"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="44.17"
                            y="81.42"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="44.17"
                            y="90.08"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="44.17"
                            y="98.74"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="44.17"
                            y="107.4"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="44.17"
                            y="116.06"
                            width="10.39"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="58.03"
                            y="55.43"
                            width="6.93"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="58.03"
                            y="72.75"
                            width="6.93"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="58.03"
                            y="81.42"
                            width="6.93"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="58.03"
                            y="90.08"
                            width="6.93"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="58.03"
                            y="98.74"
                            width="6.93"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="58.03"
                            y="107.4"
                            width="6.93"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <rect
                            x="58.03"
                            y="116.06"
                            width="6.93"
                            height="2.6"
                            rx="1"
                          ></rect>
                          <use xmlnsXlink="#C"></use>
                          <use xmlnsXlink="#D"></use>
                          <use xmlnsXlink="#C" x="12.99"></use>
                          <use xmlnsXlink="#D" x="12.99"></use>
                          <use xmlnsXlink="#E"></use>
                          <use xmlnsXlink="#E" y="86.62"></use>
                          <path d="M58.9 45.9h6.06a.87.87 0 0 1 .87.87h0a.87.87 0 0 1-.87.87H58.9a.87.87 0 0 1-.87-.87h0a.87.87 0 0 1 .87-.87zm0 86.62h4.13a.87.87 0 0 1 .87.87h0a.87.87 0 0 1-.87.87H58.9a.87.87 0 0 1-.87-.87h0a.87.87 0 0 1 .87-.87z"></path>
                          <rect
                            x="6.06"
                            y="19.05"
                            width="40.71"
                            height="14.72"
                            rx="1"
                          ></rect>
                          <path d="M48.5 20.05c0-.55.45-1 1-1h17.19v14.72H49.5c-.55 0-1-.45-1-1V20.05z"></path>
                        </g>
                        <path
                          d="M39.21 5.45s0 .06-.02.09-.04.05-.07.07a4.53 4.53 0 0 1-.74.04h-6.77c-.25 0-.49-.02-.74-.06-.03-.01-.05-.04-.07-.07s-.02-.06-.02-.09c-.1-.21 0-.32.2-.36.1-.02.21-.03.32-.02h7.38a1.72 1.72 0 0 1 .32.02c.2.06.32.16.21.37z"
                          fill="#c6c6c6"
                        ></path>
                        <path
                          d="m39.21,5.45c0-.32-.22-.25-.4-.25h-7.7c-.18,0-.34,0-.32.25-.15-.17-.07-.33,0-.5.2-.1.41-.15.63-.13h7.13c.22-.02.44.03.63.13.1.16.17.32.03.49Z"
                          fill="#c4c4c4"
                        ></path>
                        <path
                          d="M39.2 4.96h-8.4c.06-.09.14-.17.24-.21s.21-.06.32-.04h7.27c.11-.02.22 0 .32.04s.19.12.24.21z"
                          fill="#c9c9c9"
                        ></path>
                        <path
                          d="M30.88 5.6c.11-.12.25-.08.39-.08h7.47c.13 0 .28-.04.39.08-.13.18-.32.17-.52.17H31.4c-.09.02-.19 0-.28-.02-.09-.03-.17-.08-.23-.15z"
                          fill="#c2c2c2"
                        ></path>
                        <path
                          d="M41.27 5.11c.01-.23.1-.45.26-.61.16-.17.37-.27.6-.29.25-.04.5.02.71.16s.36.35.42.6c0 .21-.06.43-.17.61a1.15 1.15 0 0 1-.47.43c-.18.08-.37.1-.56.05a.81.81 0 0 1-.46-.33c-.12-.2-.38-.32-.34-.61z"
                          fill="#9e9e9e"
                        ></path>
                        <path
                          d="m41.26,5.11c.16.2.32.42.49.61.08.09.18.16.29.2.11.04.23.06.35.04.12-.02.23-.06.32-.13s.17-.17.22-.27c.09-.22.41-.32.32-.6.07.2.08.41.03.61-.06.2-.18.38-.34.51-.18.13-.39.2-.61.21-.22,0-.44-.05-.62-.17-.17-.1-.31-.25-.39-.43-.08-.18-.1-.38-.05-.57Z"
                          fill="#bfbfbf"
                        ></path>
                        <path
                          d="M.18 41.6c.07.15.1.31.08.48v9.42H.18c-.12-.15-.18-.34-.17-.53v-8.84c-.02-.09 0-.19.02-.28a.61.61 0 0 1 .15-.24zm0-12.55c.13.12.08.28.08.42v8.88c0 .14.05.32-.08.42-.19-.09-.16-.26-.16-.42v-8.88c0-.16-.03-.34.17-.42z"
                          fill="#383838"
                        ></path>
                        <path
                          d="m41.77,5.03c.04-.12.13-.22.24-.28.11-.06.25-.07.37-.03.07,0,.13.03.19.06.06.03.11.08.15.13.04.05.07.11.09.18.02.06.02.13.02.2-.14.08-.29.13-.45.14-.16.02-.31,0-.46-.05-.17-.03-.25-.15-.16-.34Z"
                          fill="#c1c1c1"
                        ></path>
                        <path
                          d="M41.77 5.03c0 .2.09.26.27.25h.8c-.13.41-.43.6-.75.48a.57.57 0 0 1-.31-.3.58.58 0 0 1-.01-.43z"
                          fill="#a3a3a3"
                        ></path>
                        <circle
                          cx="47.31"
                          cy="46.08"
                          r="24"
                          fill="rgba(255, 255, 255, .2)"
                        ></circle>
                        <path
                          d="M44.71 35.08H38.3c-.55 0-1 .45-1 1v6.41m12.71-7.41h6.41c.55 0 1 .45 1 1v6.41M44.71 56.41H38.3c-.55 0-1-.45-1-1V49m12.71 7.41h6.41c.55 0 1-.45 1-1V49"
                          fill="none"
                          stroke="#fff"
                          stroke-width="2"
                        ></path>
                        <path
                          d="m34.31,44.41h26c.55,0,1,.45,1,1h0c0,.55-.45,1-1,1h-26c-.55,0-1-.45-1-1h0c0-.55.45-1,1-1Z"
                          fill="#fff"
                        ></path>
                        <path
                          d="m54.98,23.33l-10.22-9.79-2.52.06-6.77,11.6c3.56-2.1,7.58-3.05,12.01-3.05,2.63,0,5.13.4,7.5,1.18Z"
                          fill="url(#A)"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="sm:mb-6 mb-4 text-center">
                <div className="mt-6 flex items-center">
                  <span className="inline-block h-[1px] w-full bg-font-color-400"></span>
                  <span className="px-30 text-font-color-400">OR</span>
                  <span className="inline-block h-[1px] w-full bg-font-color-400"></span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
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
          <div className="flex items-center justify-center w-full">
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
