const Lcontract = require("../contracts/License_Contract.json");
const FractionalizeContract = require("../contracts/FractionalizeNFT.json");
const sharesContract = require("../contracts/FractionToken.json");
const abi = Lcontract.abi;
const fractionalizeAbi = FractionalizeContract.abi;
const address = "0x0E46befB7242aBADb99153dc1920e858BD326D85"
const fractionalizeAddress = "0x5C4E554CFaBa0e97c2F23a62266Dd886e1d5b514"

const getContract = (web3) => {
    return  new web3.eth.Contract(abi, address);
}
export const getFractionalizeContract = (web3) => {
    return  new web3.eth.Contract(fractionalizeAbi, fractionalizeAddress);
}
export const getSharesContract = (web3,address) => {
    return new web3.eth.Contract(sharesContract.abi, address);
}
export default getContract;