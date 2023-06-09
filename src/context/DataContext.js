import {createContext, useState, useEffect} from "react";
import useWindowSize from "../hooks/useWindowSize";
import useMetamask from "../hooks/useMetamask";

const DataContext = createContext({});

export const DataProvider = ({children})=>{
    const {width} = useWindowSize();
    const { web3, accounts, error, sendTransaction, mintToken,getNextId,getTokensOfOwner,getMetamask,getTokenURI,getAttributes,
        mintWithAttributes, sendToken, approveTokenToFractionalize, splitToken, mergeToken, getParent,
        getCurrentTotalShares, getSharesValue, getAllDescendants, checkOwnerOf,
        getParts, getOriginalToken, mergeAttributes, separateAttributes, fractionalizeToken, getAssociatedFractions
        ,getSharesBalance, getTotalSupplyOfShare, getFractionedId, retrieveFractionedToken,sendShare} = useMetamask();
    return (
    <DataContext.Provider value={{width,accounts,mintToken,getNextId,getTokensOfOwner,getMetamask,getTokenURI,getAttributes,
        mintWithAttributes, sendToken, approveTokenToFractionalize, splitToken, mergeToken, getParent,
        getCurrentTotalShares, getSharesValue, getAllDescendants,checkOwnerOf, getParts, getOriginalToken, mergeAttributes, separateAttributes,
        fractionalizeToken, getAssociatedFractions, getSharesBalance, getTotalSupplyOfShare, getFractionedId,
        retrieveFractionedToken,sendShare}}>
        {children}
    </DataContext.Provider>
    )
}

export default DataContext;