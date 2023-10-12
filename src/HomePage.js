import {useContext,useState} from "react";
import DataContext from "./context/DataContext";
import AttributesForm from "./AttributeComponent";
import './home.css';
const HomePage = ()=>{
    const {accounts,mintToken,mintWithAttributes} = useContext(DataContext);
    const [tokenURI,setTokenURI] = useState("");
    const [mintAddress,setMintAddress] = useState("");
    const [attributes,setAttributes] = useState([]);
    const handleAttributesChange = (attributes)=>{
        setAttributes(attributes);
    }
    const handleUriChange = (e)=>{
        setTokenURI(e.target.value);
    }
    const handleMintAddressChange = (e)=>{
        setMintAddress(e.target.value);
    }
    return (
        <div className="homepage">
        <form>
            <h1>Home Page</h1>

            <div className="form-group" style={{display:"flex",justifyContent:"center"}}>
                <input
                    type="text"
                    className="form-control"
                    id="uri"
                    placeholder="Token URI"
                    style={{ width: "30%" }}
                    onChange={handleUriChange}
                />
            </div>

            <div className="form-group" style={{display:"flex",justifyContent:"center"}}>
                <input
                    type="text"
                    className="form-control"
                    id="mintAddress"
                    placeholder="Mint to"
                    style={{ width: "30%" }}
                    onChange={handleMintAddressChange}
                />
            </div>

            <button
                type="button"
                className="btn btn-primary"
                onClick={async () => {
                    if (tokenURI !== "") {
                        if (mintAddress === "") {
                            let check;
                            if(attributes.length === 0)
                                check = await mintToken(accounts[0], tokenURI);
                            else
                                check = await mintWithAttributes(accounts[0], tokenURI, attributes);
                            if (check)
                                alert("Minted successfully");
                            else
                                alert("Mint failed");
                        } else {
                            const check = await mintToken(mintAddress, tokenURI);
                            if (check)
                                alert("Minted successfully");
                            else
                                alert("Mint failed");
                        }
                    } else {
                        alert("Please enter tokenURI");
                    }
                }}
                disabled={accounts.length === 0||!tokenURI}
            >
                Mint token
            </button>
            {/*<button type="Button" onClick={()=>{*/}
            {/*    console.log(attributes);*/}
            {/*}}></button>*/}
        </form>
        </div>
    )
}
export default HomePage