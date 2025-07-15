import { useState } from "react";
import apiService from "../services/fetch.service.js";

export const useFetch = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = async (url = '/', method = "GET", request = null) => {
    try {
      let response;

      method === "GET" && (response = await apiService.get(url));
      method === "POST" && (response = await apiService.post(url, request));
      method === "DELETE" && (response = await apiService.remove(url));
      method === "PUT" && (response = await apiService.put(url, request));

      setError(null);
      return response;
    } catch (err) {
      setError(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, setIsLoading, fetch };
};