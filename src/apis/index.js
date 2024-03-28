import axios from "axios";
import { API_ROOT } from "../utils/constants";

export const fetchUserAPI = async (token) => {
  const response = axios.get(`${API_ROOT}/v1/user/userBoard`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response;
};

export const loginAPI = async (userId, password) => {
  return await axios.post(`${API_ROOT}/v1/user/login`, { userId, password });
};

export const fetchCoursesAPI = async (token) => {
  const response = await axios.get(`${API_ROOT}/v1/course/`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};

export const createNewCourseAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/course/`, data);
  return response.data;
};
