import {useEffect,useContext,useState} from "react";
import DataContext from "./context/DataContext";
import TokenTag from "./tokenTag";
import useWindowSize from "./hooks/useWindowSize";
import './DetailsPage.css'

const DetailsPage = ()=>{
    const {accounts,getNextId,getTokensOfOwner} = useContext(DataContext);
    const[nextId,setNextId] = useState(0);
    const [tokens,setTokens] = useState([]);
    const {height,width} = useWindowSize();
    useEffect(()=>{
        const getnext = async ()=>{
            const tmptd = await getNextId();
            setNextId(tmptd);
        }
        const gettokens = async ()=>{
            const tmptd = await getTokensOfOwner();
            setTokens(tmptd);
        }
        getnext();
        gettokens();
    },[])
    return (
        <div className="DetailPage">
            <h1>Detail Page</h1>
            <h2>hello:{accounts[0]}</h2>
            <h2>Next ID: {nextId}</h2>
            <div className="token_container">
                {tokens.length>0?tokens.map((token)=>{
                    return <TokenTag tokenid={token}/>
                }):<h2>No tokens</h2>}
            </div>
        </div>
    )
}
export default DetailsPage