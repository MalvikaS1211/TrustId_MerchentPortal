import {
  IconAddressBook,
  IconBriefcase,
  IconCash,
  IconCornerRightUp,
  IconCreditCard,
  IconRepeat,
  IconUserScan,
  IconUserScreen,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { visitorData } from "./Helper/ApiFunction";
import { useSelector } from "react-redux";

export default function HeaderCards() {
  const user = useSelector((state) => state.user.userInfo);
  const [visitor, setVisitor] = useState({});
  const token = sessionStorage.getItem("Token");
  const BusinessId = user?.data?.businessId;
  const visitorDataFn = async () => {
    try {
      const res = await visitorData(BusinessId, token);
      console.log("res visitor", res);
      setVisitor(res?.data);
    } catch (error) {
      console.log("Error in visitorData", error);
    }
  };
  useEffect(() => {
    visitorDataFn();
  }, [BusinessId]);

  return (
    <>
      <div className="lg:col-span-3 sm:col-span-6 col-span-12 card flex flex-col bg-card-color rounded-xl overflow-hidden border border-dashed border-border-color">
        <div className="md:p-6 p-4">
          <div className="flex items-center justify-between gap-5 mb-2">
            <p>New Visitor</p>
            <IconUserSquareRounded className="stroke-primary stroke-[1.5] w-[32px] h-[32px]" />
          </div>
          <div className="flex items-end gap-1 mb-1">
            <span className="inline-block text-[24px]/[30px] font-medium">
              {visitor?.newUser || 0}
            </span>
            <IconCornerRightUp className="stroke-font-color-100 w-[18px] h-[18px]" />
            <span className="text-font-color-100 text-[14px]/[20px]">13%</span>
          </div>
          <div className="text-font-color-100 text-[14px]/[20px]">
            Analytics for last week
          </div>
        </div>
        <div className="progress mt-auto overflow-hidden h-[4px] bg-border-color rounded-full">
          <div className="progress-bar w-[85%] bg-secondary h-full"></div>
        </div>
      </div>
      <div className="lg:col-span-3 sm:col-span-6 col-span-12 card flex flex-col bg-card-color rounded-xl overflow-hidden border border-dashed border-border-color">
        <div className="md:p-6 p-4">
          <div className="flex items-center justify-between gap-5 mb-2">
            <p>Loop Visitor</p>
            <IconRepeat className="stroke-primary stroke-[1.5] w-[32px] h-[32px]" />
          </div>
          <div className="flex items-end gap-1 mb-1">
            <span className="inline-block text-[24px]/[30px] font-medium">
              {visitor?.loopVisitor || 0}
            </span>
            <IconCornerRightUp className="stroke-font-color-100 w-[18px] h-[18px]" />
            <span className="text-font-color-100 text-[14px]/[20px]">13%</span>
          </div>
          <div className="text-font-color-100 text-[14px]/[20px]">
            Analytics for last week
          </div>
        </div>
        <div className="progress mt-auto overflow-hidden h-[4px] bg-border-color rounded-full">
          <div className="progress-bar w-[13%] bg-danger h-full"></div>
        </div>
      </div>
      <div className="lg:col-span-3 sm:col-span-6 col-span-12 card flex flex-col bg-card-color rounded-xl overflow-hidden border border-dashed border-border-color">
        <div className="md:p-6 p-4">
          <div className="flex items-center justify-between gap-5 mb-2">
            <p>Employee</p>
            <IconUserScreen className="stroke-primary stroke-[1.5] w-[32px] h-[32px] " />
          </div>
          <div className="flex items-end gap-1 mb-1">
            <span className="inline-block text-[24px]/[30px] font-medium">
              {visitor?.totalEmployees || 0}
            </span>
            <IconCornerRightUp className="stroke-font-color-100 w-[18px] h-[18px]" />
            <span className="text-font-color-100 text-[14px]/[20px]">78%</span>
          </div>
          <div className="text-font-color-100 text-[14px]/[20px]">
            Analytics for last week
          </div>
        </div>
        <div className="progress mt-auto overflow-hidden h-[4px] bg-border-color rounded-full">
          <div className="progress-bar w-[70%] bg-success h-full"></div>
        </div>
      </div>
      <div className="lg:col-span-3 sm:col-span-6 col-span-12 card flex flex-col bg-card-color rounded-xl overflow-hidden border border-dashed border-border-color">
        <div className="md:p-6 p-4">
          <div className="flex items-center justify-between gap-5 mb-2">
            <p>NEW LEADS</p>
            <IconAddressBook className="stroke-primary stroke-[1.5] w-[32px] h-[32px]" />
          </div>
          <div className="flex items-end gap-1 mb-1">
            <span className="inline-block text-[24px]/[30px] font-medium">
              125
            </span>
            <IconCornerRightUp className="stroke-font-color-100 w-[18px] h-[18px]" />
            <span className="text-font-color-100 text-[14px]/[20px]">55%</span>
          </div>
          <div className="text-font-color-100 text-[14px]/[20px]">
            Analytics for last week
          </div>
        </div>
        <div className="progress mt-auto overflow-hidden h-[4px] bg-border-color rounded-full">
          <div className="progress-bar w-[55%] bg-warning h-full"></div>
        </div>
      </div>
    </>
  );
}
