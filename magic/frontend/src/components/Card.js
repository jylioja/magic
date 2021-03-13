import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'


const Card = ({card}) => {

    const [showInfo, setShowInfo] = useState(false);
    
    return(
    <div className="col card-content" onClick={() => setShowInfo(!showInfo)}>
        <img className="cardImg rounded " src={card.imageurl}></img>
        {showInfo &&
            <div className="card-info">
                <div className="info-text justify-content-center text-center container">
                    <p>Name: {card.nname}</p>
                    <p>Set: {card.nset}</p>
                    <p>Type: {card.ntype}</p>
                    <p>Abilty: {card.nability}</p>
                    <div>
                        <Button className="m-1">Add to collection</Button>
                        <Button className="m-1">Add to deck</Button>
                    </div>
                </div>
            </div>
        }

    </div>

         
    )
}

export default Card;