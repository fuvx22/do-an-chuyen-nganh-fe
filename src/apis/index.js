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

export const createNewCourseAPI = async (data, token) => {
  const response = await axios.post(`${API_ROOT}/v1/course/`, data, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};

export const editCourseAPI = async (data) => {
  const response = await axios.put(`${API_ROOT}/v1/course/edit`, data);
  return response.data;
};

export const deleteCourseAPI = async (data) => {
  const response = await axios.delete(`${API_ROOT}/v1/course/delete`, {
    data: data,
  });
  return response.data;
};

// Major
export const fetchMajorsAPI = async (token) => {
  const response = await axios.get(`${API_ROOT}/v1/major/`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};

export const createNewMajorAPI = async (data, token) => {
  const response = await axios.post(`${API_ROOT}/v1/major/`, data, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};

export const editMajorAPI = async (data) => {
  const response = await axios.put(`${API_ROOT}/v1/major/edit`, data);
  return response.data;
};

export const deleteMajorAPI = async (data) => {
  const response = await axios.delete(`${API_ROOT}/v1/major/delete`, {
    data: data,
  });
  return response.data;
};
// Semester
export const fetchSemestersAPI = async (token) => {
  const response = await axios.get(`${API_ROOT}/v1/semester/`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};

export const createNewSemesterAPI = async (data, token) => {
  const response = await axios.post(`${API_ROOT}/v1/semester/`, data, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};

export const editSemesterAPI = async (data) => {
  const response = await axios.put(`${API_ROOT}/v1/semester/edit`, data);
  return response.data;
};

export const deleteSemesterAPI = async (data) => {
  const response = await axios.delete(`${API_ROOT}/v1/semester/delete`, {
    data: data,
  });
  return response.data;
};

export const fetchSemesterByIdAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/semester/${id}`);
  return response.data;
};

// CourseSchedule
export const fetchCourseSchedulesAPI = async (token) => {
  const response = await axios.get(`${API_ROOT}/v1/courseSchedule/`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};

export const createNewCourseScheduleAPI = async (data, token) => {
  const response = await axios.post(`${API_ROOT}/v1/courseSchedule/`, data, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};

export const editCourseScheduleAPI = async (data) => {
  const response = await axios.put(`${API_ROOT}/v1/courseSchedule/edit`, data);
  return response.data;
};

export const deleteCourseScheduleAPI = async (data) => {
  const response = await axios.delete(`${API_ROOT}/v1/courseSchedule/delete`, {
    data: data,
  });
  return response.data;
};

export const getInstructor = async (token) => {
  const response = await axios.get(`${API_ROOT}/v1/instructor/`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};
export const addInstructor = async (newInstructor, token) => {
  const response = await axios.post(
    `${API_ROOT}/v1/instructor/`,
    newInstructor,
    {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );
  return response.data;
};
export const editInstructor = async (selectedInstructor, token) => {
  const response = await axios.post(
    `${API_ROOT}/v1/instructor/edit`,
    selectedInstructor,
    {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );
  return response.data;
};
export const deleteInstructor = async (id, tọken) => {
  const response = await axios.delete(
    `${API_ROOT}/v1/instructor/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${tọken.accessToken}`,
      },
    }
  );
  return response;
};

//Notify

export const fetchNotifiesAPI = async (token) => {
  const response = await axios.get(`${API_ROOT}/v1/notify/`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};

export const createNewNotifyAPI = async (data, token) => {
  const response = await axios.post(`${API_ROOT}/v1/notify/`, data, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};

export const findOneNotifyAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/notify/find`, {
    params: { id: id },
  });
  return response.data;
};

export const editNotifyAPI = async (data) => {
  const response = await axios.put(`${API_ROOT}/v1/notify/edit`, data);
  return response.data;
};

export const deleteNotifyAPI = async (data) => {
  const response = await axios.delete(`${API_ROOT}/v1/notify/delete`, {
    data: data,
  });
  return response.data;
};

// Course Schedule
export const fetchCourseSchedulesBySemesterAPI = async (token, semesterId) => {
  const response = await axios.get(
    `${API_ROOT}/v1/courseSchedule/${semesterId}`,
    {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );
  return response.data;
};

// Course Registration
export const createNewCourseRegisAPI = async (data, token) => {
  const response = await axios.post(`${API_ROOT}/v1/course-regis/`, data, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};

export const getCourseRegisByUserIdAPI = async (userId, token) => {
  const response = await axios.get(`${API_ROOT}/v1/course-regis/${userId}`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};

export const deleteCourseRegisAPI = async (data, token) => {
  const response = await axios.delete(`${API_ROOT}/v1/course-regis/`, {
    data: data,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  return response.data;
};

// Schedule
export const getTimeScheduleAPI = async (userId, semesterId, token) => {
  const response = await axios.get(
    `${API_ROOT}/v1/course-regis/time/${userId}/${semesterId}`,
    {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );
  return response.data;
};
