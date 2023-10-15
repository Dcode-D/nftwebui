import { useState, useEffect } from 'react';
import Web3 from 'web3';
import getContract from "../Utils/getContract";

export const useMetamask = () => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const[contract,setContract] = useState(null);
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



    const mintToken = async (address,tokenURI) => {
        try {
            const price = await contract.methods.getPrice().call()
            await contract.methods.mint(address,tokenURI).send({from: accounts[0], value: price})
            return true;
        } catch (err) {
            console.log(err.message);
            return false;
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


    const sendToken = async (tokenId, toAddress) => {
        try {
            await contract.methods.transferFrom(accounts[0], toAddress, tokenId).send({from: accounts[0]})
            return true;
        } catch (err) {
            console.log(err.message);
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

    const setPrice = async (price) => {
        try{
            await contract.methods.setPrice(web3.utils.toWei(price)).send({from: accounts[0]})
            return true;
        }catch (e) {
            console.log(e.message)
            return false;
        }
    }





    return { web3, accounts, error, mintToken,getTokensOfOwner,getMetamask,getTokenURI, checkOwnerOf,sendToken, setPrice
    }
};
export default useMetamask;