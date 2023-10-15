import {Routes, Route}  from'react-router-dom'

import Home  from'./HomePage'
import Details from './DetailsPage'
import FractionedPage from './FractionedPage'
import Send from './sendingPage'
import SplitPage from "./SplitPage";
import MergePage from "./MergePage";
import SplitAttributes from "./SplitAttributesPage"
import {useContext} from "react";
import PinFileToIPFS from "./PinFileToIPFS";
import DataContext from "./context/DataContext";
import ChangePricePage from "./ChangePricePage";


const AppContent = ()=>{
    const {accounts} = useContext(DataContext);
    return(
        <div className="mainApp" style={{height:"100%", width:"100%"}}>
            <main style={{height:"100%", width:"100%"}}>
                {accounts.length === 0 ? <h1>Please connect to metamask</h1>:
                    <Routes>
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='/details' element={<Details/>}></Route>
                        <Route path='/pin' element={<PinFileToIPFS/>}></Route>
                        <Route path='/send/:id' element={<Send></Send>}></Route>
                        <Route path='/changePrice' element={<ChangePricePage/>}></Route>
                    </Routes>
                }
            </main>
        </div>
    )
}

export default AppContent