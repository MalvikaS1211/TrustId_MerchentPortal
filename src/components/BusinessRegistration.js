// import React, { useEffect, useRef, useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";
// import { addBusiness, getCategory } from "./Helper/ApiFunction";
// import toast from "react-hot-toast";
// import Select from "react-select";
// import { useSelector } from "react-redux";


// const customStyles = (darkMode) => ({
//   input: (provided) => ({
//     ...provided,
//     color: darkMode ? "white" : "black",
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     color: darkMode ? "white" : "black",
//   }),
//   placeholder: (provided) => ({
//     ...provided,
//     color: darkMode ? "#cccccc" : "#666666",
//   }),
// });
// export default function BusinessRegistration() {
//   const [businessName, setBusinessName] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [category, setCategory] = useState("");
//   const [address, setAddress] = useState("");
//   const [owner, setOwner] = useState("");
//   const selectRef = useRef();
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const token = sessionStorage.getItem("Token");
//   const darkMode = useSelector((state) => state.theme.darkMode);
//   const handleSubmit = async () => {
//     const userId = sessionStorage.getItem("UserId");

//     const clearForm = () => {
//       setBusinessName("");
//       setAddress("");
//       setOwner("");
//       setPhoneNumber("");
//       setCategory("");
//     };

//     try {
//       const res = await addBusiness(
//         userId,
//         category,
//         businessName,
//         address,
//         owner,
//         phoneNumber,
//         token
//       );

//       if (res?.status === 200) {
//         toast.success("Business Added Successfully");
//         console.log("message in add business", res?.message);
//       } else {
//         toast.error(res?.message || "Something went wrong.");
//       }
//     } catch (error) {
//       const message =
//         error?.response?.data?.message ||
//         error?.message ||
//         "Something went wrong. Please try again.";
//       toast.error(message);
//       console.error("Error in handleSubmit:", error);
//     } finally {
//       clearForm();
//     }
//   };

//   const handleCategory = async () => {
//     try {
//       const res = await getCategory(token);
//       setCategories(res.data);
//     } catch (error) {
//       console.log("error in category", error);
//     }
//   };
//   useEffect(() => {
//     handleCategory();
//   }, []);
//   const options = categories.map((item) => ({
//     value: item.name,
//     label: item.name,
//   }));

//   return (
//     <div className="container-fluid">
//       <div className="w-[100%] sm:w-[50%] md:w-[50%] lg:w-[30%] mx-auto   rounded-lg business-container min-h-[100vh] lg:min-h-[80vh] p-[10px] sm:p-0 ">
//         <form className="space-y-4  content-card-business first-screen-content w-full p-[30px]   p-6">
//           <h2 className="text-2xl font-bold mb-[32px] heading-addBusiness">
//             Add Business
//           </h2>
//           <div>
//             <label className="block text-sm font-medium mb-3">
//               Business Name
//             </label>
//             <input
//               type="text"
//               name="businessName"
//               value={businessName}
//               onChange={(e) => setBusinessName(e.target.value)}
//               className="bn-textField-input-business w-full"
//               placeholder="Enter your business name"
//               required
//             />
//           </div>

//           <div className="relative w-full">
//             <label className="block text-sm font-medium mb-3">Category</label>

//             <Select
//               ref={selectRef}
//               className={`my-select ${darkMode ? "my-select--dark" : ""}`}
//               classNamePrefix="my-select"
//               options={options}
//               value={category ? options.find((opt) => opt.value === category) : null}
//               onChange={(selected) => setCategory(selected?.value || "")}
//               menuPlacement="auto"
//               menuPosition="fixed"
//               menuShouldScrollIntoView={true}
//               placeholder="  Select a business category "
//               styles={customStyles(darkMode)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-3">Address</label>
//             <textarea
//               type="textarea"
//               name="address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="bn-textField-input-business w-full"
//               placeholder="Enter your business address"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-3">Owner</label>
//             <input
//               type="text"
//               name="owner"
//               value={owner}
//               onChange={(e) => setOwner(e.target.value)}
//               className="bn-textField-input-business w-full"
//               placeholder="Enter your business owner"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-3">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               name="phoneNumber"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="bn-textField-input-business w-full"
//               placeholder="Enter your business phone number"
//               required
//             />
//           </div>

//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="bn-button bn-button__primary data-size-large w-full mt-[30px]"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import toast from "react-hot-toast";
import { addBusiness, getCategory } from "./Helper/ApiFunction";

const customStyles = (darkMode) => ({
  control: (provided) => ({
    ...provided,
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
  }),
  input: (provided) => ({
    ...provided,
    color: darkMode ? "white" : "black",
    width: '100%',
    overflow: 'hidden',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: darkMode ? "white" : "black",
    maxWidth: 'calc(100% - 20px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: darkMode ? "#cccccc" : "#666666",
  }),
  valueContainer: (provided) => ({
    ...provided,
    width: '100%',
    overflow: 'hidden',
  }),
});

const initialFormState = {
  businessName: "",
  category: "",
  address: "",
  owner: "",
  phoneNumber: "",
};

export default function BusinessRegistration() {
  const [formData, setFormData] = useState(initialFormState);
  const [categories, setCategories] = useState([]);
  const selectRef = useRef();
  const token = sessionStorage.getItem("Token");
  const userId = sessionStorage.getItem("UserId");
  const darkMode = useSelector((state) => state.theme.darkMode);

  const options = categories.map(({ name }) => ({
    value: name,
    label: name,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const { category, businessName, address, owner, phoneNumber } = formData;
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
      } else {
        toast.error(res?.message || "Something went wrong.");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setFormData(initialFormState);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategory(token);
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container-fluid">
      <div className="w-[100%] sm:w-[50%] md:w-[50%] lg:w-[30%] mx-auto rounded-lg business-container min-h-[100vh] lg:min-h-[80vh] p-[10px] sm:p-0">
        <form className="space-y-4 content-card-business first-screen-content w-full p-[30px] p-6">
          <h2 className="text-2xl font-bold mb-[32px] heading-addBusiness">
            Add Business
          </h2>

          <div>
            <label className="block text-sm font-medium mb-3">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="bn-textField-input-business w-full"
              placeholder="Enter your business name"
              required
            />
          </div>

          <div className="relative w-full">
            <label className="block text-sm font-medium mb-3">Category</label>
            <Select
              ref={selectRef}
              className={`my-select ${darkMode ? "my-select--dark" : ""}`}
              classNamePrefix="my-select"
              options={options}
              value={formData.category ? options.find(opt => opt.value === formData.category) : null}
              onChange={(selected) =>
                setFormData(prev => ({ ...prev, category: selected?.value || "" }))
              }
              menuPlacement="auto"
              menuPosition="fixed"
              menuShouldScrollIntoView={true}
              placeholder="Select a business category"
              styles={customStyles(darkMode)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="bn-textField-input-business w-full"
              placeholder="Enter your business address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Owner</label>
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              className="bn-textField-input-business w-full"
              placeholder="Enter your business owner"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bn-textField-input-business w-full"
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
    </div>
  );
}