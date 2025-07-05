import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ReactDataTable, { Alignment } from "react-data-table-component";
import { SlLocationPin } from "react-icons/sl";
import { FiMapPin } from "react-icons/fi";
import moment from "moment";
import HeaderCards from "./HeaderCards";
import { useSelector } from "react-redux";
import { KycTranscations } from "./Helper/ApiFunction";
import MapModal from "./MapModal";
import Breadcrumb from "./common/Breadcrumb";
import { MdOutlineClose } from "react-icons/md";
import { sortBy } from "lodash";
export default function KYCTransaction() {
  const user = useSelector((state) => state.user);
  const [KYCTransactions, setKYCTransactions] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [selectedVisitorType, setSelectedVisitorType] = useState("");
  const token = sessionStorage.getItem("Token");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10); // default rows per page
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const BusinessId = user?.userInfo?.data?.businessId;
  // const BusinessId = "66225b0ac289a04f05144983";

  const modalRef = useRef(null);

  const handleData = async (page = 1, limit) => {
    try {
      // if (!BusinessId) return;

      const res = await KycTranscations(BusinessId, page, limit, token);
      console.log("response data", res.data[0]);
      console.log("response KYC", user?.userInfo?.data?.businessId);
      if (res?.data) {
        setKYCTransactions(res.data);
        setTotalData(res?.pagination?.totalRecords);
        setCurrentPage(page);
      } else {
        setKYCTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching KYC data:", error);
      setKYCTransactions([]);
    }
  };
  const handlePageChange = (page) => {
    handleData(page, limit);
  };

  const handleRowsPerPageChange = (newLimit, page) => {
    setLimit(newLimit);
    handleData(page, newLimit);
  };
  useEffect(() => {
    handleData(currentPage, limit);
    // console.log(KYCTransactions, "KYCTransactions");
  }, [BusinessId]);

  // Handle click outside of modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const getVisitorType = (row) => {
    if (row.employee === false) {
      if (row.firstTime === true) return "New Visitor";
      if (row.firstTime === false) return "Loop Visitor";
    }
    if (row.employee === true) return "Employee";
    return "N/A";
  };

  const columnsFilter = [
    {
      name: "Sr",
      selector: (row, index) => (currentPage - 1) * limit + index + 1,
      width: "60px",
    },
    {
      name: "Visitor",
      selector: (row) => row?.name,
      width: "200px",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <img
            src={
              row?.address?.profile_image?.startsWith("data:image")
                ? row.address.profile_image
                : row?.address?.profile_image
                ? `data:image/jpeg;base64,${row.address.profile_image}`
                : "/default-avatar.png"
            }
            alt="profile"
            className="w-[26px] h-[26px] rounded-md object-cover"
          />
          <span>{row?.name || "N/A"}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.mobileNumber,
      width: "140px",
      cell: (row) =>
        row.mobileNumber ? row.mobileNumber.replace(/.(?=.{4})/g, "*") : "N/A",
    },
    {
      name: "Address",
      selector: (row) => row.address.full_address || "N/A",
      width: "250px",
      style: {
        justifyContent: "flex-start",
        whiteSpace: "normal",
        wordWrap: "break-word",
      },
      wrap: true,
    },
    {
      name: "In Time",
      selector: (row) => row.checkInTime,
      width: "180px",
      cell: (row) => {
        const created = moment(row.checkInTime);
        if (!created.isValid()) return "N/A";

        const time = created.format("hh:mm A");

        if (created.isSame(moment(), "day")) {
          return `Today ${time}`;
        } else if (created.isSame(moment().subtract(1, "day"), "day")) {
          return `Yesterday ${time}`;
        } else {
          return created.format("DD MMM YYYY, hh:mm A");
        }
      },
    },
    {
      name: "Out Time",
      selector: (row) => row.checkOutTime,
      width: "180px",
      cell: (row) =>
        row.checkOutTime ? moment(row.checkOutTime).format("hh:mm A") : "",
    },
    {
      name: "Device Contract",
      selector: (row) => row.device || "",
      width: "160px",
    },
    {
      name: "Visitor Type",
      selector: (row) => {
        if (row.userType === "loopvisitor") return "Loop Visitor";
        if (row.userType === "employee") return "Employee";
        if (row.userType === "visitor") return "New Visitor";
      },
      width: "150px",
    },
    // {
    //   name: "Visitor Type",
    //   selector: (row) => {
    //     if (row.employee === false) {
    //       if (row.firstTime === true) return "New Visitor";
    //       if (row.firstTime === false) return "Loop Visitor";
    //     }
    //     if (row.employee === true) return "Employee";

    //     return "N/A";
    //   },
    //   width: "150px",
    // },

    // {
    //   name: "Visitor Type",
    //   selector: (row) => getVisitorType(row),
    //   width: "150px",
    //   cell: (row) => {
    //     const visitorType = getVisitorType(row);
    //     let badgeClass = "";
    //     // The color combination according to the dashboard chart ["New Visitor","Loop Visitor","Employee"]

    //     // if (visitorType === "New Visitor") {
    //     //   badgeClass = "bg-[#b9b3a8] text-black";
    //     // } else if (visitorType === "Loop Visitor") {
    //     //   badgeClass = "bg-[#4c3575] text-white";
    //     // } else if (visitorType === "Employee") {
    //     //   badgeClass = "bg-[#98427e] text-white";
    //     // } else {
    //     //   badgeClass = "bg-gray-100 text-gray-800";
    //     // }

    //     if (visitorType === "New Visitor") {
    //       badgeClass = "bg-blue text-white";
    //     } else if (visitorType === "Loop Visitor") {
    //       badgeClass = "bg-purple-100 text-purple-800";
    //     } else if (visitorType === "Employee") {
    //       badgeClass = "bg-green-100 text-green-800";
    //     } else {
    //       badgeClass = "bg-gray-100 text-gray-800";
    //     }

    //     return (
    //       <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
    //         {visitorType}
    //       </span>
    //     );
    //   },
    //   sortable: true,
    // },

    {
      name: "Coordinator",
      selector: (row) =>
        `${row?.location?.latitude ?? "N/A"}, ${
          row?.location?.longitude ?? "N/A"
        }`,
      minWidth: "150px",
      cell: (row) => {
        const lat = row?.location?.latitude;
        const lng = row?.location?.longitude;
        return (
          <div
            className={`coordinate-cell ${
              !lat || !lng ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            onClick={() => {
              if (!lat || !lng) return; // Prevent action when lat/lng is missing
              setSelectedCoordinates({ lat, lng });
              setSelectedVisitorType(getVisitorType(row));
              setOpen(true);
            }}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 48"
              >
                <circle cx="12" cy="10" r="8" fill="#ff3b3b" />
                <circle cx="13.5" cy="10" r="8" fill="#d32f2f" opacity="0.3" />
                <rect x="11" y="18" width="2" height="20" rx="1" fill="#000" />
                <circle cx="12" cy="40" r="1.5" fill="#000" />
              </svg>
            </div>

            <div className="flex flex-col text-sm leading-snug">
              <span>Lat: {lat ?? "N/A"}</span>
              <span>Lng: {lng ?? "N/A"}</span>
            </div>
          </div>
        );
      },
      style: {
        justifyContent: "flex-start",
        whiteSpace: "normal",
        wordWrap: "break-word",
      },
      wrap: true,
    },
  ];

  // Get user's current location
  useEffect(() => {
    if (open) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to access your location.");
        }
      );
    }
  }, [open]);

  const mapSrc = location.lat
    ? `https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`
    : null;

  const breadcrumbItem = [
    {
      name: "KYC Transaction",
    },
  ];

  const getLocationTitle = () => {
    switch (selectedVisitorType) {
      case "Employee":
        return "Employee Location";
      case "New Visitor":
        return "New Visitor Location";
      case "Loop Visitor":
        return "Loop Visitor Location";
      default:
        return "Visitor Location";
    }
  };

  return (
    <>
      <div className="md:px-6 sm:px-3 pt-4">
        <div className="container-fluid">
          <Breadcrumb breadcrumbItem={breadcrumbItem} />
          <div className="grid grid-cols-12 gap-4">
            <HeaderCards />
            <div className="col-span-12 w-full overflow-auto">
              <h5 className="text-[20px] leading-[26px] font-medium mb-2 p-[10px]">
                KYC Transaction
                <span className="inline-block font-bold ms-1">
                  ({totalData})
                </span>
              </h5>
            </div>

            <div className="col-span-12 w-full overflow-auto">
              <ReactDataTable
                columns={columnsFilter}
                data={KYCTransactions}
                pagination
                paginationServer
                paginationTotalRows={totalData}
                paginationPerPage={limit}
                paginationDefaultPage={currentPage}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowsPerPageChange}
                noDataComponent={<></>}
              />
            </div>

            {/* map modal */}
            {/* {open && selectedCoordinates && (
            <div
              className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50"
              onClick={(e) => {
                // Close only when clicking directly on the backdrop
                if (e.target === e.currentTarget) {
                  setOpen(false);
                }
              }}
            >
              <div
                className="map-container relative"
                ref={modalRef}
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-2 right-2 text-black font-bold text-lg z-10"
                >
                  <MdOutlineClose />
                </button>

                <iframe
                  src={`https://www.google.com/maps?q=${selectedCoordinates.lat},${selectedCoordinates.lng}&z=15&output=embed`}
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg inset-0 p-[10px]"
                />
              </div>
            </div>
          )} */}
            {/* Map Modal */}
            {open && selectedCoordinates && (
              <div
                className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50 p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setOpen(false);
                  }
                }}
              >
                <div
                  className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-4xl h-[80vh] relative"
                  ref={modalRef}
                >
                  <div className="absolute top-0 left-0 right-0 bg-white py-3 px-4 flex justify-between items-center z-10">
                    <h3 className="font-semibold text-gray-800">
                      {getLocationTitle()}
                    </h3>
                    <button
                      onClick={() => setOpen(false)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <MdOutlineClose className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="h-full pt-12 p-15">
                    <iframe
                      src={`https://www.google.com/maps?q=${selectedCoordinates.lat},${selectedCoordinates.lng}&z=15&output=embed`}
                      width="100%"
                      height="100%"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="border-0"
                    />
                  </div>

                  <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-md shadow-md text-sm">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-red-600" />
                      <span className="text-gray-600">
                        Lat: {selectedCoordinates.lat?.toFixed(6)}, Lng:{" "}
                        {selectedCoordinates.lng?.toFixed(6)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* end of map modal */}
          </div>
        </div>{" "}
      </div>
    </>
  );
}
