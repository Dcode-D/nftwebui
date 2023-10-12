import './tokenTag.css'
import React from 'react';
import DataContext from "./context/DataContext";
import {useNavigate} from "react-router-dom";

const {useEffect, useState,useContext} = React;

const Tag = ({ tokenid }) => {
    const [uri, setUri] = useState('');
    const {getTokenURI} = useContext(DataContext);
    const navigate = useNavigate();
    useEffect(() => {
        const geturi = async () => {
            const tmptd = await getTokenURI(tokenid);
            setUri(tmptd);
        }

        geturi();
    },[])
    return (
        <div className="tag position-relative container d-flex justify-content-center py-3" >
            <div className="row align-items-center">
                <div className="col-12 col-sm-5 col-md-3">
                    <img className="img-fluid" src={uri} alt={`Token with ID ${tokenid}`} />
                    <a href={uri} target="_blank">token uri</a>
                </div>
                <div className='col-6 col-sm-2 col-md-3'>
                    <button className="btn btn-primary"
                            onClick={()=>{
                        navigate(`/send/${tokenid}`)
                    }}>Send</button>
                    <div className="w-100" style={{height:'10px'}}></div>
                </div>
            </div>
        </div>
    );
};

export default Tag;
