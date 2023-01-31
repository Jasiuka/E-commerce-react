import { createContext, useState } from "react";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// export const UsernameContext = createContext({
//   currentUsername: "",
//   setCurrentUsername: () => null,
// });

// Functional component. Which wraps other components in which you want access to actual value
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // const [currentUsername, setCurrentUsername] = useState("");
  const value = {
    currentUser,
    setCurrentUser,
    // currentUsername,
    // setCurrentUsername,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
