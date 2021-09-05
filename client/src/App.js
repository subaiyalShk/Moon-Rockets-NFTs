import { useEffect, useState } from "react";
import './App.css';
import WalletConnect from './components/Walletconnect'
import NFTMinter from'./components/NFTMinter';

import {
  getCurrentWalletConnected,
} from "./utils/interact.js";

function App() {
  const [walletAddress, setWallet] = useState("");

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
          // setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      // setStatus(
      //   <p>
      //     {" "}
      //     🦊{" "}
      //     <a target="_blank" href={`https://metamask.io/download.html`}>
      //       You must install Metamask, a virtual Ethereum wallet, in your
      //       browser.
      //     </a>
      //   </p>
      // );
    }
  }

  

  return (
    <>
        <div>
          <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                      <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                      {/* <!-- Profile dropdown --> */}
                      <div className="ml-3 relative">
                        <div>
                            <WalletConnect walletAddress={walletAddress} setWalletAddress={setWallet}/>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">
                  {/* Dashboard */}
              </h1>
              </div>
          </header>
          <main>
              <NFTMinter/>
          </main>
      </div>
    </>
  );
}

export default App;