import './tokenTag.css'
import React from 'react';
import DataContext from "./context/DataContext";
import {useNavigate} from "react-router-dom";

const {useEffect, useState,useContext} = React;




const Tag = ({ tokenid }) => {
    const [uri, setUri] = useState('');
    const [attributes, setAttributes] = useState([]);
    const [loadingshares, setLoadingShares] = useState(true);
    const [sharesStatus, setSharesStatus] = useState('');
    const {getTokenURI,getAttributes, getParent, getSharesValue, getCurrentTotalShares} = useContext(DataContext);
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
        const checkIfOriginal = async () => {
            const sharevalue = await getSharesValue(tokenid);
            if (sharevalue == 0) {
                setSharesStatus('original');
                setLoadingShares(false);
            }
            else {
                let parent = tokenid;
                let percent = -1;
                while (true){
                    const shares = await getSharesValue(parent);
                    if (shares == 0){
                        setSharesStatus(percent.toString());
                        setLoadingShares(false);
                        break;
                    }
                    parent = await getParent(parent);
                    const totalShares = await getCurrentTotalShares(parent);
                    percent===-1?percent= shares/totalShares: percent /=  totalShares;
                }
            }
        }
        geturi();
        getattributes();
        checkIfOriginal();
    },[])
    return (
        <div className="tag position-relative container d-flex justify-content-center py-3" >
            <p className="position-absolute top-0 end-0">{
                loadingshares ? 'loading...' : sharesStatus
            }</p>
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
                <div className='col-6 col-sm-2 col-md-3'>
                    <button className="btn btn-primary"
                            onClick={()=>{
                        navigate(`/send/${tokenid}`)
                    }}>Send</button>
                    <div className="w-100" style={{height:'10px'}}></div>
                    <button className='btn btn-primary'
                            onClick={()=>{navigate(`/split/${tokenid}`)}}>Split</button>
                    <button className='ms-1 btn btn-primary' onClick={()=>navigate(`/merge/${tokenid}`)}>merge</button>
                    <div className='w-100'></div>
                    <button className='mt-1 btn btn-primary' onClick={()=>navigate(`/splattributes/${tokenid}`)}>Split attributes</button>
                    <div className='w-100'></div>
                    <button className='mt-1 btn btn-primary' onClick={()=>navigate(`/mergeattributes/${tokenid}`)}>Merge attributes</button>
                </div>
            </div>
        </div>
    );
};

export default Tag;
