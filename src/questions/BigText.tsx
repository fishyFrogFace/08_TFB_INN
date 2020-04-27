import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType } from '../Types';

interface Props {
    text: string;
    placeholder: string;
    maxPoints: number;
    resultTitle: string;
    updateResult: (result: QuestionResult) => void;
    processString: (input: string, maxPoints: number) => number;
}

const BigText: React.FC<Props> = props => {
    const [input, setInput] = useState('');

    return (
        <div>
            <h1 className='h1'>{props.text}</h1>
            <form
                className='textAndBtn'
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
                <input
                    id='name'
                    className={'bigText'}
                    type='text'
                    onChange={e => setInput(e.currentTarget.value)}
                />
                <Button
                    classNames='next'
                    onClick={() =>
                    props.updateResult({
                    mastered: true,
                    type: QuestionResultType.Mastery,
                    answerValues: [],
                    maxPoints: props.maxPoints,
                    resultTitle: props.resultTitle,
                    pointsAchieved: props.processString(input, props.maxPoints)
                    })
                }>
                Neste
                </Button>
            </form>
        </div>
    );
};

export default BigText;