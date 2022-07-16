import React, { useState, useEffect, useRef, useCallback } from 'react';
import {useNavigate} from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/svg/mantaray.svg';
import Web3 from 'web3';
import 'assets/css/layout.scss';
import './Login.scss';



export default function Login() {
  const navigate = useNavigate();
  const login = useCallback(() => navigate('/', {replace: true}), [navigate]);

  /* reactive variables */
  
  const [account, setAccount] = useState(); // state variable to set account.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const ref = useRef(null);
  const ethereum = window.ethereum;



  const getWallet = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum || 'http://localhost:7545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      login();
    } catch {
      console.log('error getting wallet from user');
    }
  }

  const clickHowitWorks = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
       const checkConnection = async () => {
        console.log('checking accounts');

        // check if browser is running MetaMask
        let web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        } else { return; }

        // check if MetaMask account is already connected
        setIsLoggedIn((await web3.eth.getAccounts()).length > 0);

        if (isLoggedIn) {
          web3.eth.getAccounts().then(async (addr) => {
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0])
        });
        }

       // if (web3.eth.getAccounts())

        // Check if User is already connected by retrieving the accounts

       };
       checkConnection();

      

  });

  

  return (
  <div className='page grid'>
    <header className="justify-between" >
      <div className='logo row items-center gap-x-lg'>
        <Logo className='logo-image'/>
        <h1>SeaRay</h1>
      </div>
    </header>
  
    <main>
      <section className='first-section column center'>

        <h2>Time-released private files</h2>
        <div className='separator' />
        <h3>Store and release secure files to anyone at any time, even after you're gone.</h3>

        <div>
        { ethereum &&
          <div>
            <div className='row gap-x-sm'>
              <button className='btn-main btn-wallet' onClick={ getWallet }>Login</button>
              <button className='btn-main btn-about' onClick={ clickHowitWorks }>How it works</button>  
            </div>
          </div>
        }
        </div>

        <div>
          { !ethereum &&
          <div className='column center'>
            <p>This is a <a href='https://www.nytimes.com/interactive/2022/03/18/technology/web3-definition-internet.html'>Web3</a> application, and you need to install a <a href='https://metamask.io/download/' target="_blank" rel="noreferrer">dumbass crypto wallet browser extension</a> in order to login.</p>
          </div>
          }
        </div>

      </section>

      <section className='second-section' ref={ref}>
        test
      </section>
    </main>

  </div>
  );
}
