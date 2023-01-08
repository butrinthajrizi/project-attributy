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
    <div>MissionDetails</div>
  )
}