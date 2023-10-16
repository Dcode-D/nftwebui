import {createContext, useState, useEffect} from "react";
import useWindowSize from "../hooks/useWindowSize";
import useMetamask from "../hooks/useMetamask";

const DataContext = createContext({});

export const DataProvider = ({children})=>{
    const {width} = useWindowSize();
    const {
      web3,
      accounts,
      error,
      mintToken,
      getTokenIds,
      getMetamask,
      checkBalanceOf,
      sendToken,
      setFee,
    } = useMetamask();
    return (
      <DataContext.Provider
        value={{
          width,
          accounts,
          mintToken,
          getTokenIds,
          getMetamask,
          checkBalanceOf,
          sendToken,
          setFee,
        }}
      >
        {children}
      </DataContext.Provider>
    );
}

export default DataContext;