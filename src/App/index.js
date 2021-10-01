import React from 'react';
import { useEffect, useState, Fragment } from 'react';
import './App.css';

import { PlantFilter } from '../components/PlantFilter'
import { PlantList } from '../components/PlantList'
import { PlantItem } from '../components/PlantItem'

class Plant {
  constructor(rawPlantObject) {
    this.id = rawPlantObject.id;
    this.farmLe = rawPlantObject.config.farm.le;
    this.farmHours = rawPlantObject.config.farm.hours;
    this.img = rawPlantObject.iconUrl;
    this.type = rawPlantObject.config.stats.type;
    this.price = Math.ceil(rawPlantObject.endingPrice)
  }

  get leProduction() {
    return `${this.farmLe}sap/${this.farmHours/24}d`
  }

  get dailyLeProduction() {
    const days = this.farmHours/24
    const saplingsQty = this.farmLe/100
    return (saplingsQty/days/100).toFixed(3)
  }

  get plantsPerDay() {
    return `${this.farmLe/1000} every ${this.farmHours/24} days`
  }
}


function App() {
  const formatPlant = (plant) => {
    return new Plant(plant)
  }

  const sortPlantsByLeProduction = (plants) => {
    return plants.sort((a, b) => {
      return b.dailyLeProduction - a.dailyLeProduction
    })
  }

  const sortPlantsByPrice = (plants) => {
    return plants.sort((a, b) => {
      return a.price - b.price
    })
  }

  const sortPlantsByHarvestTime = (plants) => {
    return plants.sort((a, b) => {
      return a.farmHours - b.farmHours
    })
  }

  const [plants, setPlants] = useState([])
  const [motherPlants, setMotherPlants] = useState([])

  const [type, setType] = useState('')
  const [sortFactor, setSortFactor] = useState('production')
  const [maxPrice, setMaxPrice] = useState(35)

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    fetch(`https://backend-farm.plantvsundead.com/get-plants-filter-v2?offset=0&limit=10000`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNBZGRyZXNzIjoiMHgzYWIzNzJhZTcxYzY2NWFiZDQ0MDc0NGYwZjJlNmYzOTJkMWIyN2NjIiwibG9naW5UaW1lIjoxNjMyNjc4NjUyNzgzLCJjcmVhdGVEYXRlIjoiMjAyMS0wOS0yMSAwMToxODowOSIsImlhdCI6MTYzMjY3ODY1Mn0.Rr63n_28xjR6Uq5haFSQbPZ3N5U3LZWivDtq9IMm4PY'
      },
    })
      .then(resp => resp.json())
      .then(respJson => {
        console.log(respJson)
        const plants = respJson.data.map(plant => formatPlant(plant))
        setPlants(plants)
      })
    
    fetch(`https://backend-farm.plantvsundead.com/get-plants-filter-v2?offset=0&limit=1000`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNBZGRyZXNzIjoiMHgzYWIzNzJhZTcxYzY2NWFiZDQ0MDc0NGYwZjJlNmYzOTJkMWIyN2NjIiwibG9naW5UaW1lIjoxNjMyNjc4NjUyNzgzLCJjcmVhdGVEYXRlIjoiMjAyMS0wOS0yMSAwMToxODowOSIsImlhdCI6MTYzMjY3ODY1Mn0.Rr63n_28xjR6Uq5haFSQbPZ3N5U3LZWivDtq9IMm4PY'
      },
    })
      .then(resp => resp.json())
      .then(respJson => {
        console.log(respJson)
        const plants = respJson.data.map(plant => formatPlant(plant))
        setMotherPlants(plants)
      })
  }, [offset, type])

  // Filter possibilities

  const sortOptions = {
    production: sortPlantsByLeProduction,
    price: sortPlantsByPrice,
    harvest: sortPlantsByHarvestTime
  }

  // Filter process for regular plants

  const filteredPlantsByType = plants ? plants.filter((plant) => {
    if (!type) return plant

    return plant.type === type
  }) : []

  const filteredPlantsByPrice = filteredPlantsByType.length ? filteredPlantsByType.filter(plant => {
    return plant.price <= maxPrice
  }) : []

  const filteredPlants = !maxPrice ? filteredPlantsByType : filteredPlantsByPrice

  const plantsSortedByLeProduction = sortOptions[sortFactor](filteredPlants)

  const plantsByPage = [...plantsSortedByLeProduction].splice(offset, offset + 10)

  // Filter process for mother plants

  const filteredMotherPlantsByType = motherPlants ? motherPlants.filter((plant) => {
    if (!type) return plant

    return plant.type === type
  }) : []

  const filteredMotherPlantsByPrice = filteredMotherPlantsByType.length ? filteredMotherPlantsByType.filter(plant => {
    return plant.price <= maxPrice
  }) : []

  const filteredMotherPlants = !maxPrice ? filteredMotherPlantsByType : filteredMotherPlantsByPrice

  const motherPlantsSortedByLeProduction = sortOptions[sortFactor](filteredMotherPlants)

  const motherPlantsByPage = [...motherPlantsSortedByLeProduction].splice(offset, offset + 10)

  const goToPlantDescription = ( plantId ) => {
    window.location.assign(`https://marketplace.plantvsundead.com/farm#/plant/${plantId}`)
  }

  return (
    <Fragment>
      <PlantFilter
        type={type}
        maxPrice={maxPrice}
        sortFactor={sortFactor}
        setType={setType}
        setMaxPrice={setMaxPrice}
        setSortFactor={setSortFactor}
        plantsLength={ plants.length }
        onPageChange={ setOffset }
      />
      <PlantList>
        {plantsByPage.map(plant => (
          <PlantItem key={ plant.id } plant={ plant } onClick={goToPlantDescription} />
        ))}
      </PlantList>

      <PlantList>
        {motherPlantsByPage.map(plant => (
          <PlantItem key={ plant.id } plant={ plant } onClick={goToPlantDescription} />
        ))}
      </PlantList>
    </Fragment>
  );
}

export default App;
