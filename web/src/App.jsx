import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [info, setInfo] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://www.reddit.com/r/pics.json');
      const resData = await res.json();
      setInfo(resData.data.children);
    }

    const main = async () => {
      await fetchData().catch(console.error);
    }

    main();

  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
