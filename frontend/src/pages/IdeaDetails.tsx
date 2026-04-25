import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Idea } from "../utils/types";
import API from "../api/axios";
import './IdeaDetails.css';

export default function IdeaDetails() {
  const searchParams = useParams();
  const id = searchParams.id;
  const [ idea, setIdea ] = useState<Idea>();

  console.log(id);
  console.log(idea);

  useEffect(() => {
    async function fetchIdea() {
      const idea = await API.get(`/ideas/${id}`);
      
      setIdea(idea.data);
    }

    fetchIdea();

  }, [id]);
  return (
    <main className="idea-details-container">
      <h2 className="idea-title">{idea?.title}</h2>
      <p className="idea-description">
        {idea?.description}
      </p>
    </main>
  );
}