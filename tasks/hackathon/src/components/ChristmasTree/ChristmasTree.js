import React from 'react';
import './style.css';

export default class ChristmasTree extends React.Component {
    render () {
        return (
            <div className='tree'>
                <div className="base" />
                <div className="layer" />
                <div className="layer two" />
                <div className="layer three" />
                <div className="layer four" />
            </div>
        )
    }
}