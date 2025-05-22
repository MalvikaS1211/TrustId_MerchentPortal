// import React, { useEffect, useState } from "react";

// import WelcomeHeader from "../../src/components/common/WelcomeHeader";
// import { Link } from "react-router-dom";
// import { KycTranscations } from "./Helper/ApiFunction";
// import { useSelector } from "react-redux";

// import moment from "moment";
// export default function KYCTransaction() {
//   const user = useSelector((state) => state.user.userInfo);
//   const [KYCTransactions, setKYCTransactions] = useState([]);
//   const handleData = async () => {
//     try {
//       const BusinessId = user?.data?.businessId;

//       if (!BusinessId) {
//         console.warn("Business ID is missing");
//         return;
//       }

//       const res = await KycTranscations(user?.data?.businessId, 1, 50);
//       console.log("KYC Data:", res);
//       setKYCTransactions(res?.data);
//     } catch (error) {
//       console.error("Error fetching KYC data:", error);
//     }
//   };

//   useEffect(() => {
//     handleData();
//     console.log(KYCTransactions, "KYCTransactions");
//   }, []);

//   return (
//     <div className="md:px-6 sm:px-3 pt-4">
//       <div className="container-fluid">

//         <div className="relative rounded-xl border border-dashed border-border-color p-4">
//           <span className="bg-body-color text-font-color-100 px-5 font-semibold absolute top-[-14px]">
//             KYC Traansaction
//           </span>
//           <div className="card bg-card-color rounded-xl">
//             <div className="overflow-auto">
//               <table className="w-full min-w-[900px]">
//                 <thead>
//                   <tr className="border-b border-dashed border-border-color">
//                     <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0 text-[12px]/[18px] font-bold">
//                       Sender Name
//                     </td>
//                     <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0 text-[12px]/[18px] font-bold">
//                       Sender Mobile
//                     </td>
//                     <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0 text-[12px]/[18px] font-bold">
//                       DATE
//                     </td>
//                     <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0 text-[12px]/[18px] font-bold">
//                       TYPE
//                     </td>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {KYCTransactions?.map((transaction, index) => (
//                     <tr
//                       className="border-b border-dashed border-border-color last:border-b-0"
//                       key={index}
//                     >
//                       <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0">
//                         {transaction?.userInfo?.name}
//                       </td>
//                       <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0">
//                         {transaction?.userInfo?.mobileNumber}
//                       </td>
//                       <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0">
//                         {transaction?.createdAt
//                           ? moment(transaction.createdAt).format(
//                               "DD-MM-YYYY HH:MM"
//                             )
//                           : "N/A"}
//                       </td>
//                       <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0">
//                         {transaction?.type === "A"
//                           ? "Aadhar"
//                           : transaction?.type === "P"
//                           ? "PAN"
//                           : ""}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactDataTable from "react-data-table-component";
import {
  avatar1,
  avatar10,
  avatar2,
  avatar3,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
} from "../../src/assets/images";
import {
  IconTrash,
  IconCloudDownload,
  IconCloudUpload,
  IconBrandFacebook,
  IconBrandGithub,
  IconMail,
  IconPencil,
  IconHeart,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import moment from "moment";
import HeaderCards from "./HeaderCards";
import { useSelector } from "react-redux";
import { KycTranscations } from "./Helper/ApiFunction";
export default function KYCTransaction() {
  const user = useSelector((state) => state.user.userInfo);
  const [KYCTransactions, setKYCTransactions] = useState([]);
  const [totalData, setTotalData] = useState([]);

  const handleData = async () => {
    try {
      const BusinessId = user?.data?.businessId;
      //   if (!BusinessId) {
      //     console.warn("Business ID is missing");
      //     return;
      //   }

      const page = 1;
      const limit = 50;
      const res = await KycTranscations(user?.data?.businessId, page, limit);

      if (res?.data) {
        // optional: transform API fields if needed
        setKYCTransactions(res.data);
        setTotalData(res?.pagination?.totalRecords);
      } else {
        setKYCTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching KYC data:", error);
      setKYCTransactions([]);
    }
  };

  useEffect(() => {
    handleData();
    console.log(KYCTransactions, "KYCTransactions");
  }, [user]);
  const columnsFilter = [
    {
      name: "Sr",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Visitor",
      selector: (row) => row.userInfo?.name,
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
      cell: (row) =>
        row.userInfo.mobileNumber
          ? row.userInfo.mobileNumber.replace(/.(?=.{4})/g, "*")
          : "N/A",
    },
    {
      name: "Address",
      selector: (row) => row.userInfo.fullAddress || "N/A",
    },
    {
      name: "In Time",
      selector: (row) => row.createdAt,
      cell: (row) => {
        const created = moment(row.createdAt);
        if (!created.isValid()) return "N/A";

        const time = created.format("hh:mm A");

        if (created.isSame(moment(), "day")) {
          return `Today ${time}`;
        } else if (created.isSame(moment().subtract(1, "day"), "day")) {
          return `Yesterday ${time}`;
        } else {
          return created.format("DD MMM YYYY, hh:mm A"); // fallback for other dates
        }
      },
    },

    {
      name: "Out Time",
      selector: (row) => row.outTime,
      cell: (row) => (row.outTime ? moment(row.outTime).format("hh:mm A") : ""),
    },
    {
      name: "Device Contract",
      selector: (row) => row.device || "",
    },
    {
      name: "Visitor Type",
      selector: (row) =>
        row.visitCount === 1
          ? "New Visitor"
          : row.visitCount >= 2
          ? "Loop Visitor"
          : "N/A",
    },
  ];

  return (
    <>
      <div className="mb-4 ">
        {/* HeaderCards below the heading */}
        <div className="mb-4">
          <HeaderCards />
        </div>
      </div>
      {/* Heading */}
      <h5 className="text-[20px] leading-[26px] font-medium mb-2 p-[10px]">
        KYC Transaction
        <span className="inline-block font-bold ms-1">({totalData})</span>
      </h5>
      {/* Data Table */}
      <div className="react-data-table">
        <ReactDataTable columns={columnsFilter} data={KYCTransactions} />
      </div>
    </>
  );
}
