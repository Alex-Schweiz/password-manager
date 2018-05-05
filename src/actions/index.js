import axios from "axios";

export const password = axios.create({
  baseURL: "https://react-password-manager-7.firebaseio.com",
  headers: {
    "Content-Type": "application/json"
  }
});
