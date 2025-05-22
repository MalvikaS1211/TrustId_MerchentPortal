import axios from "axios";
import { useState } from "react";

export const URLApi = "https://trst.ink/merchnat";
// export const URLApi = "http://localhost:8080/merchnat";
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

export async function getCategory() {
  try {
    const response = await axios.get(`${URLApi}/fetch-category`);

    return response.data;
  } catch (error) {
    console.log("Error getCategory :", error);
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

export async function KycTranscations(businessId, page = 1, limit = 50) {
  try {
    const response = await axios.get(`${URLApi}/token-transfers-userdata`, {
      params: {
        businessId,
        page,
        limit,
      },
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });

    console.log(response.data, "in KycTranscations");
    return response.data;
  } catch (error) {
    console.log("Error in KycTranscations:", error);
    return null;
  }
}

export async function visitorData(businessId) {
  try {
    const response = await axios.get(`${URLApi}/VistorCount-dashborad`, {
      params: {
        businessId,
      },
    });

    console.log(response.data, "in visitorData");
    return response.data;
  } catch (error) {
    console.log("Error in visitorData:", error);
    return null;
  }
}
