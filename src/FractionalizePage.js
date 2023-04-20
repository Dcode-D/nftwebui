import { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "./context/DataContext";

const FractionalizePage = () => {
    const [supply, setSupply] = useState(0);
    const [approved, setApproved] = useState(false);
    const [uri, setUri] = useState('');
    const [attributes, setAttributes] = useState([]);
    const {getTokenURI,getAttributes,approveTokenToFractionalize, fractionalizeToken} = useContext(DataContext);
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


    const handleInput = (event) => {
        setSupply(event.target.value);
    };

    const handleApprove = async() => {
        const result = await approveTokenToFractionalize(id);
        if(result) setApproved(true);
        else alert("Approve failed!");
    }

    const handleFractionalize = async() => {
        const result = await fractionalizeToken("FractionalizedToken","FToken",id,supply);
        if(result) alert("Token fractionalized successfully!");
        else alert("Token fractionalization failed!");
        navigate("/")
    };

    return (
        <div className="container my-5">
            <h2>Send Token #{id}</h2>
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
                                <li key={index}>{attribute}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            { approved?
                <div className="mt-5">
                    <div className="mb-3">
                        <label htmlFor="recipient" className="form-label">Total supply</label>
                        <input type="number" className="form-control" id="recipient" value={supply}
                               onChange={handleInput}/>
                    </div>
                    <button className="btn btn-primary" onClick={handleFractionalize}>Fractionalize</button>
                </div>
                :
                <button className='btn btn-primary' onClick={handleApprove}>Approve</button>
            }
        </div>
    );
};

export default FractionalizePage;
