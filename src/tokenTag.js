import './tokenTag.css'
import React from 'react';
import DataContext from "./context/DataContext";
import {useNavigate} from "react-router-dom";
const {useEffect, useState,useContext} = React;



const Tag = ({ tokenid }) => {
    const [uri, setUri] = useState('');
    const [attributes, setAttributes] = useState([]);
    const {getTokenURI,getAttributes} = useContext(DataContext);
    const navigate = useNavigate();
    useEffect(() => {
        const geturi = async () => {
            const tmptd = await getTokenURI(tokenid);
            setUri(tmptd);
        }
        const getattributes = async () => {
            const tmptd = await getAttributes(tokenid);
            setAttributes(tmptd);
        }
        geturi();
        getattributes();
    })
    return (
        <div className="tag container d-flex justify-content-center py-3">
            <div className="row align-items-center">
                <div className="col-12 col-sm-5 col-md-3">
                    <img className="img-fluid" src={uri} alt={`Token with ID ${tokenid}`} />
                    <a href={uri} target="_blank">token uri</a>
                </div>
                <div className="col-12 col-sm-5 col-md-6">
                    <h5 className="mb-3">Token ID: {tokenid}</h5>
                    <ul className="list-unstyled">
                        {attributes.map((attribute, index) => (
                            <li key={index}>{attribute}</li>
                        ))}
                    </ul>
                </div>
                <div className='col-6 col-sm-2 col-md-3 d-flex justify-content-center'>
                    <button className="btn btn-primary" onClick={()=>{
                        navigate(`/send/${tokenid}`)
                    }}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Tag;
