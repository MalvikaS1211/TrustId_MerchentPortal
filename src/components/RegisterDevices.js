import React, { useEffect, useState } from "react";

import ReactDataTable, { Alignment } from "react-data-table-component";

import moment from "moment";
import HeaderCards from "./HeaderCards";
import { useSelector } from "react-redux";
import { KycTranscations } from "./Helper/ApiFunction";
import MapModal from "./MapModal";
import Breadcrumb from "./common/Breadcrumb";
export default function RegisterDevices() {
  const user = useSelector((state) => state.user.userInfo);
  const [KYCTransactions, setKYCTransactions] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const token = sessionStorage.getItem("Token");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10); // default rows per page

  const handleData = async (page = 1, limit) => {
    try {
      const BusinessId = user?.data?.businessId;
      if (!BusinessId) return;

      const res = await KycTranscations(BusinessId, page, limit, token);
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
    console.log(KYCTransactions, "KYCTransactions");
  }, [user]);
  const columnsFilter = [
    {
      name: "Sr",
      selector: (row, index) => (currentPage - 1) * limit + index + 1,
      width: "60px",
    },
    {
      name: "Visitor",
      selector: (row) => row.userInfo?.name,
      width: "200px",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <img
            src={
              row.userInfo?.address?.profile_image?.startsWith("data:image")
                ? row.userInfo.address.profile_image
                : row.userInfo?.address?.profile_image
                ? `data:image/jpeg;base64,${row.userInfo.address.profile_image}`
                : "/default-avatar.png"
            }
            alt="profile"
            className="w-[26px] h-[26px] rounded-md object-cover"
          />
          <span>{row.userInfo?.name || "N/A"}</span>
        </div>
      ),
    },
    {
      name: "Phone",
      selector: (row) => row.userInfo.mobileNumber,
      width: "140px",
      cell: (row) =>
        row.userInfo.mobileNumber
          ? row.userInfo.mobileNumber.replace(/.(?=.{4})/g, "*")
          : "N/A",
    },
    {
      name: "Address",
      selector: (row) => row.userInfo.fullAddress || "N/A",
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
      selector: (row) => row.createdAt,
      width: "180px",
      cell: (row) => {
        const created = moment(row.createdAt);
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
      selector: (row) => row.outTime,
      width: "180px",
      cell: (row) => (row.outTime ? moment(row.outTime).format("hh:mm A") : ""),
    },
    {
      name: "Device Contract",
      selector: (row) => row.device || "",
      width: "160px",
    },

    {
      name: "Visitor Type",
      selector: (row) => {
        if (row.employee === false) {
          if (row.firstTime === true) return "New Visitor";
          if (row.firstTime === false) return "Loop Visitor";
        }
        if (row.employee === true) return "Employee";

        return "N/A";
      },
      width: "150px",
    },
  ];

  const breadcrumbItem = [
    {
      name: "Registered Devices",
    },
  ];

  return (
    <>
      <div className="md:px-6 sm:px-3 pt-4">
        <div className="container-fluid">
          <div className="mb-4 ">
            <Breadcrumb breadcrumbItem={breadcrumbItem} />
            {/* <div className="mb-4">
              <HeaderCards />
            </div> */}
          </div>

          <h5 className="text-[20px] leading-[26px] font-medium mb-2 p-[10px]">
            Registered Devices
            <span className="inline-block font-bold ms-1">({totalData})</span>
          </h5>

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
          />
        </div>
      </div>
    </>
  );
}
