import {Link} from "react-router-dom";
import {useContext} from "react";
import DataContext from "./context/DataContext";
import './NavBar.css'

const NavBar = ()=>{
    const {accounts,getMetamask} = useContext(DataContext);
    return(
        <nav className="Nav" >
            {accounts.length === 0 ? <button onClick={getMetamask}>Connect to metamask</button>:
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/details">Details</Link></li>
                    <li><Link to="/fraction">Fractioned</Link></li>
                </ul>
            }
        </nav>
    )
}

export default NavBar;