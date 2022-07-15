import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './login.scss';



export default function Login() {
  /* reactive variables */
  const [account, setAccount] = useState(); // state variable to set account.
  const [error, setError] = useState([]);
  const [eth, setEth] = useState({});

  const ethereum = window.ethereum;
  //const [ethereum, setEthereum] = useState({});
  //setEthereum(window.ethereum);

  //console.log(ethereum);


  const getWallet = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum || 'http://localhost:7545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      await console.log('account', account);

    } catch {
      setError('lol');
    }
  }

  const handleAccountChange = () => {
    console.log('accounts change');
  }
  
  useEffect(() => {
       const checkConnection = async () => {
        console.log('checking accounts');

        // Check if browser is running Metamask
        let web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        } else { return; }

        // Check if User is already connected by retrieving the accounts
        web3.eth.getAccounts().then(async (addr) => {
          const accounts = await web3.eth.requestAccounts();
          setAccount(accounts[0])
        });
       };
       checkConnection();

      

  });

  

  return (
    <div className='page grid'>
    <header>
      <div className='logo'>web3 fucking sucks</div>
      <button className="wallet">{ account }</button>
    </header>
  
    <main>

      <div className="column center">
        <h1 className='title'>Login</h1>
        <div className="column center">{ ethereum &&
          <div>
            <button className="btn-main btn-wallet" onClick={ getWallet }>Connect wallet</button>
            <button className="btn-main btn-about">Send me crypto</button> 
          </div>
        }
        </div>
        <div>
          { !ethereum &&
          <div className='column center'>
            <p>You have to install a <a href="https://metamask.io/download/">dumbass crypto wallet browser extension</a> to use every web3 app, including this one.</p>
            <div className="italic">But crypto will totally be built into browsers in the future.</div>
          </div>
          }
        </div>
      </div>
    </main>
    <div className="scrollContent">
      test
    </div>







  </div>



  );
}
