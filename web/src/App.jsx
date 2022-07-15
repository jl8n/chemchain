import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './App.scss';


function App() {
  const [info, setInfo] = useState([]);





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
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          <Link to="/login">login</Link> |{" "}
          <Link to="/expenses">Expenses</Link>
        </nav>
        <h3>Chemchain</h3>




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
