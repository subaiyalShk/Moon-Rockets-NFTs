import { useState } from 'react';
import InstallMetaMask from './Installmetamask'
// import { ethers } from 'ethers'
function WalletConnect(props) {
  // User account for the person we want to send our tokens to 
    const [metmaskInstalled, setMetamaskInstalled] = useState(true)
    // Amount we want to sent to a user
        
    

    async function connect() {
        // First checks if we have an ethereum wallet (Metamask) attached to the browser
        if (typeof window.ethereum !== 'undefined') {
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            props.setWalletAddress(account)
        } else {
            setMetamaskInstalled(false)
        }
    }

    return (
        <>
            {
                props.walletAddress
                ?
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
                    {           "Connected: " +
                    String(props.walletAddress).substring(0, 6) +
                    "..." +
                    String(props.walletAddress).substring(38)}
                </button>
                :<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>connect()}>
                    Connect Wallet
                </button>
            }
            { metmaskInstalled?<></>:<InstallMetaMask setMetamaskInstalled={setMetamaskInstalled}/>}
        </>
    );
}

export default WalletConnect;