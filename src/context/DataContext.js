import {createContext, useState, useEffect} from "react";
import useWindowSize from "../hooks/useWindowSize";
import useMetamask from "../hooks/useMetamask";

const DataContext = createContext({});

export const DataProvider = ({children})=>{
    const {width} = useWindowSize();
    const { web3, accounts, error, mintToken,getTokensOfOwner,getMetamask,getTokenURI,
        checkOwnerOf, sendToken} = useMetamask();
    return (
    <DataContext.Provider value={{width,accounts,mintToken,getTokensOfOwner,getMetamask,getTokenURI,
        checkOwnerOf, sendToken }}>
        {children}
    </DataContext.Provider>
    )
}

export default DataContext;