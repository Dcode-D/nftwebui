import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "./context/DataContext";

const ChangePricePage = () => {
    const [price, setInputPrice] = useState(0);
    const {setPrice} = useContext(DataContext);
    const navigate = useNavigate();

    const handleSetPrice = async() => {
        const result = await setPrice(price);
        if(result) alert("Token price set successfully!");
        else alert("Token price change failed!");
        navigate("/")
    };

    const handleInput = (event) => {
        setInputPrice(event.target.value);
    };
    return (
        <div className="container my-5">
            <h2>Change mint price</h2>

            <div className="mt-5">
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">New price</label>
                    <input type="text" className="form-control" id="price" value={price} onChange={handleInput} />
                </div>
                <button className="btn btn-primary" onClick={handleSetPrice}>Change</button>
            </div>
        </div>
    );
};

export default ChangePricePage;
