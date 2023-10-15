import { useContext, useState } from "react";
import DataContext from "./context/DataContext";
import "./home.css";

const HomePage = () => {
  const { accounts, mintToken } = useContext(DataContext);
  const [tokenURI, setTokenURI] = useState("");
  const [amount, setAmount] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const handleUriChange = (e) => {
    setTokenURI(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleMintAddressChange = (e) => {
    setMintAddress(e.target.value);
  };
  return (
    <div className="homepage">
      <form>
        <h1>Home Page</h1>

        <div
          className="form-group"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <input
            type="text"
            className="form-control"
            id="uri"
            placeholder="Token URI"
            style={{ width: "30%" }}
            onChange={handleUriChange}
          />
        </div>

        <div
          className="form-group"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <input
            type="text"
            className="form-control"
            id="amount"
            placeholder="Amount"
            style={{ width: "30%" }}
            onChange={handleAmountChange}
          />
        </div>

        <div
          className="form-group"
          style={{ display: "flex", justifyContent: "center" }}
        >
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
              if (mintAddress === "") {
                let check;
                check = await mintToken(accounts[0], tokenURI, amount);    
                console.log(check);
                if (check) alert("Minted successfully");
                else alert("Mint failed");
              } else {
                const check = await mintToken(mintAddress, tokenURI, amount);
                if (check) alert("Minted successfully");
                else alert("Mint failed");
              }
          }}
          disabled={accounts.length === 0}
        >
          Mint token
        </button>
        {/*<button type="Button" onClick={()=>{*/}
        {/*    console.log(attributes);*/}
        {/*}}></button>*/}
      </form>
    </div>
  );
};
export default HomePage;
