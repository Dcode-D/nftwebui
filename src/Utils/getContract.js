const contract = require("../contracts/ERC721_Example.json");
const abi = contract.abi;
const address = "0x9Ad5619C598581FA148D326E6F6355362F94a966"

const getContract = (web3) => {
    return  new web3.eth.Contract(abi, address);
}
export default getContract;