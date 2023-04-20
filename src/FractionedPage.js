import {useEffect,useContext,useState} from "react";
import FractionedTag from "./FractionedTag";
import DataContext from "./context/DataContext";
const  FractionedPage = ()=>{
    const {getAssociatedFractions} = useContext(DataContext);
    const [fractionedTokens,setFractionedTokens] = useState([]);
    useEffect(()=>{
        const getFractionedTokens = async ()=>{
            try{
                const tmp = await getAssociatedFractions();
                setFractionedTokens(tmp);
                console.log(tmp);
            }catch (e) {
                console.log(e);
            }
        }
        getFractionedTokens();
    },[])
    return(
        <div className="Fractioned_Page">
            <h1>Fractioned tokens</h1>
            <div className="token_container">
                {fractionedTokens!==undefined && fractionedTokens.length>0?fractionedTokens.map((token)=>{
                    return <FractionedTag address={token}/>
                }):<h2>No tokens</h2>}
            </div>
        </div>
    )
}

export default FractionedPage