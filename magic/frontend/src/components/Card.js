import React, { useState, useEffect } from 'react';
import CardInfo from './CardInfo';
import Button from 'react-bootstrap/Button';


const Card = ({card, showCardsFrom}) => {

    const [showInfo, setShowInfo] = useState(false);
    
    return(
    <div>
        <div className="col card-content" onClick={() => setShowInfo(!showInfo)}>
            <img className="cardImg rounded" src={card.imageurl} onError={(e) =>{e.target.onerror = null; e.target.src = "https://bucket-of-magic.s3.eu-north-1.amazonaws.com/other/Image-not-found.png"} }></img>
        </div>
        {showInfo &&
            <div>
                <CardInfo card={card} showCardsFrom={showCardsFrom}/>
                <Button variant="danger" className="close-button my-5 mx-5"onClick={() => setShowInfo(!showInfo)}>Close</Button>
            </div>
        }
    </div>
    
    )
}

export default Card;