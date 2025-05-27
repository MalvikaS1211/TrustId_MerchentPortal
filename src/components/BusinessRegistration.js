import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { addBusiness, getCategory } from "./Helper/ApiFunction";
import toast from "react-hot-toast";
export default function BusinessRegistration() {
  const [businessName, setBusinessName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [owner, setOwner] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const token = sessionStorage.getItem("Token");
  const handleSubmit = async () => {
    try {
      const userId = sessionStorage.getItem("UserId");

      const res = await addBusiness(
        userId,
        category,
        businessName,
        address,
        owner,
        phoneNumber,
        token
      );

      if (res?.status === 200) {
        toast.success("Business Added Successfully");
        console.log("message in add business", res?.message);
        setBusinessName("");
        setAddress("");
        setOwner("");
        setPhoneNumber("");
        setCategory("");
      } else {
        toast.error(res?.message || "Something went wrong.");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
      console.error("Error in handleSubmit:", error);
    }
  };

  const handleCategory = async () => {
    try {
      const res = await getCategory(token);
      // console.log(res.data, "res category");
      setCategories(res.data);
    } catch (error) {
      console.log("error in category", error);
    }
  };
  useEffect(() => {
    handleCategory();
  }, []);

  return (
    <div className="w-[100%] sm:w-[50%] md:w-[50%] lg:w-[30%] mx-auto   rounded-lg business-container min-h-[100vh] lg:min-h-[80vh] p-[10px] sm:p-0 ">
      <form className="space-y-4  content-card first-screen-content w-full p-[30px]">
        <h2 className="text-2xl font-bold mb-[32px] ">Add Business</h2>
        <div>
          <label className="block text-sm font-medium mb-1">
            Business Name
          </label>
          <input
            type="text"
            name="businessName"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="bn-textField-input w-full"
            placeholder="Enter your business name"
            required
          />
        </div>

        <div className="relative w-full">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none bn-textField-input w-full pr-10"
            required
          >
            <option value="" className="text-gray-400">
              Select a business category
            </option>
            {categories.map((item) => (
              <option
                key={item._id}
                value={item.name}
                className="category-item"
              >
                {item.name}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute right-3 top-9 text-gray-400">
            <IoIosArrowDown />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            type="textarea"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bn-textField-input w-full"
            placeholder="Enter your business address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Owner</label>
          <input
            type="text"
            name="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="bn-textField-input w-full"
            placeholder="Enter your business owner"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bn-textField-input w-full"
            placeholder="Enter your business phone number"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="bn-button bn-button__primary data-size-large w-full mt-[30px]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
