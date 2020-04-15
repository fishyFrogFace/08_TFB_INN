import React, { useState } from 'react';
import '../App.css';
import './Pages.css';
import Button from '../components/Button';
import tempAvatar from './big-pink.png';
import { connect } from 'react-redux';
import { setUsername, setExamPage } from 'redux/actions';
import { ExamPage } from '../Types';

interface Props {
  avatar: string;
  setUsername: (username: string) => void;
  setExamPage: (page: ExamPage) => void;
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

const EnterName: React.FC<Props> = ({ avatar, setUsername, setExamPage }) => {
  // set a randomly generated name that will be kept if user doesn't type anything
  const [input, setInput] = useState(randomName(adjectives, animals));

  const submitUsername = (username) => {
    setUsername(username);
    setExamPage(ExamPage.OVERVIEW);
  }

  return (
    <div className='questionContainer'>
      <div className='imageContainer'>
        <img src={tempAvatar} alt='Avatar' />
      </div>
      <h1 className='h1'>Mitt navn er</h1>
      <form
        className='textAndBtn'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input
          id='name'
          className='inputField'
          type='text'
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const valueTyped = e.currentTarget.value;
            if (valueTyped.trim()) {
              setInput(e.currentTarget.value);
            } else {
              setInput(randomName(adjectives, animals));
            }
          }}
          placeholder='Navn'
        />
        <Button classNames='next' onClick={() => submitUsername(input)}>
          Neste
        </Button>
      </form>
      <p className='username'>{input}</p>
    </div>
  );
};

// Redux related:
const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (username: string) => dispatch(setUsername(username)),
    setExamPage: (page: ExamPage) => dispatch(setExamPage(page))
  };
}
const connector = connect(null, mapDispatchToProps);
export default connector(EnterName);