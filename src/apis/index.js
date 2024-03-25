import axios from "axios";
import { API_ROOT } from "../utils/constants";

export const loginAPI = async (userId, password) => {
  return await axios.post(`${API_ROOT}/v1/user/login`, {userId, password})
}

export const fetchCoursesAPI = async () => {
  const response = await axios.get(`${API_ROOT}/v1/course/`)
  return response.data
}

export const createNewCourseAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/course/`, data)
  return response.data
}
