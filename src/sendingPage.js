import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "./context/DataContext";

const SendPage = () => {
  const [recipient, setRecipient] = useState("");
  const [balance, setBalance] = useState("");

  const [amount, setAmount] = useState(0);

  const [uri, setUri] = useState("");
  const { getTokenURI, sendToken, checkBalanceOf } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getBalance = async () => {
      const balance = await checkBalanceOf(id);
      setBalance(balance);
    };
    const geturi = async () => {
      const tmptd = await getTokenURI(id);
      setUri(tmptd);
    };
    geturi();
    getBalance();
  });

  const handleInput = (event) => {
    setRecipient(event.target.value);
  };

  const handleAmountInput = (event) => {
    setAmount(event.target.value);
  };

  const handleSend = async () => {
    const result = await sendToken(id, recipient, amount);
    if (result) alert("Token sent successfully!");
    else alert("Token sending failed!");
    navigate("/");
  };

  return (
    <div className="container my-5">
      <h2>Send Token #{id}</h2>
      <div className="tag container d-flex justify-content-center py-3">
        <div className="row align-items-center">
          <div className="col-12 col-sm-5 col-md-3">
            <img className="img-fluid" src={uri} alt={`Token with ID ${id}`} />
            <a href={uri} target="_blank" rel="noopener noreferrer">
              token uri
            </a>
          </div>
          <div className="col-12 col-sm-5 col-md-6">
            <h5 className="mb-3">Token ID: {id}</h5>
            <h5 className="mb-3">Balance: {balance}</h5>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="mb-3">
          <label htmlFor="recipient" className="form-label">
            Recipient Address
          </label>
          <input
            type="text"
            className="form-control"
            id="recipient"
            value={recipient}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="recipient" className="form-label">
            Amount
          </label>
          <input
            className="form-control"
            id="recipient"
            value={amount}
            onChange={handleAmountInput}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default SendPage;
