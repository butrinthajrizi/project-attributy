import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Mission } from "../types";

export type Comment = {
  id: number;
  content: string;
  missionId: number;
};

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
    <main className="main-details">
      <aside className="left-side">
        <h1
          style={{ color: "lightblue", fontSize: "2rem", fontWeight: "bold" }}
        >
          {mission?.mission_name}
        </h1>
        <img src={mission?.links.mission_patch} width="500px" />
        <h4 style={style.color}>
          <b style={style.indication}>Site Name: </b>
          {mission?.launch_site.site_name_long}
        </h4>
        <p style={style.color}>
          <b style={style.indication}>Rocket Name: </b>
          {mission?.rocket.rocket_name}
        </p>
        <p style={style.color}>
          <b style={style.indication}>Mission Details: </b>
          {mission?.details}
        </p>
      </aside>

      <aside className="right-side">
        <form
          className="comment-form"
          onSubmit={(e) => {
            e.preventDefault();
            fetch(`http://localhost:4000/comments`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: e.target.name.value,
                message: e.target.message.value,
                missionId: mission.flight_number,
              }),
            })
              .then((res) => res.json())
              .then(() =>
                fetch(`http://localhost:4000/comments/`)
                  .then((res) => res.json())
                  .then((data) => {
                    setComments(data);
                  })
              );
          }}
        >
          <h2>Comment Section</h2>
          <label>Name: <input type="text" name="name" placeholder="Your name..." required /></label>
          <label>Comment: <textarea
            name="message"
            placeholder="Leave your comment..."
            required
            rows={5}
          />
          </label>
          <button>Submit</button>
        </form>
        <div>
        {comments
              .filter((comment) => comment.missionId === mission.flight_number)
              .reverse()
              .map((comment) => (
                <div className="posted-comments" key={comment.id}>
                  <p>{comment.name}</p>
                  <p>{comment.message}</p>
                  <p
                    className="delete-button"
                    onClick={() => {
                      fetch(`http://localhost:4000/comments/${comment.id}`, {
                        method: "DELETE",
                      }).then(() => {
                        fetch(`http://localhost:4000/comments/`)
                          .then((res) => res.json())
                          .then((data) => {
                            setComments(data);
                          });
                      });
                    }}
                  >
                    ❌
                  </p>
                </div>
              ))}
        </div>
      </aside>
    </main>
  );
}

const style = {
  color: {
    color: "white",
  },
  indication: {
    color: "lightblue",
    fontSize: "1.1rem",
  },
};
