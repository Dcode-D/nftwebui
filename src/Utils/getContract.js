const Lcontract = require("../contracts/License_Contract.json");
const FractionalizeContract = require("../contracts/FractionalizeNFT.json");
const abi = Lcontract.abi;
const fractionalizeAbi = FractionalizeContract.abi;
const address = "0x00B1AdB9b57D4Afe81C13e7bc887DABDd498fc89"
const fractionalizeAddress = "0xEB0233994beA2efb1b621334e1199B900E2E24C9"

const getContract = (web3) => {
    return  new web3.eth.Contract(abi, address);
}
export const getFractionalizeContract = (web3) => {
    return  new web3.eth.Contract(fractionalizeAbi, fractionalizeAddress);
}
export default getContract;