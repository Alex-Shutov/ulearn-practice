import React from 'react';
import ChristmasTree from '../ChristmasTree/ChristmasTree';
import './style.css';

export default class App extends React.Component {
    render () {
        return (
            <div className='app'>
                <div className='tree-wrapper'>
                    <ChristmasTree />
                </div>
            </div>
        )
    }
}