import {Routes, Route}  from'react-router-dom'

import Home  from'./HomePage'
import Details from './DetailsPage'
import Transfer from './TransferPage'
import Send from './sendingPage'
import SplitPage from "./SplitPage";
import MergePage from "./MergePage";
import SplitAttributes from "./SplitAttributesPage";
import MergeAttrPage from "./MergeAttributes";
import {useContext} from "react";
import DataContext from "./context/DataContext";


const AppContent = ()=>{
    const {accounts} = useContext(DataContext);
    return(
        <div className="mainApp" style={{height:"100%", width:"100%"}}>
            <main style={{height:"100%", width:"100%"}}>
                {accounts.length === 0 ? <h1>Please connect to metamask</h1>:
                    <Routes>
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='/details' element={<Details/>}></Route>
                        <Route path='/transfer' element={<Transfer/>}></Route>
                        <Route path='/send/:id' element={<Send></Send>}></Route>
                        <Route path='/split/:id' element={<SplitPage/>}></Route>
                        <Route path='/merge/:id' element={<MergePage/>}></Route>
                        <Route path='/splattributes/:id' element={<SplitAttributes/>}></Route>
                        <Route path='/mergeattributes/:id' element={<MergeAttrPage/>}></Route>
                    </Routes>
                }
            </main>
        </div>
    )
}

export default AppContent