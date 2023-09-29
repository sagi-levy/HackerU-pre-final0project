import { useContext, useState } from "react";
import { createContext } from "react";
import userServices, { logINUser, getUser } from "../services/userApiServices";
const authContext = createContext(null);
authContext.displayName = "auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const refreshUser = () => setUser(getUser());

  const logIn = async (credentials) => {
    const response = await logINUser(credentials);
    refreshUser();
    return response;
  };
  const logout = () => {
    userServices.logOut();
    refreshUser();
  };

  return (
    <authContext.Provider
      value={{
        user,
        logIn,
        logout,

        createUser: userServices.createUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
