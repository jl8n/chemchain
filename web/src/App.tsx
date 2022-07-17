import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { ethers } from 'ethers';
import { ReactComponent as Logo } from 'assets/svg/mantaray.svg';
import Greeter from 'artifacts/contracts/Greeter.sol/Greeter.json'
import './App.scss';
declare var window: any;

const greeterAddr = '0xa513e6e4b8f2a923d98304ec87f64353c4d5c853';


function App() {
  const navigate = useNavigate();
  const logout = useCallback(() => navigate('/login', { replace: true }), [navigate]);

  const [account, setAccount] = useState('');
  const [wallet, setWallet] = useState('');
  const [greeting, setGreet] = useState('');


  // TODO: use Remux store instead of querying metamask each pageload
  const prettyWallet = wallet[0] ? wallet[0].slice(0, 5) + '...' + wallet[0].slice(-4) : 'Error';
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // TODO: move move to store & trigger when each protected route is requested
  async function handleAccount() {
    // we already have the account from logging in
    setAccount(await provider.send("eth_requestAccounts", []));
    return true;
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const contract = new ethers.Contract(greeterAddr, Greeter.abi, provider)
      try {
        const data = await contract.greet();
        console.log('data', data);
      } catch (err) {
        console.log('error communicating with contract', err);
      }
    }
  }

  async function setGreeting() {
    console.log('fire setGreeting');
    //if (!greeting) { return; }  TODO: add reactive greeting
    if (typeof window.ethereum !== 'undefined') {
      await handleAccount();
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddr, Greeter.abi, signer);
      const transaction = await contract.setGreeting('fuck');
      await transaction.wait();
      fetchGreeting();
    }
  }



  handleAccount();

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
      <div>{ greeterAddr }</div>
      <button onClick={ fetchGreeting }>Fetch greeting!</button>
      <button onClick={ setGreeting }>Set greeting!</button>
        <form className='column gap-y-md'>
          <div className="row gap-x-md">
            <div className="column">
              <label>Firstname</label>
              <input type="text" />
            </div>
            <div className="column">
              <label>Lastname</label>
              <input type="text" />
            </div>
          </div>

          <div className="row gap-x-md">
            <div className="column">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="column">
              <label>Phone</label>
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
