"use client";

import React, { useState, useEffect, createContext, useMemo, useCallback } from "react";
import axios from "axios";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // getuser
  const getUser = useCallback(async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`)
      .then((res) => {
        if (res.data) {
          setUser(res.data);
        } else {
          setUser(res.data);
        }
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const login = useCallback(async (mobile, pin) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { mobile, pin }
      );
      await getUser();
      return response?.data;
    } catch (error) {
      return Promise.reject(error?.response?.data);
    }
  }, [getUser]);

  const logout = useCallback(async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      setUser(null);
      await getUser();
    } catch (error) {
      console.log(error);
    }
  }, [getUser]);

  useEffect(() => {
    setLoading(true);
    getUser();
    setLoading(false);
  }, [getUser]);

  const authInfo = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      getUser,
      loading,
      setLoading,
    }),
    [user, setUser, login, logout, getUser, loading, setLoading]
  );

  // console.log(user);

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full animate-spin border-4 border-solid border-cyan-500 border-t-transparent shadow-lg"></div>
            <p className="mt-4 text-lg font-semibold text-cyan-700">
              Loading, please wait...
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;