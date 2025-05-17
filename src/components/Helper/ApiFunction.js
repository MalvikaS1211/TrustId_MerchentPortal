import axios from "axios";
import { useState } from "react";

export const URLApi = "https://trst.ink/merchnat";
export async function generateOTP(mobile_Number) {
  try {
    const response = await axios.post(`${URLApi}/loginOtp`, {
      mobile_Number,
    });

    return response.data;
  } catch (error) {
    console.log("Error generateOTP :", error);
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
