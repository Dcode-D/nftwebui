import {FaLaptop, FaMobile} from "react-icons/fa";
import {useContext} from "react";
import DataContext from "./context/DataContext";

const Header = (props)=>{
    const {width} = useContext(DataContext);
    return(
        <header className="head">
            <h1>{props.title}</h1>
            {
                width<500 ? <FaMobile></FaMobile>
                    : <FaLaptop></FaLaptop>
            }
        </header>
    )
}

Header.defaultProps = {title:"Default title"};

export  default  Header