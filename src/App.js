import { useState } from 'react';
import { Button, Card, Col, Container, InputGroup, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
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
    setPassword({
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

  function generatePassword() {
    const numbersArray = [0,1,2,3,4,5,6,7,8,9];
    const symbolsArray = ["!","@","#","$","%","^","&","*"];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map(letter => String.fromCharCode(letter));
    const upperCaseLetters = lowerCaseLetters.map(letter => letter.toUpperCase());

    const { length, uppercase, lowercase, numbers, symbols } = password; // store information

    const generateTheWord = (length, uppercase, lowercase, numbers, symbols) => {
      const availableCharacters = [
        ...(uppercase ? upperCaseLetters : []),
        ...(lowercase ? lowerCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(()=> Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setHandleText(characters.join(''));
      return characters;
    }
    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }

  return (
    <Container className='password-card-container' fluid>
      <Card className='password-card'>
        <Card.Header>
          <div>
            <Button className="float-end" onClick={() => window.location.reload(false)} variant="outline-info">Clear Form</Button>{' '}
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>Password Generator</Card.Title>
          <InputGroup className="mb-3">
          <Form.Control
            value={handleText} onChange={(e) => setHandleText(e.target.value)}
            aria-label="copy-text-input-box"
          />
          <InputGroup.Text className="bg-primary">
            <Button
              className='p-0 m-0'
              onClick={() => {
                if (handleText.length > 0) {
                  navigator.clipboard.writeText(handleText);
                  setCopied(true);
                  setInterval(() => {
                    setCopied(false);
                  }, 2000);
                }
              }} 
            >{copied ? 'Copied!' : 'Copy text' }</Button>
          </InputGroup.Text>
        </InputGroup>
        <Form>
          <Form.Label htmlFor="basic-url">Password Length</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              value={password.length} 
              onChange={(e) => setPasswordLength(e.target.value)}
              aria-label="Password Length"
              aria-describedby="basic-input-length"
              type='number'
            />
          </InputGroup>

          <Form.Group className="mb-3" controlId="uppercase">
            <Form.Check 
              type="checkbox"
              label="Include Uppercase Letters"
              value={password.uppercase} 
              onChange={handleChangesUppercase}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lowercase">
            <Form.Check 
              type="checkbox"
              label="Include Lowercase Letters"
              value={password.lowercase}
              onChange={handleChangesLowercase}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="numbers">
            <Form.Check 
              type="checkbox" 
              label="Include Numbers"
              value={password.numbers}
              onChange={handleChangesNumbers}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="symbol">
            <Form.Check 
              type="checkbox" 
              label="Include Symbols"
              value={password.symbols}
              onChange={handleChangesSymbols}
            />
          </Form.Group>
          <div className="text-center">
            <Button 
              variant="primary"
              onClick={generatePassword}
            >
              Generate Password
            </Button>
          </div>
        </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
