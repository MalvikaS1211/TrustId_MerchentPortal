import axios from "axios";
import { useState } from "react";

// export const URLApi = "https://trst.ink/merchnat";
export const URLApi = "http://localhost:8080/merchnat";
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

    return response.data
  } catch (error) {
    console.log("Error verifyOTP :", error);
  }
}



export async function checkSession(sessionId) {
  try {
    const response = await axios.get(`${URLApi}/listen-session?sessionId=${sessionId}`);

    return response.data
  } catch (error) {
    console.log("Error verifyOTP :", error);
  }
}