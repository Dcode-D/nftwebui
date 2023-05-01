import { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "./context/DataContext";

const SplitAttributes = () => {
    const [uri, setUri] = useState('');
    const [attributes, setAttributes] = useState([]);
    const {getTokenURI,getAttributes, separateAttributes} = useContext(DataContext);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const geturi = async () => {
            const tmptd = await getTokenURI(id);
            setUri(tmptd);
        }
        const getattributes = async () => {
            const tmptd = await getAttributes(id);
            setAttributes(tmptd);
        }
        geturi();
        getattributes();
    },[])
    const handleSplit = async () => {
        const result = await separateAttributes(id);
        if (result) {
            alert("Split attributes successfully!")
            navigate(`/details`);
        } else {
            alert("Split token failed!");
            navigate(`/details`);
        }
    }

    return (
        <div className="container my-5">
            <h2>Split Token' attributes #{id}</h2>
            <div className="tag container d-flex justify-content-center py-3">
                <div className="row align-items-center">
                    <div className="col-12 col-sm-5 col-md-3">
                        <img className="img-fluid" src={uri} alt={`Token with ID ${id}`} />
                        <a href={uri} target="_blank" rel="noopener noreferrer">token uri</a>
                    </div>
                    <div className="col-12 col-sm-5 col-md-6">
                        <h5 className="mb-3">Token ID: {id}</h5>
                        <ul className="list-unstyled">
                            {attributes.map((attribute, index) => (
                                <li key={index}>{attribute.replace('$',': ')}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <button className='btn btn-primary' onClick={
                attributes!==undefined && attributes.length>1 ? handleSplit : ()=>{alert("Not enough attributes to split!");}
            }>Split token</button>
        </div>
    );
};

export default SplitAttributes;