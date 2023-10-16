import {useEffect,useContext,useState} from "react";
import DataContext from "./context/DataContext";
import TokenTag from "./tokenTag";
import useWindowSize from "./hooks/useWindowSize";
import './DetailsPage.css'

const DetailsPage = ()=>{
    const { accounts, getTokenIds } = useContext(DataContext);
    const [tokens,setTokens] = useState([]);
    const {height,width} = useWindowSize();
    useEffect(()=>{

        const gettokens = async ()=>{
            const tmptd = await getTokenIds();
            setTokens(tmptd);
        }

        gettokens();
    },[])
    return (
        <div className="DetailPage">
            <h1>Detail Page</h1>
            <h2>hello:{accounts[0]}</h2>
            {/*<h2>Next ID: {nextId}</h2>*/}
            <div className="token_container">
                {tokens!==undefined && tokens.length>0?tokens.map((token)=>{
                    return <TokenTag tokenid={token}/>
                }):<h2>No tokens</h2>}
            </div>
        </div>
    )
}
export default DetailsPage