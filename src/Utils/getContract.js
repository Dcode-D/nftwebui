const Lcontract = require("../contracts/License_Contract.json");
const FractionalizeContract = require("../contracts/FractionalizeNFT.json");
const abi = Lcontract.abi;
const fractionalizeAbi = FractionalizeContract.abi;
const address = "0xB67B566B1b9AA2D612497b2b2debA137f405b386"
const fractionalizeAddress = "0x6bc194FBeb2569066E04A105226d747D9F4B6cF3"

const getContract = (web3) => {
    return  new web3.eth.Contract(abi, address);
}
export const getFractionalizeContract = (web3) => {
    return  new web3.eth.Contract(fractionalizeAbi, fractionalizeAddress);
}
export default getContract;