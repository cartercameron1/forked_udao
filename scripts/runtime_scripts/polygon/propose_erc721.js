/To use this function change the const member to the address you would like to mint to and run npx hardhat --network mumbai
//where mumbai is the network
//change hash to to the coresponding ipfs hash

const hre = require("hardhat");
async function main() {

    const member = '0x9BD68B5c8b557D4507C3F08b403Df144BDc2a93e'
    const hash = "bafybeifqwvtkt4roksibon7n4k27spw3namcug5favqw43wmbxun46wupe"
    
    
    const Gov = await ethers.getContractFactory('Governance');
    const gov = await Gov.attach('0xf1C35c09Dba5a676808034fd4bC13f62F533Eb55');


//tokenAddress is the erc721 contract ending in f0F
    const Mem = await ethers.getContractFactory('MembershipNFT');
    const mem = await Mem.attach('0xdf47FF91275776088EcA9F54A5528be7C3258EE9');

    const tokenAddress = '0xdf47FF91275776088EcA9F54A5528be7C3258EE9'



    // mem.interface.encodeFunctionData the first argument is a string of the name of the function on the contract the second is an array of the parameters
    const transferCalldata = mem.interface.encodeFunctionData('safeMint',[member])

    const transaction = await gov.propose(
        [tokenAddress],
        [0],
        [transferCalldata],
        hash,
    );
    let receipt = await transaction.wait();
    console.log(receipt.events[0].args);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
