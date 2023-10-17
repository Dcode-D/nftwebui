import './tokenTag.css'
import React from 'react';
import DataContext from "./context/DataContext";
import {useNavigate} from "react-router-dom";

const {useEffect, useState,useContext} = React;

const Tag = ({ tokenid }) => {
    const [balance, setBalance] = useState('');
    const [tokenURI, setTokenURI] = useState('');
    const { checkBalanceOf, getTokenURI } = useContext(DataContext);
    const navigate = useNavigate();
    useEffect(() => {
      const getBalance = async () => {
        const balance = await checkBalanceOf(tokenid);
        setBalance(balance);
      };
      const getToken = async () => {
        const tokenuri = await getTokenURI(tokenid);
        setTokenURI(tokenuri);
      }

      getToken();
      getBalance();
    }, []);
    return (
      <div className="tag position-relative container d-flex justify-content-center py-3">
        <div className="row align-items-center gap-2">
          <div className="">
            <a href={tokenURI} target="_blank">
              token uri
            </a>
            <p>Token id: {tokenid}</p>
            <p>Balance: {balance}</p>
          </div>
          <div className="">
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate(`/send/${tokenid}`);
              }}
            >
              Send
            </button>
            <div className="w-100" style={{ height: "10px" }}></div>
          </div>
        </div>
      </div>
    );
};

export default Tag;
