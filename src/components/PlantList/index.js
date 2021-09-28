import React from 'react';
import './PlantList.css'

function PlantList({children}) {
    return (
        <section>
            <ol className="PlantList">
                {children}
            </ol>
        </section>
    )
}

export { PlantList };