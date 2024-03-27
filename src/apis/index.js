import axios from "axios";
import { API_ROOT } from "../utils/constants";
const token = JSON.parse(localStorage.getItem("user-token"));
const REQ_HEADER = {
  headers: {
    Authorization: `Bearer ${token.accessToken}`,
  },
};
export const fetchUserAPI = async () => {
  const response = axios.get(`${API_ROOT}/v1/user/userBoard`, REQ_HEADER);
  return response;
};

export const loginAPI = async (userId, password) => {
  return await axios.post(`${API_ROOT}/v1/user/login`, { userId, password });
};

export const fetchCoursesAPI = async () => {
  const response = await axios.get(`${API_ROOT}/v1/course/`, REQ_HEADER);
  return response.data;
};

export const createNewCourseAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/course/`, data);
  return response.data;
};
