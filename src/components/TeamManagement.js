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
import { MdOutlineClose } from "react-icons/md";
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
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [employeeData, setEmployeeData] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const token = sessionStorage.getItem("Token");
  const businessId = user?.data?.businessId;
  const userId = user?.data?.userId;
  const [totalData, setTotalData] = useState(0);
  const addEmp = async () => {
    try {
      if (!businessId) {
        return;
      }
      const res = await addEmployee(userId, businessId, mobileNumber, token);

      if (res?.status === true) {
        console.log("handle AddEmployee", res);
        toast.success("Employee added successfully!");

        setMobileNumber("");
        setIsFetch((prev) => !prev);
      } else {
        toast.error(res?.message || "Failed to add employee.");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
      console.error("Error in addEmp:", error);
    }
  };

  const handleData = async () => {
    try {
      const BusinessId = user?.data?.businessId;
      console.log(BusinessId, "BusinessId");
      const res = await getEmployeeData(BusinessId, token);
      console.log("EmployeeData", res);
      if (res?.data) {
        setEmployeeData(res.data);
        setTotalEmployee(res?.pagination?.total);
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
  }, [user, isFetch]);

  const columnsFilter = [
    {
      name: "Sr",
      selector: (row, index) => index + 1,
      width: "60px",
    },

    // {
    //   name: "Name",
    //   selector: (row) => row.userDetails.name || "N/A",
    //   width: "250px",
    //   style: {
    //     justifyContent: "flex-start",
    //     whiteSpace: "normal",
    //     wordWrap: "break-word",
    //   },
    //   wrap: true,
    // },
    {
      name: "Name",
      selector: (row) => row.userInfo?.name,
      width: "200px",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <img
            src={
              row.userDetails?.profileImage?.startsWith("data:image")
                ? row.userDetails.profileImage
                : row.userDetails?.profileImage
                ? `data:image/jpeg;base64,${row.userDetails.profileImage}`
                : "/avatar2.png"
            }
            alt="profile"
            className="w-[26px] h-[26px] rounded-md object-cover"
          />
          <span>{row.userDetails?.name || "N/A"}</span>
        </div>
      ),
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
        <Breadcrumb breadcrumbItem={breadcrumbItem} />
        {/* <WelcomeHeader income /> */}
        <div className="grid xxl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          <div className="card bg-card-color rounded-xl md:p-6 p-4 flex md:gap-4 gap-2 items-center border border-dashed border-border-color">
            <div className="sm:w-[56px] sm:h-[56px] sm:min-w-[56px] w-[40px] h-[40px] min-w-[40px] text-secondary bg-primary-10 rounded-full flex items-center justify-center">
              <IconArchiveFilled />
            </div>
            <div>
              <p className="text-font-color-100">Total Employees</p>
              <h5 className="text-[20px]/[24px] font-medium">
                {totalEmployee}
              </h5>
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
        <div
          className={
            employeeData.length === 0 ? "plus-container" : "flex justify-end"
          }
        >
          <img
            src={plus}
            alt="Plus icon"
            width={employeeData.length === 0 ? 60 : 40}
            style={{ cursor: "pointer", padding: "10px 0px" }}
            onClick={() => setOpen(true)}
          />
        </div>
        {/* <h5 className="text-[20px] leading-[26px] font-medium mb-2 p-[10px]">
          Team Management
          <span className="inline-block font-bold ms-1">({totalEmployee})</span>
        </h5> */}
        <div className="react-data-table">
          <ReactDataTable
            columns={columnsFilter}
            data={employeeData}
            noDataComponent={<></>}
          />
        </div>
        {open && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-[3rem] w-full max-w-md shadow-2xl relative">
              <button
                onClick={() => {
                  setOpen(false);
                  setShowMobileForm(false);
                  setShowScanQR(false);
                }}
                className="absolute top-2 right-3 text-gray-500 text-xl font-bold"
              >
                <MdOutlineClose />
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
                      onClick={() => {
                        addEmp();
                        setOpen(false);
                        setShowMobileForm(false);
                      }}
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
                        <QRCodeCanvas value={businessId || "N/A"} />
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
