import './tokenTag.css'
import React from 'react';
import DataContext from "./context/DataContext";
import {useNavigate} from "react-router-dom";

const {useEffect, useState,useContext} = React;

const Tag = ({ tokenid }) => {
    const [balance, setBalance] = useState('');
    const { checkBalanceOf } = useContext(DataContext);
    const navigate = useNavigate();
    useEffect(() => {
      const getBalance = async () => {
        const balance = await checkBalanceOf(tokenid);
        setBalance(balance);
      };

      getBalance();
    }, []);
    return (
      <div className="tag position-relative container d-flex justify-content-center py-3">
        <div className="row align-items-center">
          <div className="col-12 col-sm-5 col-md-3">
            <p>Token with ID {tokenid}</p>
            <p>Balance: {balance}</p>
          </div>
          <div className="col-6 col-sm-2 col-md-3">
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
