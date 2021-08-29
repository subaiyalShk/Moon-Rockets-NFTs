import { useState } from 'react';
import { ethers } from 'ethers'

function WalletConnect() {
  // User account for the person we want to send our tokens to 
  const [userAccount, setUserAccount] = useState()
  // Amount we want to sent to a user

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function connect() {
    // First checks if we have an ethereum wallet (Metamask) attached to the browser
    if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setUserAccount(account)
        } else {
            console.log("switch network in metamask")
        }
    }
  

  return (
    <>
        {
            userAccount 
            ?
            <p className="text-white" >{userAccount}</p>
            :<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>connect()}>
                Connect Wallet
            </button>
        }
    </>
  );
}

export default WalletConnect;