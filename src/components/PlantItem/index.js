import React from 'react';
import './PlantItem.css'

function PlantItem({ plant, onClick }) {
    return (
        <li className="PlantItem" onClick={() => {onClick(plant.id)}}>
            <h3>{plant.title}</h3>
            <img src={plant.img} alt={`Plant ${plant.id}`} />
            <div className="description">
                <span>{plant.id}</span>
                <br/>
                <span>{plant.plantsPerDay}</span>
                <br/>
                <span>{plant.dailyLeProduction} sap/day</span>
                <br/>
                <span>{plant.type}</span>
                <br/>
                <strong>Price: {plant.price}</strong>
            </div>
        </li>
    )
}

export { PlantItem };