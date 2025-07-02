import axios from "axios";
import { useState } from "react";

export const URLApi = "https://trst.ink/business";
// export const URLApi = "http://localhost:8080/business";
export async function generateOTP(mobile_Number) {
  try {
    const response = await axios.post(`${URLApi}/loginOtp`, {
      mobile_Number,
    });

    return response.data;
  } catch (error) {
    console.log("Error generateOTP :", error);
    throw error;
  }
}
export async function verifyOTP(mobile_Number, otp) {
  try {
    const response = await axios.post(`${URLApi}/verify-loginOtp`, {
      mobile_Number,
      otp,
    });

    return response.data;
  } catch (error) {
    console.log("Error verifyOTP :", error);
  }
}

export async function createSession() {
  try {
    const response = await axios.get(`${URLApi}/create-session`);

    return response.data;
  } catch (error) {
    console.log("Error createSession :", error);
  }
}

export async function checkSession(sessionId) {
  try {
    const response = await axios.get(
      `${URLApi}/listen-session?sessionId=${sessionId}`
    );

    return response.data;
  } catch (error) {
    console.log("Error checkSession :", error);
  }
}

export async function registerFace(userId, descriptor) {
  try {
    const response = await axios.post(`${URLApi}/register-face`, {
      userId,
      descriptor,
    });

    return response.data;
  } catch (error) {
    console.log(" Error in registerFace:", error);
    return null;
  }
}

export async function getCategory(token) {
  try {
    const response = await axios.get(`${URLApi}/fetch-category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getCategory:", error);
  }
}

export async function addBusiness(
  userId,
  category,
  businessName,
  addresh,
  owner,
  number,
  token
) {
  try {
    console.log(
      userId,
      category,
      businessName,
      addresh,
      owner,
      number,
      "In addBusiness api call"
    );
    const response = await axios.post(
      `${URLApi}/merchantAdd-Business`,
      {
        userId,
        category,
        businessName,
        addresh,
        owner,
        number,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "response.data in addBusiness");
    return response.data;
  } catch (error) {
    console.log("Error addBusiness :", error);
    throw error;
  }
}
export async function myProfile(userId, token) {
  try {
    const response = await axios.get(`${URLApi}/my-profile`, {
      params: {
        userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data, "in myProfile");
    return response.data;
  } catch (error) {
    console.log("Error in myProfile:", error);
    return null;
  }
}

export async function businessQR(userId) {
  try {
    const response = await axios.get(`${URLApi}/busness-QrCode`, {
      params: {
        userId,
      },
    });

    console.log(response.data, "in businessQR");
    return response.data;
  } catch (error) {
    console.log("Error in businessQR:", error);
    return null;
  }
}

export async function KycTranscations(businessId, page, limit, token) {
  try {
    const response = await axios.get(`${URLApi}/token-transfers-userdata`, {
      params: {
        businessId,
        page,
        limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data, "in KycTranscations");
    return response.data;
  } catch (error) {
    console.log("Error in KycTranscations:", error);
    return null;
  }
}

export async function visitorData(businessId, token) {
  try {
    const response = await axios.get(`${URLApi}/VistorCount-dashborad`, {
      params: {
        businessId,
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data, "in visitorData");
    return response.data;
  } catch (error) {
    console.log("Error in visitorData:", error);
    return null;
  }
}

export async function addEmployee(userId, businessId, mobile_Number, token) {
  try {
    const response = await axios.post(
      `${URLApi}/add-employee`,
      {
        userId,
        businessId,
        mobile_Number,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(userId, businessId, mobile_Number, ":::Employee");
    return response.data;
  } catch (error) {
    console.log("Error in addEmployee:", error);
    throw error;
  }
}




export async function deleteEmployee(employeeuserId, businessId, token) {
  try {
    const response = await axios.post(
      `${URLApi}/delete-employee`,
      {
        employeeuserId,
        businessId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(employeeuserId, businessId, ":::Delete Employee");
    return response.data;
  } catch (error) {
    console.log("Error in deleteEmployee:", error);
    throw error;
  }
}




export async function getEmployeeData(
  businessId,
  token,
  page = 1,
  limit = 10,
  searchQuery = ""
) {
  try {
    const params = {
      businessId: businessId,
      page: page,
      limit: limit,
    };
    if (searchQuery && searchQuery.trim() !== "") {
      params.searchQuery = searchQuery.trim();
    }

    const response = await axios.get(`${URLApi}/employees-by-businessId`, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data, "in getEmployeeData");
    return response.data;
  } catch (error) {
    console.log("Error in getEmployeeData:", error);
    return {
      status: false,
      message: error.response?.data?.message || error.message,
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
    };
  }
}
export async function getBusinessVisitors(businessId) {
  try {
    const response = await axios.get(`${URLApi}/business-visitor-management`, {
      params: {
        businessId,
      },
    });

    console.log(response.data, "in getEmployeeData");
    return response.data;
  } catch (error) {
    console.log("Error in getEmployeeData:", error);
    return null;
  }
}

export const Emplyoeedata = async (businessId) => {
  try {
    const response = await axios.get(`${URLApi}/getapi`, {
      params: {
        businessId,
      },
    });
    console.log("response Error Emplyoeedata", response.data);
    return response.data;
  } catch (error) {
    console.log("error in getemployee", error);
    return null;
  }
};

export async function visitorDataMonth(businessId, token) {
  try {
    const response = await axios.get(`${URLApi}/vistor-dashborad-month`, {
      params: {
        businessId,
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data, "in visitorData");
    return response.data;
  } catch (error) {
    console.log("Error in visitorData:", error);
    return null;
  }
}
