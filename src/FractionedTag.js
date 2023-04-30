import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import web3 from 'web3';
import DataContext from './context/DataContext';
import './tokenTag.css'

import './FractionedTag.css';

const FractionedTag = ({ address }) => {
    const [tokenID, setTokenID] = useState(0);
    const [totalSupply, setTotalSupply] = useState();
    const [balance, setBalance] = useState();
    const { getFractionedId, getTotalSupplyOfShare, getSharesBalance, retrieveFractionedToken } = useContext(DataContext);

    const navigate = useNavigate();

    useEffect(() => {
        async function getTokenId() {
            try {
                const tmp = await getFractionedId(address);
                setTokenID(tmp);
            } catch (e) {
                console.log(e);
            }
        }
        async function getBalance() {
            try {
                const tmp = await getSharesBalance(address);
                setBalance(tmp);
            } catch (error) {
                console.error('Error getting balance:', error);
            }
        }

        async function getTotalSupply() {
            try {
                const tmp = await getTotalSupplyOfShare(address);
                setTotalSupply(tmp);
            } catch (error) {
                console.error('Error getting total supply:', error);
            }
        }

        getTokenId();
        getBalance();
        getTotalSupply();
    }, []);

    async function retrieveToken() {
        if(parseInt(balance)<parseInt(totalSupply)) return alert('Cannot retrieve token');
        try {
            const result = await retrieveFractionedToken(address);
            if (result) {
                alert('Token retrieved successfully');
                navigate('/details');
            }else {
                console.log('Error retrieving token');
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    }

    async function sendToken() {
        navigate(`/sendfraction/${address}`)
    }

    return (
        <div className="token-tag">
            <div className="Contract-address">
                <span>Contract address:</span> {address}
            </div>
            <div className="token-id">
                <span>Token ID:</span> {tokenID}
            </div>
            <div className="total-supply">
                <span>Total Supply:</span> {totalSupply || '-'}
            </div>
            <div className="balance">
                <span>Balance:</span> {balance || '-'}
            </div>
            <button className='btn btn-primary' onClick={sendToken}>
                Send
            </button>
            <button className='btn btn-primary' onClick={retrieveToken}>
                Retrieve Token
            </button>
        </div>
    );
};

export default FractionedTag;
