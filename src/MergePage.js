import { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "./context/DataContext";

const MergePage = () => {
    const [uri, setUri] = useState('');
    const [attributes, setAttributes] = useState([]);
    const [canBeMerged, setCanBeMerged] = useState(false);
    const [isLoadingMerge, setIsLoadingMerge] = useState(true);
    const [mergeList, setMergeList] = useState([]);
    const {getTokenURI,getAttributes, getAllDescendants, getParent, checkOwnerOf, mergeToken} = useContext(DataContext);
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

        const checkIfCanBeMerged = async () => {
            let parent = id;
            let tmpparent = await getParent(parent);
            console.log(tmpparent);
            while (tmpparent != 0){
                parent = tmpparent;
                tmpparent = await getParent(parent);
            }
            if(parent == id){
                setCanBeMerged(false);
                setIsLoadingMerge(false);
            }
            else {
                const descendants = await getAllDescendants(parent);
                for(let i=0;i<descendants.length;i++){
                    if(!await checkOwnerOf(descendants[i])){
                        setCanBeMerged(false);
                        setIsLoadingMerge(false);
                        return;
                    }
                }
                let decensdantsforsort = [];
                descendants.map(item=>decensdantsforsort.push(parseInt(item)));
                decensdantsforsort = decensdantsforsort.sort();
                console.log(decensdantsforsort);
                setMergeList(decensdantsforsort);
                setIsLoadingMerge(false);
                setCanBeMerged(true);
            }
        }
        checkIfCanBeMerged();
        geturi();
        getattributes();
    },[])


    const handleMerge = async() => {
        const result = await mergeToken(mergeList);
        if(result) alert("Token merged successfully!");
        else alert("Token merged failed!");
        navigate("/details")
    };

    return (
        <div className="container my-5">
            <h2>Merge Token #{id}</h2>
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
            <div className="mt-5">
                <p>{isLoadingMerge?"Loading...":"IDs to be merged:"+mergeList.map(item=>item.toString()+' ')}</p>
                <div className="mb-3">
                </div>
                <button className="btn btn-primary" disabled={!canBeMerged} onClick={
                    canBeMerged?handleMerge:()=>{}
                }>merge</button>
            </div>
        </div>
    );
};

export default MergePage;
