// import React from "react";
// import Breadcrumb from "./common/Breadcrumb";

// export default function TeamManagement() {
//     // const []
//   const breadcrumbItem = [
//     {
//       name: "Team Management",
//     },
//   ];
//   return (
//     <>
//       <div className="md:px-6 sm:px-3 pt-4">
//         <div className="container-fluid">
//           <Breadcrumb breadcrumbItem={breadcrumbItem} />
//           <div className="lg:w-[30%] md:w-[30%] w-full mx-auto  bg-white rounded-lg business-container min-h-[70vh]">
//             <form className="space-y-4  content-card first-screen-content w-full p-[30px]">
//               <h2 className="text-2xl font-bold mb-[32px] ">Add Employee</h2>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Mobile Number
//                 </label>
//                 <input
//                   type="text"
//                   name="businessName"
//                   //   value={businessName}
//                   //   onChange={(e) => setBusinessName(e.target.value)}
//                   className="bn-textField-input w-full"
//                   placeholder="Enter your business name"
//                   required
//                 />
//               </div>

//               <button
//                 type="button"
//                 // onClick={handleSubmit}
//                 className="bn-button bn-button__primary data-size-large w-full mt-[30px]"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import {
  IconArchiveFilled,
  IconFileFilled,
  IconLayout2Filled,
  IconSearch,
} from "@tabler/icons-react";
import {
  avatar1,
  avatar10,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar8,
  avatar9,
} from "../../src/assets/images";
import plus from "../assets/images/plus.png";
import Breadcrumb from "./common/Breadcrumb";
import { QRCodeCanvas } from "qrcode.react";
import { useSelector } from "react-redux";
import { addEmployee, getEmployeeData } from "./Helper/ApiFunction";
import moment from "moment";
import ReactDataTable, { Alignment } from "react-data-table-component";
import toast from "react-hot-toast";
export default function TeamManagement() {
  const breadcrumbItem = [
    // {
    //   name: "More Pages",
    // },
    {
      name: "Team Management",
    },
  ];
  const [open, setOpen] = useState(false);
  const [showScanQR, setShowScanQR] = useState(false);
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const user = useSelector((state) => state.user.userInfo);
  const [KYCTransactions, setKYCTransactions] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const addEmp = async () => {
    const businessId = user?.data?.businessId;
    const userId = user?.data?.userId;

    // if (!userId || !businessId || !mobileNumber) {
    //   toast.error("Missing required information.");
    //   return;
    // }

    try {
      const res = await addEmployee(userId, businessId, mobileNumber);

      if (res?.status === true) {
        console.log("handle AddEmployee", res);
        toast.success("Employee added successfully!");
        setMobileNumber("");
      } else {
        toast.error(res?.message || "Failed to add employee.");
      }
    } catch (error) {
      console.error("Error in addEmp:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleData = async () => {
    try {
      const BusinessId = user?.data?.businessId;
      console.log(BusinessId, "BusinessId");
      const res = await getEmployeeData(BusinessId);
      console.log("EmployeeData", res);
      if (res?.data) {
        setEmployeeData(res.data);
      } else {
        setEmployeeData([]);
      }
    } catch (error) {
      console.error("Error fetching KYC data:", error);
      setEmployeeData([]);
    }
  };

  useEffect(() => {
    handleData();
    console.log(employeeData, "employeeData");
  }, [user]);

  const columnsFilter = [
    {
      name: "Sr",
      selector: (row, index) => index + 1,
      width: "60px",
    },

    {
      name: "Name",
      selector: (row) => row.userDetails.name || "N/A",
      width: "250px",
      style: {
        justifyContent: "flex-start",
        whiteSpace: "normal",
        wordWrap: "break-word",
      },
      wrap: true,
    },
    // {
    //   name: "Business Id",
    //   selector: (row) => row.businessId || "N/A",
    //   width: "250px",
    //   style: {
    //     justifyContent: "flex-start",
    //     whiteSpace: "normal",
    //     wordWrap: "break-word",
    //   },
    //   wrap: true,
    // },
    // {
    //   name: "Business Id",
    //   selector: (row) => row.businessName || "N/A",
    //   width: "250px",
    //   style: {
    //     justifyContent: "flex-start",
    //     whiteSpace: "normal",
    //     wordWrap: "break-word",
    //   },
    //   wrap: true,
    // },
    {
      name: "Date of Joining",
      selector: (row) =>
        row.joiningDate
          ? moment(row.joiningDate).format("DD-MM-YYYY HH:MM A")
          : "N/A",
      width: "250px",
      style: {
        justifyContent: "flex-start",
        whiteSpace: "normal",
        wordWrap: "break-word",
      },
      wrap: true,
    },
  ];

  return (
    <div className="md:px-6 sm:px-3 pt-4">
      <div className="container-fluid">
        <Breadcrumb breadcrumbItem={breadcrumbItem} />{" "}
        {/* <WelcomeHeader income /> */}
        <div className="grid xxl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          <div className="card bg-card-color rounded-xl md:p-6 p-4 flex md:gap-4 gap-2 items-center border border-dashed border-border-color">
            <div className="sm:w-[56px] sm:h-[56px] sm:min-w-[56px] w-[40px] h-[40px] min-w-[40px] text-secondary bg-primary-10 rounded-full flex items-center justify-center">
              <IconArchiveFilled />
            </div>
            <div>
              <p className="text-font-color-100">Total Projects</p>
              <h5 className="text-[20px]/[24px] font-medium">24</h5>
            </div>
          </div>
          <div className="card bg-card-color rounded-xl md:p-6 p-4 flex md:gap-4 gap-2 items-center border border-dashed border-border-color">
            <div className="sm:w-[56px] sm:h-[56px] sm:min-w-[56px] w-[40px] h-[40px] min-w-[40px] text-secondary bg-primary-10 rounded-full flex items-center justify-center">
              <IconLayout2Filled />
            </div>
            <div>
              <p className="text-font-color-100">Completed Projects</p>
              <h5 className="text-[20px]/[24px] font-medium">22</h5>
            </div>
          </div>
          <div className="card bg-card-color rounded-xl md:p-6 p-4 flex md:gap-4 gap-2 items-center border border-dashed border-border-color">
            <div className="sm:w-[56px] sm:h-[56px] sm:min-w-[56px] w-[40px] h-[40px] min-w-[40px] text-secondary bg-primary-10 rounded-full flex items-center justify-center">
              <IconFileFilled />
            </div>
            <div>
              <p className="text-font-color-100">Pending Projects</p>
              <h5 className="text-[20px]/[24px] font-medium">06</h5>
            </div>
          </div>
          <div className="card bg-card-color rounded-xl md:p-6 p-4 border border-dashed border-border-color">
            <label className="form-label mb-5 inline-block">Search</label>
            <div className="form-control flex w-full">
              <input
                type="text"
                id="team_board_search"
                className="form-input !rounded-e-none !py-[6px]"
                placeholder="Search..."
              />
              <button
                className="btn border border-border-color !rounded-s-none"
                type="button"
              >
                <IconSearch className="w-[20px] h-[20px]" />
              </button>
            </div>
          </div>
        </div>
        {employeeData.length >= 0 && (
          <div className="flex justify-end ">
            <img
              src={plus}
              alt="Plus icon"
              width={40}
              className="pointer"
              onClick={() => setOpen(true)}
            ></img>
          </div>
        )}
        <div className="react-data-table">
          <ReactDataTable columns={columnsFilter} data={employeeData} />
        </div>
        {employeeData.length == 0 && (
          <div className="plus-container">
            <img
              src={plus}
              alt="Plus icon"
              width={60}
              className="pointer"
              onClick={() => setOpen(true)}
            ></img>
          </div>
        )}
        {open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-[3rem] w-full max-w-md shadow-2xl relative">
              <button
                onClick={() => {
                  setOpen(false);
                  setShowMobileForm(false);
                  setShowScanQR(false);
                }}
                className="absolute top-2 right-3 text-gray-500 text-xl font-bold"
              >
                ✕
              </button>

              {/* Main Menu */}
              {!showMobileForm && !showScanQR && (
                <>
                  <h2 className="text-xl font-semibold mb-6 text-center">
                    Add Employee
                  </h2>
                  <div className="flex flex-col gap-4">
                    <button
                      className="bn-button bn-button__primary w-full"
                      onClick={() => setShowMobileForm(true)}
                    >
                      Add with Mobile Number
                    </button>
                    <button
                      className="bn-button bn-button__primary w-full"
                      onClick={() => setShowScanQR(true)}
                    >
                      Add with Scan
                    </button>
                  </div>
                </>
              )}

              {/* Mobile Number Form */}
              {showMobileForm && !showScanQR && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    Add Employee
                  </h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        name="mobileNumber"
                        className="bn-textField-input w-full"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Enter your mobile number"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      className="bn-button bn-button__primary w-full mt-4"
                      onClick={addEmp}
                    >
                      Submit
                    </button>
                  </form>
                </>
              )}

              {/* QR Code Display */}
              {showScanQR && !showMobileForm && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    Scan QR to Add
                  </h2>
                  <div className="flex justify-center">
                    <div className="business-qr-container">
                      <div className="sm:w-[160px] sm:h-[160px] sm:min-w-[160px] w-[100px] h-[100px] min-w-[100px] object-cover rounded-xl business-qr-sub-container">
                        <QRCodeCanvas value={user?.data?.businessId || "N/A"} />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
