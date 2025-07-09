import React, { useEffect, useState } from "react";
import ReactDataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { businessList } from "./Helper/ApiFunction";
import Breadcrumb from "./common/Breadcrumb";
import { setBusinessId } from "../Redux/reducer";

export default function MyBusinessess() {
  const user = useSelector((state) => state.user.userInfo);
  const businessId = useSelector((state) => state.user.businessId);
  const dispatch = useDispatch();

  const [Business, setBusiness] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const token = sessionStorage.getItem("Token");
  const userId = sessionStorage.getItem("UserId");

  const handleData = async (page = 1, limit) => {
    try {
      const res = await businessList(userId, token);
      console.log("res businessList", res.data);
      if (res?.status === 200 && res?.data) {
        const updatedData = res.data.map((item) => ({
          ...item,
          isActive: item.isActive !== undefined ? item.isActive : false,
        }));
        setBusiness(updatedData);
        setTotalData(res?.pagination?.totalRecords || updatedData.length);
        setCurrentPage(page);
      } else {
        setBusiness([]);
        setTotalData(0);
      }
    } catch (error) {
      console.error("Error fetching business data:", error);
      setBusiness([]);
      setTotalData(0);
    }
  };

  const handlePageChange = (page) => {
    handleData(page, limit);
  };

  const handleRowsPerPageChange = (newLimit, page) => {
    setLimit(newLimit);
    handleData(page, newLimit);
  };

  const toggleStatus = (id) => {
    const updatedBusiness = Business.map((item) => {
      if (item.businessId === id) {
        return { ...item, isActive: !item.isActive };
      }
      return item;
    });

    setBusiness(updatedBusiness);

    const activeBusiness = updatedBusiness.find(
      (item) => item.businessId === id
    );

    if (activeBusiness && activeBusiness.isActive) {
      dispatch(setBusinessId(activeBusiness.businessId)); // ✅ Set to Redux when activating
    } else {
      dispatch(setBusinessId(null)); // ✅ Clear Redux when deactivating
    }
  };

  useEffect(() => {
    handleData(currentPage, limit);
  }, [userId]);

  const columnsFilter = [
    {
      name: "Sr",
      selector: (row, index) => (currentPage - 1) * limit + index + 1,
      width: "60px",
    },
    {
      name: "Business Name",
      selector: (row) => row.businessName || "",
      width: "160px",
    },
    {
      name: "Category",
      selector: (row) => row.category || "",
      width: "160px",
    },
    {
      name: "Address",
      selector: (row) => row.address || "N/A",
      width: "250px",
      style: {
        justifyContent: "flex-start",
        whiteSpace: "normal",
        wordWrap: "break-word",
      },
      wrap: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <div className="flex flex-col gap-2 items-start">
          <span
            className={`font-semibold ${
              row.isActive ? "text-green-600" : "text-gray-500"
            }`}
          >
            {row.isActive ? (
              "Active Business"
            ) : (
              <button
                onClick={() => toggleStatus(row.businessId)}
                className="px-3 py-1 rounded-full text-white text-sm"
                style={{ backgroundColor: "#d9bda5" }}
              >
                Set Active
              </button>
            )}
          </span>
        </div>
      ),
      width: "200px",
    },
  ];

  const customStyles = {
    rows: {
      style: (row) => {
        if (row.isActive) {
          return {
            border: "2px solid #4F46E5",
            borderRadius: "8px",
            backgroundColor: "#f0fdf4",
          };
        }
        return {
          border: "none",
          borderRadius: "8px",
        };
      },
    },
  };

  const breadcrumbItem = [
    {
      name: "My Businesses",
    },
  ];

  return (
    <div className="md:px-6 sm:px-3 pt-4">
      <div className="container-fluid">
        <div className="mb-4">
          <Breadcrumb breadcrumbItem={breadcrumbItem} />
        </div>

        <h5 className="text-[20px] leading-[26px] font-medium mb-2 p-[10px]">
          My Businesses
          <span className="inline-block font-bold ms-1">({totalData})</span>
        </h5>

        <ReactDataTable
          columns={columnsFilter}
          data={Business}
          pagination
          paginationServer
          paginationTotalRows={totalData}
          paginationPerPage={limit}
          paginationDefaultPage={currentPage}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}
