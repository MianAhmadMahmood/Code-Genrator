import React, { useState, useEffect, useCallback, useRef } from 'react';
import "tailwindcss/tailwind.css";
import './index.css'
const App = () => {
  const [length, setLength] = useState(5);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // use of ref hooks
  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!"£$%^&*(){}~:@;<>?,./*-+';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // Create copy to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 110);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 bg-red-700 text-red-400'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type='text' 
          placeholder='Password' 
          readOnly 
          className='outline-none w-full py-1 px-3' 
          value={password} 
          ref={passwordRef} 
        />
      </div>
      <button 
        className='outline-none bg-green-600 text-teal-50 px-3 py-0.5 shrink-0'
        onClick={copyPasswordToClipboard}
      >
        Copy
      </button>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
            type='range' 
            min={5} 
            max={40} 
            className='cursor-pointer' 
            value={length} 
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label htmlFor='length'>{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            type='checkbox' 
            id='NumberInput' 
            checked={numberAllowed} 
            onChange={() => setNumberAllowed(prev => !prev)} 
          />
          <label htmlFor='NumberInput'>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            type='checkbox' 
            id='CharacterInput' 
            checked={charAllowed} 
            onChange={() => setCharAllowed(prev => !prev)} 
          />
          <label htmlFor='CharacterInput'>Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;