import React, { useState, useEffect } from 'react';
import setService from '../services/setService';

const Sets = ({setSelectedSet, selectedSet, setPage}) => {

    const [sets, setSets] = useState([]);

    const getSets = () => {
        setService.getSets()
        .then((items) => {
            setSets(items);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(getSets, []);

    return(
        <div className="container row">
            {sets.map(set => (
            <div onClick={() => {setSelectedSet(set.ncode); setPage(1)}} className="mt-3 set col text-center">
            <img className={selectedSet === set.ncode ? "set-img selected-set" : "set-img"} src={`https://bucket-of-magic.s3.eu-north-1.amazonaws.com/SETS/${set.ncode}.jpg`}></img>
                <p className="set-name">{set.nname}</p>
            </div>))}
        </div>
    )
}

export default Sets;