import axios from "axios";

  // export const api = axios.create({  baseURL: "http://localhost:8080"});
// 
  
  // export const api = axios.create({ baseURL: "http://34.203.98.156:8080" });
  // export const api = axios.create({ baseURL: "https://54.85.8.79:8080" });
  // export const api = axios.create({
  //   baseURL: "http://localhost:8080/api/v1",  
  // });

// 
export const api = axios.create({ baseURL: "https://graphyne.in/api/v1" });
// export const api = axios.create({ baseURL: "http://54.163.12.181:8080/api/v1" });

export const authenticateUser = (data) => {
  setAuthToken(data);
  return;
};

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = token;
  } else { 
    delete api.defaults.headers.common["Authorization"];
  }
  return;
};
const cookie = localStorage.getItem("token");

api.interceptors.request.use((req) => {
  if (cookie) {
    req.headers.Accept = "application/json";
    req.headers.Authorization = localStorage.getItem("token");
  }

  return req;
});
