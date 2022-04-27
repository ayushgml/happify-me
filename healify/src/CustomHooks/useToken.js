import { useState, useEffect } from "react";

export const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (newToken) => {
    localStorage.setItem("token", JSON.stringify(newToken));
    setToken(newToken);
  };

  const getRole = () => {
    const roleString = localStorage.getItem("role");
    const role = JSON.parse(roleString);
    return role;
  };
  const [role, setRole] = useState(getRole());

  useEffect(() => {
    console.log("");
  }, [role]);

  const saveRole = (newRole) => {
    localStorage.setItem("role", JSON.stringify(newRole));
    setRole(newRole);
  };

  return {
    setToken: saveToken,
    token,
    role,
    setRole: saveRole,
  };
};
