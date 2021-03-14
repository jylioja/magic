import React, { useState, useEffect } from 'react';
import CardInfo from './CardInfo';
import Button from 'react-bootstrap/Button';


const Card = ({card}) => {

    const [showInfo, setShowInfo] = useState(false);
    
    return(
    <div>
        <div className="col card-content" onClick={() => setShowInfo(!showInfo)}>
            <img className="cardImg rounded " src={card.imageurl}></img>
        </div>
        {showInfo &&
            <div>
                <CardInfo card={card}/>
                <Button variant="danger" className="close-button my-5 mx-5"onClick={() => setShowInfo(!showInfo)}>Close</Button>
            </div>
        }
    </div>
    
    )
}

export default Card;