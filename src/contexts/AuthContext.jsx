import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { BASE_URL } from "../utils/consts";
import $axios from "../utils/axios";
import { Await, useNavigate } from "react-router-dom";

const authContext = createContext();

export function useAuthContext() {
  return useContext(authContext);
}
const initState = {
  users: [],
  oneUser: null,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "user":
      return { ...state, user: action.payload };
    case "users":
      return { ...state, users: action.payload };
    case "oneUser":
      return { ...state, oneUser: action.payload };
    default:
      return state;
  }
}

const AuthContext = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initState);

  async function register(credentials) {
    try {
      await $axios.post(`${BASE_URL}/register/`, credentials);
    } catch (e) {
      console.log(e);
    }
  }

  async function login(credentials) {
    try {
      const { data: tokens } = await axios.post(
        `${BASE_URL}/login/`,
        credentials
      );
      console.log("what we send to back in body for login: ",credentials);
      console.log("tokens we got: ",tokens);

      console.log({
        username: credentials.username
      });
      const { data } = await axios.post(
        `${BASE_URL}/api/api/user/`,
        {
          username : credentials.username
        }
      );
        console.log("what api api user returns: ",data);
      dispatch({
        type: "user",
        payload: data,
      });
      const LSData = {
        tokens: tokens,
        id: data.id,
      }
      localStorage.setItem("LSData", JSON.stringify(LSData));
    } catch (e) {
      console.log(e);
    }
  }
  function logout() {
    localStorage.removeItem("LSData");
    dispatch({
      type: "user",
      payload: null,
    });
  }

  async function checkAuth() {
    try {
      const LSData = JSON.parse(localStorage.getItem("LSData"));
      if (LSData) {
        const { data } = await axios.get(`${BASE_URL}/users/${LSData.id}`);
        dispatch({
          type: "user",
          payload: data,
        });
      } else {
        dispatch({
          type: "user",
          payload: null,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function activateUser(code) {
    try {
      const res = await $axios.post(`${BASE_URL}/activate/`, {
        code,
      });

      console.log(res, "code");
      navigate("/auth");
    } catch (e) {
      console.log(e);
    }
  }
  async function getUsers() {
    try {
      const { data } = await $axios.get(`${BASE_URL}/users/`);
      console.log(data);
      dispatch({
        type: "users",
        payload: data,
      });
      console.log(state.users);
    } catch (e) {
      console.log(e);
    }
  }
  async function getOneUser(username) {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/api/user/`, {username : username});
      dispatch({
        type: "oneUser",
        payload: data,
      });
      console.log(state.oneUser);
    } catch (e) {
      console.log(e);
    }
  }
  const value = {
    user: state.user,
    oneUser: state.oneUser,
    users: state.users,
    register,
    login,
    logout,
    checkAuth,
    activateUser,
    getUsers,
    getOneUser,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;