import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import Checkbox from './components/Checkbox';

function App() {
  // set state to default parameters
  const [password, setPassword] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const [handleText, setHandleText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChangesUppercase = () => {
    setPassword({
      ...password,
      uppercase: !password.uppercase,
    });
  };

  const handleChangesLowercase = () => {
    setPassword({
      ...password,
      lowercase: !password.lowercase,
    });
  };

  const handleChangesNumbers = () => {
    setPassword({
      ...password,
      numbers: !password.numbers,
    });
  };

  const handleChangesSymbols = () => {
    setHandleText({
      ...password,
      symbols: !password.symbols,
    });
  };

  const setPasswordLength = (val) => {
    setPassword({
      ...password,
      length: val,
    });
  };

  return (
    <div className='wrapper'>
      <div className='container wrapper-box'>
        <h2 className='generator-title'>Password Generator</h2>
        <div className='password-box'>
          <input type="text" value={handleText} onChange={(e) => setHandleText(e.target.value)} />
          <button className='copy-button' onClick={() => {
            if (handleText.length > 0) {
              navigator.clipboard.writeTest(handleText);
              setCopied(true);
              setInterval(() => {
                setCopied(false);
              }, 2000);
            }
          }} 
          >
            {copied ? 'Copied!' : 'Copy text' }
          </button>
        </div>
        <br />
        <div className='word-crieteria__box'>
          <div>
            <label>Password Length &nbsp;</label>
          </div>
          <div>
            <input type="number" value={handleText} onChange={(e) => setPasswordLength(e.target.value)} />
          </div>
        </div>
        <br />
        <div className='word-crieteria__box'>
          <div>
            <label>Include uppercase letters&nbsp;</label>
          </div>
          <div>
            <Checkbox 
              value={password.uppercase} 
              onChange={handleChangesUppercase} 
            />
          </div>
        </div>
        <br />
        <div className='word-crieteria__box'>
          <div>
            <label>Include lowercase letters&nbsp;</label>
          </div>
          <div>
            <Checkbox 
              value={password.lowercase}
              onChange={handleChangesLowercase}
            />
          </div>
        </div>
        <br />
        <div className='word-crieteria__box'>
          <div>
            <label>Include numbers&nbsp;</label>
          </div>
          <div>
            <Checkbox 
              value={password.numbers}
              onChange={handleChangesNumbers}
            />
          </div>
        </div>
        <br />
        <div className='word-crieteria__box'>
          <div>
            <label>Include symbols&nbsp;</label>
          </div>
          <div>
            <Checkbox 
              value={password.symbols}
              onChange={handleChangesSymbols}
            />
          </div>
        </div>
        <br />
        <div>
          <button className='generate-button'>Generate Password</button>
        </div>
      </div>
    </div>
  );
}

export default App;
