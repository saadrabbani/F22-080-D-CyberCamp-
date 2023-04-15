import Cookies from "js-cookie";

export const setCookie = (key, value) => {
  Cookies.set(key, value, {
    expires: 1,
  });
};

export const removeCookie = (key) => {
  Cookies.remove(key, {
    expires: 1,
  });
};

// get from cookie such as stored token
// will be useful when we need to make request to server with token
export const getCookie = (key) => {
  return Cookies.get(key);
};
