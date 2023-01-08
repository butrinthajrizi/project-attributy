import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Mission } from '../types';

export type Comment = {
  id: number,
  content: string,
  missionId: number
}

export default function MissionDetails() {
  const [mission, setMission] = useState<Mission | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const params = useParams();

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v3/launches/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setMission(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/comments/`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, []);


  return (
    <main className='main-details'>
      <aside className='left-side'>
          <h1>{mission?.mission_name}</h1>
          <img src={mission?.links.mission_patch} width="500px"/>
          <h4>{mission?.launch_site.site_name_long}</h4>
          <p>{mission?.rocket.rocket_name}</p>
          <p>{mission?.details}</p>
      </aside>
      <aside className='right-side'>

      </aside>
    </main>
  )
}