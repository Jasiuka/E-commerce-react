import { createContext, useState } from "react";

export const CartDropDownContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const CartDropDownContextProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = {
    isCartOpen,
    setIsCartOpen,
  };

  return (
    <CartDropDownContext.Provider value={value}>
      {children}
    </CartDropDownContext.Provider>
  );
};
