import axios from "axios";

const api = axios.create({
  baseURL: `https://api.borabora.app/api/v1/`,
  withCredentials: true,
});

const get = async (url, config = {}) => {
  try {
    const response = await api.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const post = async (url, request, config = {}) => {
  try {
    const response = await api.post(url, request, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const put = async (url, request, config = {}) => {
  try {
    const response = await api.put(url, request, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (url, config = {}) => {
  try {
    const response = await api.delete(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { get, post, put, remove };
