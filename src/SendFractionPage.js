import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import web3 from 'web3';
import DataContext from './context/DataContext';

const SendFractionPage = () => {
    const {address} = useParams();
    const [tokenID, setTokenID] = useState(0);
    const [totalSupply, setTotalSupply] = useState();
    const [balance, setBalance] = useState();
    const [amount, setAmount] = useState();
    const [receiver, setReceiver] = useState('');
    const { getFractionedId, getTotalSupplyOfShare, getSharesBalance, sendShare } = useContext(DataContext);

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


    async function sendToken() {
        try {
            if (address && receiver && amount && parseInt(amount)<=parseInt(balance)) {
                const result = await sendShare(address,receiver, amount);
                if (result) {
                    alert('Token sent successfully');
                    navigate('/details');
                } else {
                    console.log('Error sending token');
                }
            } else {
                alert('Please fill in all fields');
            }
        } catch (error) {
            console.error('Error sending token:', error);
        }
    }

    return (
        <div className="token-tag">
            <div className="token-id">
                <span>Token ID:</span> {tokenID}
            </div>
            <div className="total-supply">
                <span>Total Supply:</span> {totalSupply || '-'}
            </div>
            <div className="balance">
                <span>Balance:</span> {balance || '-'}
            </div>
            <div>
                <label>Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
                <label>Receiver:</label>
                <input type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
            </div>
            <button className='btn btn-primary' onClick={sendToken}>
                Send
            </button>
        </div>
    );
};

export default SendFractionPage;
