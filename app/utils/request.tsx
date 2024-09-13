import axios from "axios";
import config from "../config/config";

interface RequestOptions {
  url: string;
  method: string;
  data?: any;
}

const request = async ({ url, method, data = null }: RequestOptions) => {
  try {
    const headers = {
      Authorization: `Bearer ${config.AUTH.API_TOKEN}`,
      "Content-Type": "application/json"
    };
    
    const options: object = {
      url: config.URL.URL_MOVIES + url,
      method,
      headers,
      ...(method !== "GET" && data !== null && { data: JSON.stringify(data) })
    };

    const response = await axios(options);
    return response.data;
  } catch (error: any) {
      console.error("Error en la solicitud:", error.response?.data);
    throw error;
  }
};

export default request;
