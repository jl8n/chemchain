import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.scss';

function App() {
  const [info, setInfo] = useState([]);
  const [account, setAccount] = useState(); // state variable to set account.
  const [error, setError] = useState([]);

  const connectWallet= async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum || 'http://localhost:7545');
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
      } catch {
        setError(error);
      }

    } else {
      // meta mask not installed
      console.log('Please install MetaMask');
    }
  }

  useEffect(() => {
    const load = async () => {


      /* web3.js */


      /* ganache */
      //const options = {};
      //const provider = ganache.provider(options);
      //const accounts = await provider.request({ method: "eth_accounts", params: [] });
  


    }

    const fetchData = async () => {
      const res = await fetch('https://www.reddit.com/r/pics.json');
      const resData = await res.json();
      setInfo(resData.data.children);
    }

    const main = async () => {
      await fetchData().catch(console.error);
      await load()
    }

    main();

  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Chemchain</h3>
          { account }

          <button onClick={connectWallet}>
            Connect Wallet
          </button>

          { info.map(d => (
            <li key={ d.data.thumbnail } style={{ listStyle: 'none' }}>
              <p>{ d.data.title }</p>
              <img src={ d.data.thumbnail } alt="" />
            </li>
          ))}

      </header>
    </div>
  );
}

export default App;
