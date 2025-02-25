"use client";

import React, { useState, useEffect, createContext, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState(null);

  // login
  const login = async (mobile, pin) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { mobile, pin }
      );
      // setUser(response.data);
      getUser();
      return response?.data;
    } catch (error) {
      return Promise.reject(error?.response?.data);
    }
  };

  // logout
  const logout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      setUser(null);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };
  // logout();
  // getuser
  const getUser = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`)
      .then((res) => {
        if(res.data){
          setUser(res.data);
        }
        else{
          setUser(res.data);
        }
      })
      .catch(() => {
        setUser(null);
      });
  };
  useEffect(() => {
    getUser();
  }, []);


  console.log(user);
  const authInfo = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      getUser,
    }),
    []
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
