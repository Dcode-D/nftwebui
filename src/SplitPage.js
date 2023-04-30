import { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "./context/DataContext";
import AddSharesComponent from "./AddSharesComponent";

const SplitPage = () => {
    const [splitList, setSplitList] = useState([]);
    const [uri, setUri] = useState('');
    const [attributes, setAttributes] = useState([]);
    const {getTokenURI,getAttributes, splitToken} = useContext(DataContext);
    const {id} = useParams();
    const navigate = useNavigate();
    const updateSplitList = (newSplitList) => {
        setSplitList(newSplitList);
    }
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
    })
    const handleSplit = async () => {
        if(splitList.length < 1) {
            alert("Not enough shares to split!");
            return;
        }
        let tokenurilist = [];
        splitList.forEach((share) => {
            if(!Number.isInteger(share))
                return alert("Invalid number error!");
            tokenurilist.push(uri)
        })
        const result = await splitToken(id, tokenurilist, splitList);
        if (result) {
            alert("Split token successfully!")
            navigate(`/details`);
        } else {
            alert("Split token failed!");
            navigate(`/details`);
        }
    }

    return (
        <div className="container my-5">
            <h2>Split Token #{id}</h2>
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
            <AddSharesComponent onChildrenListUpdate={setSplitList}></AddSharesComponent>
            <button className='btn btn-primary' onClick={handleSplit}>Split token</button>
        </div>
    );
};

export default SplitPage;