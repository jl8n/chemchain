import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Web3 from 'web3';
import { ReactComponent as Logo } from 'assets/svg/mantaray.svg';
import './App.scss';


function App() {
  const navigate = useNavigate();
  const logout = useCallback(() => navigate('/login', { replace: true }), [navigate]);
  const [info, setInfo] = useState([]);
  const [wallet, setWallet] = useState('');


  let prettyWallet = ''
  if (wallet[0]) {
    console.log('wallett????', wallet[0], typeof wallet[0], wallet[0].slice(2));
    prettyWallet = wallet[0].slice(0, 5) + '...' + wallet[0].slice(-4);
  }

  useEffect(() => {
    const handleWallet = async () => {
      let web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        } else { return; }
      setWallet(await web3.eth.getAccounts());
    }

    handleWallet()

  }, []);
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
      <section >
        <form className='column gap-y-md'>
          <div className="row">
            <div className="column">
              <label name="sendee">Firstname</label>
              <input type="text" />
            </div>
            <div className="column">
              <label name="sendee">Lastname</label>
              <input type="text" />
            </div>
          </div>

          <div className="row">
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
