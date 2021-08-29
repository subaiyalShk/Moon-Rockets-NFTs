import './App.css';
import WalletConnect from './components/Walletconnect'

function App() {
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  return (
    <>
        <div>
          <nav class="bg-gray-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                      <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
                  </div>
                </div>
                <div class="hidden md:block">
                  <div class="ml-4 flex items-center md:ml-6">
                      {/* <!-- Profile dropdown --> */}
                      <div class="ml-3 relative">
                        <div>
                            <WalletConnect/>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <header class="bg-white shadow">
              <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 class="text-3xl font-bold text-gray-900">
                  {/* Dashboard */}
              </h1>
              </div>
          </header>
          <main>
              <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

              <div class="px-4 py-6 sm:px-0">
                  <div class="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
              </div>
          
              </div>
          </main>
      </div>
    </>
  );
}

export default App;