const Lcontract = require("../contracts/License_Contract.json");
const FractionalizeContract = require("../contracts/FractionalizeNFT.json");
const sharesContract = require("../contracts/FractionToken.json");
const abi = Lcontract.abi;
const fractionalizeAbi = FractionalizeContract.abi;
const address = "0x14A4E1f7E6E30209dAB68E70435fE8FDA4B43b6b"
const fractionalizeAddress = "0x72FB1b8934EbB28bB4403B9141Ed60086c4cE21d"

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