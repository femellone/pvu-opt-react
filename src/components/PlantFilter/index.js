import './PlantFilter.css'

function PlantFilter({
    pagesQty,
    type,
    setType,
    maxPrice,
    maxDays,
    setMaxPrice,
    // offset,
    // setOffset,
    sortFactor,
    setSortFactor,
    setMaxDays,
}) {

    // const changeOffset = (newOffset) => {
    //     setOffset(newOffset)
    // }

    const changeType = (event) => {
        setType(event.target.value)
    }

    const changeMaxPrice = (event) => {
        setMaxPrice(event.target.value)
    }

    const changeSortFactor = (event) => {
        setSortFactor(event.target.value)
    }

    const changeMaxDays = (event) => {
        setMaxDays(event.target.value)
    }

    console.log(pagesQty)

    return (
        <div className="PlantFilter">
            <label>Tipo</label>
            <select onInput={changeType} value={type}>
                <option value="">Todos</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>

            <label>Ordenar por:</label>
            <select onInput={changeSortFactor} value={sortFactor}>
                <option value="production">Producción</option>
                <option value="price">Precio</option>
                <option value="harvest">Tiempo para harvest</option>
            </select>

            <br />
            <hr />

            <label>Precio máximo</label>
            <input type="number" onInput={changeMaxPrice} value={maxPrice} />

            <label>Días máximos</label>
            <input type="number" onInput={changeMaxDays} value={maxDays} />

            <br />
            <hr />
        </div>
    )
}

// <ol className="paginator">
//     {
//         Array(pagesQty).fill(0).map((_, index) => {
//             return <li key={'page' + index + 1}>
//                 <button className={offset === index + 1 ? 'page-selected': ''} onClick={changeOffset(index)}>{index + 1}</button>
//             </li>
//         })
//     }
// </ol>

export { PlantFilter };