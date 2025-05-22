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

  const handleSubmit = async () => {
    try {
      const userId = sessionStorage.getItem("UserId");
      const Token = sessionStorage.getItem("Token");

      const res = await addBusiness(
        userId,
        category,
        businessName,
        address,
        owner,
        phoneNumber,
        Token
      );
      toast.success("Business Added Successfully");
      setBusinessName("");
      setAddress("");
      setOwner("");
      setPhoneNumber("");
      setCategory("");
    } catch (error) {
      console.log("Error in submit", error);
    }
  };
  const handleCategory = async () => {
    try {
      const res = await getCategory();
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
    <div className="lg:w-[30%] md:w-[30%] w-full mx-auto  bg-white rounded-lg business-container">
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
              <option key={item._id} value={item.name}>
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
