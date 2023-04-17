import { useState, useEffect } from 'react';
import Web3 from 'web3';
import getContract from "../Utils/getContract";
import {getFractionalizeContract} from "../Utils/getContract";

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
            return false;
        }
    }


    return { web3, accounts, error, sendTransaction, mintToken, getNextId,getTokensOfOwner,getMetamask,getTokenURI,getAttributes,mintWithAttributes, sendToken, approveTokenToFractionalize}
};
export default useMetamask;