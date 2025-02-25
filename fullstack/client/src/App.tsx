import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as api from './api';

function App() {
  const [requesting, setRequesting] = useState(false)

  const [url, setUrl] = useState('');
  const [shortOutput, setShortOutput] = useState('') 

  const [short, setShort] = useState('');
  const [longOutput, setLongOutput] = useState('') 

  async function long2shortClick() {
    setRequesting(true)
    const result = await api.long2short(url)
    setShortOutput(result.success ? result.data!.short! : result.message)
    setRequesting(false)
  }

  async function short2longClick() {
    setRequesting(true)
    const result = await api.short2long(short)
    setLongOutput(result.success ? result.data!.url : result.message)
    setRequesting(false)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-content">
        <h1>短链服务</h1>
        <div>
          <div className="input">
            <input value={url} onChange={e => setUrl(e.target.value)} /> 
            <button disabled={requesting} onClick={long2shortClick}>转为短链</button>
          </div>
          <div className="output">{shortOutput && "http://st.com/" + shortOutput}</div>
        </div>
        <br/><br/>
        <div>
          <div className="input">
            <input value={short} onChange={e => setShort(e.target.value)} /> 
            <button disabled={requesting} onClick={short2longClick}>还原长链</button>
          </div>
          <div className="output">{longOutput}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
