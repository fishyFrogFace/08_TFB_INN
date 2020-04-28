import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import avatar from './big-pink.png';
import neste from './../icons/neste.png';

interface Props {
  avatar: string | undefined;
  getUsername: (username: string) => void;
}

interface Return {
  input: string;
}

const adjectives = [
  'helpful',
  'fresh',
  'fussy',
  'elastic',
  'happy',
  'daring',
  'digital',
  'active',
  'amused',
  'brave',
  'cool',
  'cute'
];

const animals = [
  'crocodile',
  'panda',
  'bird',
  'spider',
  'tiger',
  'cat',
  'rabbit',
  'butterfly'
];

const randomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const randomName = (list1: any[], list2: any[]) => {
  const adjective = list1[randomInt(list1.length)];
  const animal = list2[randomInt(list2.length)];
  return `${adjective}-${animal}`;
};

const UsernameInput: React.FC<Props> = props => {
  // set a randomly generated name that will be kept if user doesn't type anything
  const [input, setInput] = useState(randomName(adjectives, animals));
  // can be used if we want to make this return a result
  const [typed, setTyped] = useState(false);

  /*
  <div className='imageContainer'>
        <img src={avatar} alt='Avatar' />
      </div>*/
  
  return (
    <div>
      
      <h1 className='h1'>Hva heter du?</h1>
      <form
        className='textAndBtn'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input
          id='name'
          className='inputField'
          type='text'
          onKeyUp={(e: React.FormEvent<HTMLInputElement>) => {
            const valueTyped = e.currentTarget.value;
            if (valueTyped.trim()) {
              setTyped(true);
              setInput(e.currentTarget.value);
            } else {
              setTyped(false);
              setInput(randomName(adjectives, animals));
            }
          }}
          placeholder='Navn'
        />
        </form>
      <p className='username'>{input}</p>


        <div className='next-container' onClick={() => props.getUsername(input)}>
          <img src={neste} alt="Neste" ></img>
        </div>
        
      
    </div>
  );
};

export default UsernameInput;
