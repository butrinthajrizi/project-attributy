import React, { useEffect, useState } from 'react'
import {Mission} from '../help/types'
import {getDate} from '../help/funcs'
 
function Home() {
  const [missions, setMissions] = useState<Mission[]>([])

  useEffect(() => {
    fetch('https://api.spacexdata.com/v3/launches/past?limit=10')
      .then((res) => res.json())
      .then((data) => {
        setMissions(data)
      })
  }, [])

  return (
    <main>
      <ul className='main-mission-list'>
        {missions.map((mission) => 
        <li className='main-mission-list-item'>
          <img className='mission-image' src={mission.links.mission_patch} width={150}/>
          <h5 className='mission-name'>{mission.mission_name.length !== 0 ? mission.mission_name : "Unknown mission name"}</h5>
          <p className='mission-description'><b>Description: </b>{mission.details === null ? <b className='no-description'>No description provided!</b> : mission.details}</p>
          <p className='mission-time'><b>Launch date: </b>{getDate(mission.launch_date_utc)}</p>
        </li>
        )}
      </ul>
    </main>
  )
}

export default Home