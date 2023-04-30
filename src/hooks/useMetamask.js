import { useState, useEffect } from 'react';
import Web3 from 'web3';
import getContract from "../Utils/getContract";
import {getFractionalizeContract, getSharesContract} from "../Utils/getContract";

export const useMetamask = () => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const[contract,setContract] = useState(null);
    const [FractionalizeContract, setFractionalizeContract] = useState(null);
    const [error, setError] = useState(null);
    const getMetamask = async () => {
        if (window.ethereum) {
            try {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accs = await web3Instance.eth.getAccounts();
                setAccounts(accs);
                const ctr = getContract(web3Instance);
                setContract(ctr);
                const fctr = getFractionalizeContract(web3Instance);
                setFractionalizeContract(fctr);
            } catch (err) {
                setError(err.message);
            }
        } else {
            setError('MetaMask is not installed');
            alert('MetaMask is not installed');
        }
    }

    useEffect(() => {
        const loadWeb3 = async () => {
            await getMetamask();
        };

        loadWeb3();
    }, []);

    const sendTransaction = async (
        toAddress,
        tokenId,
    ) => {
        try {
            contract.methods.transferFrom(accounts[0], toAddress, tokenId).send({from: accounts[0]})
        } catch (err) {
            console.log(err.message);
        }
    };

    const mintToken = async (address,tokenURI) => {
        try {
            await contract.methods.mint(address,tokenURI).send({from: accounts[0]})
            return true;
        } catch (err) {
            console.log(err.message);
            return false;
        }
    }

    const mintWithAttributes = async (address,tokenURI,attributes) => {
        const handledattributes = attributes.filter((attribute)=>attribute.value && attribute.name && attribute.value!=="" && attribute.name!=="");
        let attributenames = [];
        let attributevalues = [];
        handledattributes.forEach((attribute)=>{
            attributenames.push(attribute.name);
            attributevalues.push(attribute.value);
        })
        try {
            await contract.methods.mintWithAttributes(address,tokenURI,attributenames,attributevalues).send({from: accounts[0]})
            return true;
        } catch (err) {
            console.log(err.message);
            return false;
        }
    }

    const getNextId = async () => {
        try {
            const next = await contract.methods.getNextId().call()
            return next;
        } catch (err) {
            console.log(err.message);
        }
    }

    const getTokensOfOwner = async () => {
        try {
            const tokens = await contract.methods.tokenOfOwner(accounts[0]).call()
            return tokens;
        } catch (err) {
            console.log(err.message);
        }
    }

    const getTokenURI = async (tokenId) => {
        try {
            const uri = await contract.methods.tokenURI(tokenId).call()
            return uri;
        } catch (err) {
            console.log(err.message);
        }
    }


    const getAttributes = async (tokenId) => {
        try {
            const attributes = await contract.methods.getAttributes(tokenId).call()
            return attributes;
        } catch (err) {
            console.log(err.message);
        }
    }

    const sendToken = async (tokenId, toAddress) => {
        try {
            await contract.methods.transferFrom(accounts[0], toAddress, tokenId).send({from: accounts[0]})
            return true;
        } catch (err) {
            console.log(err.message);
            return false;
        }
    }

    const approveTokenToFractionalize = async (tokenId) => {
        try{
            await contract.methods.approve(FractionalizeContract._address,tokenId).send({from: accounts[0]})
            return true;
        }catch (e) {
            console.log(e.message)
            return false;
        }
    }

    const splitToken = async (tokenId, Arrtokenuri, Arrtokenshares) => {
        try{
            if(!Array.isArray(Arrtokenshares)||!Array.isArray(Arrtokenuri)) {
                console.log('is not array')
                return false;
            }
            if(Arrtokenshares.length===0)
                return false;
            else
                await contract.methods.splitWithShares(tokenId,Arrtokenuri,Arrtokenshares).send({from: accounts[0]})
            return true;
        }catch (e) {
            console.log(e.message)
            return false;
        }
    }

    const mergeToken = async (tokenIds) => {
        try{
            if(!Array.isArray(tokenIds))
                return false;
            await contract.methods.merge(tokenIds).send({from: accounts[0]})
            return true;
        }catch (e) {
            console.log(e.message)
            return false;
        }
    }

    const getParent = async (tokenId) => {
        try{
            const parent = await contract.methods.getParent(tokenId).call()
            return parent;
        }catch (e) {
            console.log(e.message)
            return false;
        }
    }

    const getCurrentTotalShares = async (tokenId) => {
        try{
            const shares = await contract.methods.getCurrentTotalShares(tokenId).call()
            return shares;
        }catch (e) {
            console.log(e.message)
            return false;
        }
    }

    const getSharesValue = async (tokenId) => {
        try{
            const shares = await contract.methods.getSharesOfChild(tokenId).call()
            return shares;
        }catch (e) {
            console.log(e.message)
            return false;
        }
    }

    const getAllDescendants = async (tokenId) => {
        try{
            const descendants = await contract.methods.getAllDescendants(tokenId).call()
            return descendants;
        }catch (e) {
            console.log(e.message)
            return false;
        }
    }

    const checkOwnerOf = async (tokenId) => {
        try{
            const owner = await contract.methods.ownerOf(tokenId).call()
            return owner === accounts[0];
        }catch (e) {
            console.log(e.message)
            return false;
        }
    }

    const separateAttributes = async (tokenId) => {
        try{
            await contract.methods.separate(tokenId).send({from: accounts[0]})
            return true;
        }catch (e){
            console.log(e.message)
            return false;
        }
    }
    const mergeAttributes = async (tokenIds) => {
        try{
            await contract.methods.combine(tokenIds).send({from: accounts[0]})
            return true;
        }catch (e){
            console.log(e.message)
            return false;
        }
    }
    const getOriginalToken = async (tokenId) => {
        try{
            const original = await contract.methods.getOriginal(tokenId).call()
            return original;
        }catch (e){
            console.log(e.message)
            return false;
        }
    }

    const getParts = async (tokenId) => {
        try{
            const parts = await contract.methods.getParts(tokenId).call()
            return parts;
        }catch (e){
            console.log(e.message)
            return false;
        }
    }

    const fractionalizeToken = async (name, symbol, id, supply) => {
        try{
            await FractionalizeContract.methods.createFraction(name,symbol,id,supply,accounts[0]).send({from: accounts[0]})
            return true;
        }catch (e){
            console.log(e.message)
            return false;
        }
    }

    const getAssociatedFractions = async () => {
        try{
            const associated = await FractionalizeContract.methods.getUserFractions(accounts[0]).call()
            return associated;
        }catch (e){
            console.log(e.message)
            return false;
        }
    }

    const getTotalSupplyOfShare = async (shareAddress) => {
        try{
            const shareContract = getSharesContract(web3, shareAddress)
            const totalSupply = await shareContract.methods.totalSupply().call()
            return totalSupply;
        }catch (e){
            console.log(e.message)
            return false;
        }
    }

    const getSharesBalance = async (shareAddress) => {
        try{
            const shareContract = getSharesContract(web3, shareAddress)
            const balance = await shareContract.methods.balanceOf(accounts[0]).call()
            return balance;
        }catch (e){
            console.log(e.message)
            return false;
        }
    }

    const sendShare = async (shareAddress, toAddress, amount) => {
        try{
            const shareContract = getSharesContract(web3, shareAddress)
            await shareContract.methods.transfer(toAddress, amount).send({from: accounts[0]})
            return true;
        }catch (e){
            console.log(e.message)
            return false;
        }
    }

    const getFractionedId = async (shareAddress) => {
        try{
            const shareContract = getSharesContract(web3, shareAddress)
            const id = await shareContract.methods.getnftId().call()
            return id;
        }catch (e){
            console.log(e.message)
            return false;
        }
    }
    const retrieveFractionedToken = async (shareAddress) => {
        try{
            await FractionalizeContract.methods.withdrawNft(shareAddress).send({from: accounts[0]})
            return true;
        }
        catch (e){
            console.log(e.message)
            return false;
        }
    }

    return { web3, accounts, error, sendTransaction, mintToken, getNextId,getTokensOfOwner,getMetamask,getTokenURI,getAttributes,mintWithAttributes, sendToken, approveTokenToFractionalize,
        splitToken,mergeToken, getParent, getCurrentTotalShares, getSharesValue, getAllDescendants, checkOwnerOf,
        separateAttributes, mergeAttributes, getOriginalToken, getParts, fractionalizeToken, getAssociatedFractions,
        getTotalSupplyOfShare, getSharesBalance, sendShare, getFractionedId, retrieveFractionedToken
    }
};
export default useMetamask;