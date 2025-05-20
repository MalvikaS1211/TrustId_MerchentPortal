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
  number
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
    const response = await axios.post(`${URLApi}/merchantAdd-Business`, {
      userId,
      category,
      businessName,
      addresh,
      owner,
      number,
    });
    console.log(response.data, "response.data in addBusiness");
    return response.data;
  } catch (error) {
    console.log("Error addBusiness :", error);
  }
}
