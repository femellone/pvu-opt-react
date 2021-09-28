import { Fragment } from 'react';

function PlantFilter({ type, setType, maxPrice, setMaxPrice, offset, setOffset, sortFactor, setSortFactor }) {

    const changeOffset = (newOffset) => {
        setOffset(newOffset)
    }

    const changeType = (event) => {
        setType(event.target.value)
    }

    const changeMaxPrice = (event) => {
        setMaxPrice(event.target.value)
    }

    const changeSortFactor = (event) => {
        setSortFactor(event.target.value)
    }

    return (
        <Fragment>
            <select onInput={changeType} value={type}>
                <option value="">All</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>

            <input type="number" onInput={changeMaxPrice} value={maxPrice} />
            <br/>
            <select onInput={changeSortFactor} value={sortFactor}>
                <option value="production">Production</option>
                <option value="price">Price</option>
                <option value="harvest">Harvest Time</option>
            </select>

            <button onClick={() => { changeOffset(0) }} disabled>Restart Offset</button>
        </Fragment>
    )
}

export { PlantFilter };

// production
// price
// harvest