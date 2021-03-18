import React, { useState, useEffect } from 'react';
import setService from '../services/setService';

const Sets = () => {

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
        <div>
            {sets.map(set => (
            <div className="container">
                <div className="sets">
                    <div className="justify-content-between mt-3">
                        {set.nname}
                    </div>
                </div>
            </div>))}
        </div>
    )
}

export default Sets;