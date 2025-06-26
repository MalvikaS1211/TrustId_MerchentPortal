import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import CustomLoader from "./common/CustomLoader"
import swal from 'sweetalert';
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
import {
  addEmployee,
  deleteEmployee,
  getBusinessVisitors,
  getEmployeeData,
} from "./Helper/ApiFunction";
import moment from "moment";
import ReactDataTable, { Alignment } from "react-data-table-component";
import toast from "react-hot-toast";
import { MdOutlineClose, MdKeyboardBackspace } from "react-icons/md";
import { debounce } from "lodash";

export default function TeamManagement() {
  let isDark = sessionStorage.getItem("darkMode");
  console.log("DARK_MODE::", isDark)
  const getSwalTheme = () => {
    // const isDark = document.documentElement.classList.contains('dark');
    return {
      background: isDark ? '#1e293b' : '#ffffff',
      textColor: isDark ? '#f8fafc' : '#1e293b',
      confirmButtonBg: isDark ? '#3b82f6' : '#2563eb',
      cancelButtonBg: isDark ? '#64748b' : '#94a3b8',
      borderColor: isDark ? '#334155' : '#e2e8f0',
      dangerButtonBg: '#ef4444'
    };
  };
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
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [visitors, setVisitors] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  // const [debounceTimer, setDebounceTimer] = useState(null);

  // const debounceSearch = useCallback((value) => {
  //   if (debounceTimer) {
  //     clearTimeout(debounceTimer);
  //   }
  //   const timer = setTimeout(() => {
  //     setCurrentPage(1);
  //     handleData(1, limit, value);
  //   }, 500);

  //   setDebounceTimer(timer);

  //   return () => {
  //     if (debounceTimer) {
  //       clearTimeout(debounceTimer);
  //     }
  //   };
  // }, [debounceTimer, limit]);

  const addEmp = async () => {
    try {
      if (!businessId) {
        toast.error("Business ID is required");
        setMobileNumber("");
        return;
      }
      const res = await addEmployee(userId, businessId, mobileNumber, token);

      if (res?.status === true) {
        console.log("handle AddEmployee", res);
        toast.success("Employee added successfully!");
        setIsFetch((prev) => !prev);
      } else {
        toast.error(res?.message || "Failed to add employee.");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      console.error("Error in addEmp:", error);
      toast.error(message);
    } finally {
      setMobileNumber("");
    }
  };

  const executeSearch = () => {
    setCurrentPage(1);
    handleData(1, limit, searchQuery);
  };

  const handleData = useCallback(
    async (page, limit, query = "") => {
      try {
        setIsSearching(true);
        const res = await getEmployeeData(
          businessId,
          token,
          page,
          limit,
          query
        );

        if (res?.status !== false) {
          setEmployeeData(res.data || []);
          setTotalEmployee(res?.pagination?.total || 0);
        } else {
          setEmployeeData([]);
          setTotalEmployee(0);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setEmployeeData([]);
        setTotalEmployee(0);
      } finally {
        setIsSearching(false);
      }
    },
    [businessId, token]
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        setCurrentPage(1);
        handleData(1, limit, query);
      }, 700),
    [handleData, limit]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      debouncedSearch.cancel();
      setCurrentPage(1);
      handleData(1, limit, searchQuery);
    }
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  const Visitors = async () => {
    try {
      // if (!businessId) {
      //   toast.error("Business ID is required");
      //   setMobileNumber("");
      //   return;
      // }
      const res = await getBusinessVisitors(businessId);
      if (res?.success === true) {
        setVisitors(res);
        console.log(res, "visitors");
      }
    } catch (error) {
      console.log("error in visitors", error);
    }
  };

  useEffect(() => {
    Visitors();
  }, [businessId, isFetch]);

  useEffect(() => {
    handleData(currentPage, limit, searchQuery);
  }, [user, isFetch, currentPage, limit]);

  const columnsFilter = [
    {
      name: "Sr",
      selector: (row, index) => (currentPage - 1) * limit + index + 1,
      width: "60px",
    },

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

    {
      name: "Phone",
      selector: (row) => row.userDetails.mobileNumber,
      width: "140px",
      cell: (row) =>
        row.userDetails.mobileNumber
          ? row.userDetails.mobileNumber.replace(/.(?=.{4})/g, "*")
          : "N/A",
    },
    {
      name: "Address",
      selector: (row) => row.userDetails.fullAddress || "N/A",
      width: "250px",
      style: {
        justifyContent: "flex-start",
        whiteSpace: "normal",
        wordWrap: "break-word",
      },
      wrap: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const theme = getSwalTheme();
              swal({
                title: "Confirm Deletion",
                text: `You are about to permanently delete ${row.userDetails?.name || "this employee"}. This action cannot be undone.`,
                icon: "warning",
                buttons: {
                  cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    className: "swal-cancel-button",
                  },
                  confirm: {
                    text: "Delete",
                    value: true,
                    visible: true,
                    className: "swal-confirm-button",
                  }
                },
                dangerMode: true,
                className: "custom-swal",
                customClass: {
                  popup: "custom-swal-popup",
                  title: "custom-swal-title",
                  htmlContainer: "custom-swal-text",
                  confirmButton: "custom-swal-confirm-button",
                  cancelButton: "custom-swal-cancel-button",
                  icon: "custom-swal-icon"
                }
              }).then((willDelete) => {
                if (willDelete) {
                  deleteEmployee(row.employeeId, row.businessId, token)
                    .then(() => {
                      swal({
                        title: "Deleted!",
                        text: "Employee has been successfully deleted.",
                        icon: "success",
                        className: "custom-swal",
                        customClass: {
                          confirmButton: "custom-swal-success-button"
                        }
                      });
                      setIsFetch(prev => !prev);
                    })
                    .catch(error => {
                      swal({
                        title: "Error",
                        text: error.response?.data?.message || "Failed to delete employee.",
                        icon: "error",
                        className: "custom-swal",
                        customClass: {
                          confirmButton: "custom-swal-error-button"
                        }
                      });
                    });
                }
              });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700"
            title="Delete Employee"
          >
            <FaTrashAlt size={10} className="flex-shrink-0" />
            <span>Remove</span>
          </button>
        </div>
      ),
      width: "120px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];
  // const CustomLoader = () => (
  //   <div className="my-custom-loader">
  //     <span className="spinner" />
  //     <p>Loading employees...</p>
  //   </div>
  // );

  const resetModal = () => {
    setShowMobileForm(false);
    setShowScanQR(false);
    setMobileNumber("");
  };

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
                {visitors?.data?.total_employees}
              </h5>
            </div>
          </div>
          <div className="card bg-card-color rounded-xl md:p-6 p-4 flex md:gap-4 gap-2 items-center border border-dashed border-border-color">
            <div className="sm:w-[56px] sm:h-[56px] sm:min-w-[56px] w-[40px] h-[40px] min-w-[40px] text-secondary bg-primary-10 rounded-full flex items-center justify-center">
              <IconLayout2Filled />
            </div>
            <div>
              <p className="text-font-color-100">Total Visitors</p>
              <h5 className="text-[20px]/[24px] font-medium">
                {visitors?.data?.total_visitors}
              </h5>
            </div>
          </div>
          <div className="card bg-card-color rounded-xl md:p-6 p-4 flex md:gap-4 gap-2 items-center border border-dashed border-border-color">
            <div className="sm:w-[56px] sm:h-[56px] sm:min-w-[56px] w-[40px] h-[40px] min-w-[40px] text-secondary bg-primary-10 rounded-full flex items-center justify-center">
              <IconFileFilled />
            </div>
            <div>
              <p className="text-font-color-100">Total Monthly Visitors</p>
              <h5 className="text-[20px]/[24px] font-medium">
                {visitors?.data?.monthly_visitors}
              </h5>
            </div>
          </div>
          <div className="card bg-card-color rounded-xl md:p-6 p-4 border border-dashed border-border-color">
            <label className="form-label mb-5 inline-block">Search</label>
            <div className="form-control flex w-full">
              <input
                type="text"
                id="team_board_search"
                className="form-input !rounded-e-none !py-[6px]"
                placeholder="Search by name or mobile..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
              />
              <button
                className="btn border border-border-color !rounded-s-none"
                type="button"
                onClick={executeSearch}
                disabled={isSearching}
              >
                <IconSearch className="w-[20px] h-[20px]" />
              </button>
            </div>
          </div>
        </div>
        {/* <div
          className={
            employeeData.length === 0 ? "plus-container" : "flex justify-end"
          }
        >
          <button
            onClick={() => setOpen(true)}
            className="flex items-center mt-3 gap-2 border border-dashed border-border-color text-font-color-100 px-4 py-2 rounded-xl transition cursor-pointer"
          >
            <span className="text-sm font-medium">Add Employee</span>
            <img src={plus} alt="Plus icon" className="w-7 h-7" />
          </button>
        </div> */}
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
            noDataComponent={
              <div className="py-4 text-center">
                {isSearching ? "Searching..." : "No employees found"}
              </div>
            }
            // noDataComponent={<></>}
            // progressComponent={<CustomLoader />}
            progressComponent={<CustomLoader text="Loading employees..." />}
            progressPending={isSearching}
            pagination
            paginationServer
            paginationTotalRows={totalEmployee}
            paginationPerPage={limit}
            onChangePage={(page) => {
              setCurrentPage(page);
              handleData(page, limit, searchQuery);
            }}
            onChangeRowsPerPage={(newPerPage, page) => {
              setLimit(newPerPage);
              setCurrentPage(page);
              handleData(page, newPerPage, searchQuery);
            }}
          />
        </div>
        {open && (
          <div
            className="fixed inset-0 backdrop-blur-sm bg-[#00000030]/40 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target.classList.contains("modal-overlay")) {
                setOpen(false);
                resetModal();
              }
            }}
          >
            <div className="modal-overlay absolute inset-0" />

            <div className="rounded-lg p-[3rem] w-full max-w-md shadow-2xl relative modal-container z-10">
              {/* Close Button - Always visible */}
              <button
                onClick={() => {
                  setOpen(false);
                  resetModal();
                }}
                className="absolute top-[15px] right-[18px]  text-xl font-bold transition-all duration-200 hover:rounded-sm"
              >
                <MdOutlineClose />
              </button>

              {/* Back Button - Only visible in sub-views */}
              {(showMobileForm || showScanQR) && (
                <button
                  onClick={resetModal}
                  className="absolute top-[15px] right-[46px] text-gray-500 text-xl font-bold  transition-all duration-200 hover:rounded-sm"
                >
                  <MdKeyboardBackspace />
                </button>
              )}

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
                  <h2 className="text-xl font-semibold mb-6 text-center px-5">
                    Add with Mobile Number
                  </h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        className="bn-textField-input-business w-full"
                        value={mobileNumber}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,10}$/.test(value)) {
                            setMobileNumber(value);
                          }
                        }}
                        placeholder="Enter your mobile number"
                        required
                        inputMode="numeric"
                        maxLength={10}
                      />
                    </div>
                    <button
                      type="button"
                      className="bn-button bn-button__primary w-full mt-4"
                      onClick={() => {
                        addEmp();
                        setOpen(false);
                        resetModal();
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
                  <h2 className="text-xl font-semibold mb-6 text-center">
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