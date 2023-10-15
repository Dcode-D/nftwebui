const contract = require("../contracts/ERC1155_Example.json");
const abi = contract.abi;
const address = "0x5d411087Ea84DfC31Bc8c6E424b3C98C635b966B";

const getContract = (web3) => {
    return  new web3.eth.Contract(abi, address);
}
export default getContract;