import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from "react-router-dom";
//import Web3 from 'web3';
import { ethers } from 'ethers';
import { ReactComponent as Logo } from 'assets/svg/mantaray.svg';
import './App.scss';


function App() {
  const navigate = useNavigate();
  const logout = useCallback(() => navigate('/login', { replace: true }), [navigate]);
  const provider = new ethers.providers.Web3Provider(window.ethereum || 'http://localhost:7545')
  const [info, setInfo] = useState([]);
  const [wallet, setWallet] = useState('');

  // TODO: use Remux store instead of querying metamask each pageload
  const prettyWallet = wallet[0] ? wallet[0].slice(0, 5) + '...' + wallet[0].slice(-4) : 'Error';

  const handleWallet = async () => {
    setWallet(await provider.send("eth_requestAccounts", []));

    const blockNum = await provider.getBlockNumber();
    const balance = ethers.utils.formatEther(await provider.getBalance('ethers.eth'));
  }
  handleWallet();

  return (
  <div className='page grid'>
    <header className="justify-between" >

      <div className="row items-center gap-x-lg">
        <Logo className='logo-image'/>
        <h1>SeaRay</h1>
      </div>

      <div className="dropdown">
        <button className="userDropdown">
          <div className="one">{ prettyWallet }</div>
        </button>
        <div className="dropdown-content">
          <button onClick={ logout }>Logout</button>
        </div>
      </div>
    </header>
  
    <main>
      <section>
        <form className='column gap-y-md'>
          <div className="row gap-x-md">
            <div className="column">
              <label name="sendee">Firstname</label>
              <input type="text" />
            </div>
            <div className="column">
              <label name="sendee">Lastname</label>
              <input type="text" />
            </div>
          </div>

          <div className="row gap-x-md">
            <div className="column">
              <label name="sendee">Email</label>
              <input type="email" />
            </div>
            <div className="column">
              <label name="sendee">Phone</label>
              <input type="tel" />
            </div>
          </div>


          <label htmlFor="start">Start date:</label>
          <input type="date" id="start" name="trip-start" defaultValue="2018-07-22" min="2018-01-01" max="2018-12-31" />


          <button type="submit">Submit</button>
        </form>
      </section>


    </main>

  </div>
  );
}

export default App;
