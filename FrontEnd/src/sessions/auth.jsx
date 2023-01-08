import { getCookie, setCookie, removeCookie } from "./cookies";
import {
  setLocalStorage,
  removeLocalStorage,
  getLocalStorage,
} from "../localSrorage/localStorage";

export const SetAuthentication = (token, user) => {
  console.log("callling SetAuthentication in auth file");
  setCookie("token", token);
  setLocalStorage("user", user);
};
export const isAuthenticated = () => {
  if (getCookie("token") && getLocalStorage("user")) {
    return getLocalStorage("user");
  } else {
    return false;
  }
};

export const logout = () => {
  removeCookie("token");
  removeLocalStorage("user");
};

export const getUserID = () => {
  if (getLocalStorage("user")) {
    return getLocalStorage("user")._id;
  } else {
    return false;
  }
};

export const setPathId = (pathId) => {
  setLocalStorage("pathId", pathId);
};

export const getPathId = () => {
  if (getLocalStorage("pathId")) {
    return getLocalStorage("pathId");
  } else {
    return false;
  }
};

// export { SetAuthentication };
