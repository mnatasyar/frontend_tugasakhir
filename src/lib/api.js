import axios from "axios";
import { BASE_URL } from "./constants";

export const analyzeFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const isImage = file.type.startsWith("image/");
  const endpoint = isImage ? "/analyze/image" : "/analyze/video";

  const response = await axios.post(`${BASE_URL}${endpoint}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
