import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// This is just a dummy context file which exports loggedIn state and function to set LoggedIn status

interface Props {
  children: ReactNode;
}

interface AuthStatus {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext({} as AuthStatus);

const AuthProvider = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
