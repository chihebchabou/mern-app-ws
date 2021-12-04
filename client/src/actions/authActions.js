import axios from "axios";
import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "./types";

// Get user
export const getUser = () => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.token,
      },
    };

    try {
      const res = await axios.get("/api/auth", config);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
};

// Register user
export const register = (formData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/users", formData, config);
      console.log(res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
};

// Login user
export const login = (formData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
};

// Logout user
export const logout = () => {
  return { type: LOGOUT };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
