import { useEffect, useState } from "react";
import { Mission } from "../types";
import { Link } from "react-router-dom";
 
function Home() {
  const [missions, setMissions] = useState<Mission[]>([])

  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/launches/past?limit=8")
      .then((res) => res.json())
      .then((data) => {
        setMissions(data);
      });
  }, []);

  return (
    <main>
      <h2 className="mission-select" style={{color: "white"}}>Select a mission</h2>
      <ul className='main-mission-list'>
        {missions.map((mission) => 
        <li className='main-mission-list-item'>
          <img className='mission-image' src={mission.links.mission_patch} width={150}/>
          <button className='mission-button'>{mission.mission_name} →</button>
        </li>
        )}
      </ul>
    </main>
  )
}

export default Home