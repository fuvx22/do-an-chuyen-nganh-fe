import axios from "axios"
import { API_ROOT } from "../utils/constants"

const loginAPI = (userId, password) => {
  return axios.post(`${API_ROOT}/v1/user/login`, {userId, password})
}

export {
  loginAPI
}