import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import CryptoJS from "crypto-js";

const AuthContext = createContext();

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Helper function for encryption
  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  };

  // Helper function for decryption
  const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData ? JSON.parse(decryptedData) : null;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const decryptedUser = decryptData(storedUser);
      if (decryptedUser) setUser(decryptedUser);
    }
  }, []);

  const login = (userData) => {
    const encryptedUserData = encryptData(userData);
    setUser(userData);
    localStorage.setItem("user", encryptedUserData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
