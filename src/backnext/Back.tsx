import React from 'react';
import '../App.css';
import { Page } from '../App'

interface Props {
    changePage: (page: Page) => void
}

const Back: React.FC<Props> = props => {
    return (
        <div className='backnext'>
            <button className='btn' onClick={() => props.changePage(Page.Next)}>
                Back
            </button>
            <button className='btn' onClick={() => props.changePage(Page.Back)}>
                Next
            </button>
        </div>
    );
}

export default Back;