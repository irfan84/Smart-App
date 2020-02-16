import React from "react";
import Tilt from 'react-tilt';
import './Logo.css';
import Brain from './logo.png';

const Logo = () => {

    return (
        <div className={'ma4 mt0 pt0'}>
            <Tilt className="Tilt br1  shadow-2" options={{ max : 35 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3"><img src={Brain} alt={'Logo'} /> </div>
            </Tilt>
        </div>
    )

}

export default Logo;