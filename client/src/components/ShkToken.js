
import { useState } from 'react';
import { ethers } from 'ethers'
import Token from '../artifacts/contracts/Token.sol/Token.json'
import SHKToken from '../artifacts/contracts/SHKToken.sol/SHKToken.json'

const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const SHKTokenAddress = "0x48d80938f6111d32342d7e69Eb8e5d97bf84eb51"

function ShkToken() {
  // User account for the person we want to send our tokens to 
  const [userAccount, setUserAccount] = useState()
  // Amount we want to sent to a user
  const [amount, setAmount] = useState(0)

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getBalance() {
    // First checks if we have an ethereum wallet (Metamask) attached to the browser
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork()
      console.log(chainId)
      if (chainId==3){
        const contract = new ethers.Contract(SHKTokenAddress, SHKToken.abi, provider) 
        const balance = await contract.balanceOf(account);
        console.log("Balance: ", balance.toString());
      }else{
        console.log("switch network in metamask")
      }
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      </header>
    </div>
  );
}

export default ShkToken;