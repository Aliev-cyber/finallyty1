import React, { createContext, useContext } from "react";

const productContext = createContext();

export function useProductContext() {
  return useContext(productContext);
}

const ProductContext = () => {
  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
};

export default ProductContext;
