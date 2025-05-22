import React, { useEffect, useState } from "react";

import WelcomeHeader from "../../src/components/common/WelcomeHeader";
import { Link } from "react-router-dom";
import { KycTranscations } from "./Helper/ApiFunction";
import { useSelector } from "react-redux";

import moment from "moment";
export default function KYCTransaction() {
  const user = useSelector((state) => state.user.userInfo);
  const [KYCTransactions, setKYCTransactions] = useState([]);
  const handleData = async () => {
    try {
      const BusinessId = user?.data?.businessId;

      if (!BusinessId) {
        console.warn("Business ID is missing");
        return;
      }

      const res = await KycTranscations(user?.data?.businessId, 1, 50);
      console.log("KYC Data:", res);
      setKYCTransactions(res?.data);
    } catch (error) {
      console.error("Error fetching KYC data:", error);
    }
  };

  useEffect(() => {
    handleData();
    console.log(KYCTransactions, "KYCTransactions");
  }, []);

  return (
    <div className="md:px-6 sm:px-3 pt-4">
      <div className="container-fluid">
        {/* <WelcomeHeader income /> */}

        <div className="relative rounded-xl border border-dashed border-border-color p-4">
          <span className="bg-body-color text-font-color-100 px-5 font-semibold absolute top-[-14px]">
            KYC Traansaction
          </span>
          <div className="card bg-card-color rounded-xl">
            <div className="overflow-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-dashed border-border-color">
                    <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0 text-[12px]/[18px] font-bold">
                      Sender Name
                    </td>
                    <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0 text-[12px]/[18px] font-bold">
                      Sender Mobile
                    </td>
                    <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0 text-[12px]/[18px] font-bold">
                      DATE
                    </td>
                    <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0 text-[12px]/[18px] font-bold">
                      TYPE
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {KYCTransactions?.map((transaction, index) => (
                    <tr
                      className="border-b border-dashed border-border-color last:border-b-0"
                      key={index}
                    >
                      <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0">
                        {transaction?.userInfo?.name}
                      </td>
                      <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0">
                        {transaction?.userInfo?.mobileNumber}
                      </td>
                      <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0">
                        {transaction?.createdAt
                          ? moment(transaction.createdAt).format(
                              "DD-MM-YYYY HH:MM"
                            )
                          : "N/A"}
                      </td>
                      <td className="py-3 px-4 border-e border-dashed border-border-color last:border-e-0">
                        {transaction?.type === "A"
                          ? "Aadhar"
                          : transaction?.type === "P"
                          ? "PAN"
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
