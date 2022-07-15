import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Web3 from 'web3';
import { ReactComponent as Logo } from 'assets/svg/mantaray.svg';
import './App.scss';


function App() {
  const [info, setInfo] = useState([]);
  const [wallet, setWallet] = useState('');
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

      <div class="row items-center gap-x-lg">
        <Logo className='logo-image'/>
        <h1>SeaRay</h1>
      </div>



      <button>{ wallet }</button>
    </header>
  
    <main>
      <section >
        <form className='column gap-y-md'>
          <div class="row">
            <div class="column">
              <label name="sendee">Firstname</label>
              <input type="text" />
            </div>
            <div class="column">
              <label name="sendee">Lastname</label>
              <input type="text" />
            </div>
          </div>

          <div class="row">
            <div class="column">
              <label name="sendee">Email</label>
              <input type="email" />
            </div>
            <div class="column">
              <label name="sendee">Phone</label>
              <input type="tel" />
            </div>
          </div>


          <label for="start">Start date:</label>
          <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" />


          <button type="submit">Submit</button>
        </form>
      </section>


    </main>

  </div>
  );
}

export default App;
