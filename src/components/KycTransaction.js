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
import ReactDataTable, { Alignment } from "react-data-table-component";
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
import MapModal from "./MapModal";
export default function KYCTransaction() {
  const user = useSelector((state) => state.user.userInfo);
  const [KYCTransactions, setKYCTransactions] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
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
      cell: (row) =>
        row.outTime ? moment(row.outTime).format("hh:mm A") : "N/A",
    },
    {
      name: "Device Contract",
      selector: (row) => row.device || "N/A",
      width: "160px",
    },
    {
      name: "Visitor Type",
      selector: (row) =>
        row.visitCount === 1
          ? "New Visitor"
          : row.visitCount >= 2
          ? "Loop Visitor"
          : "N/A",
      width: "150px",
    },
    {
      name: "Coordinator",
      selector: (row) =>
        `${row?.location?.latitude ?? ""}, ${row?.location?.longitude ?? ""}`,
      width: "158px",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedCoordinates({
                lat: row?.location?.latitude,
                lng: row?.location?.longitude,
              });
              setOpen(true);
            }}
            className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
          >
            Lat: {row?.location?.latitude ?? "N/A"}, Lng:
            {row?.location?.longitude ?? "N/A"}
          </button>
        </div>
      ),
      style: {
        justifyContent: "flex-start", // Aligns cell content to the left
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });

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
      {/* <button
        onClick={() => setOpen(true)}
        className="bg-blue-600  px-4 py-2 rounded"
      >
        Show My Location
      </button> */}
      {/* Data Table */}
      <div className="react-data-table">
        <ReactDataTable columns={columnsFilter} data={KYCTransactions} />
      </div>

      {/* map modal */}
      {open && selectedCoordinates && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-2xl w-full relative shadow-lg">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-black font-bold text-lg"
            >
              ✕
            </button>

            <iframe
              src={`https://www.google.com/maps?q=${selectedCoordinates.lat},${selectedCoordinates.lng}&z=15&output=embed`}
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}

      {/* end of map modal */}
    </>
  );
}
