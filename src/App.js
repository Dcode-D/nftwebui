import './App.css';
import {DataProvider} from "./context/DataContext";
import NavBar from"./NavBar";
import Content  from"./Content";
import Header  from"./Header";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title="Crypto app"></Header>
        <NavBar></NavBar>
        <Content></Content>
      </DataProvider>
    </div>
  );
}

export default App;
