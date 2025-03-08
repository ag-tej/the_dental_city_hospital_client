import { useContext } from "react";
import AuthContext from "./AuthContext";

export const UseAuth = () => {
  return useContext(AuthContext);
};
