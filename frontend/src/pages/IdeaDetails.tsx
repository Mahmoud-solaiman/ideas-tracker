import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Idea } from "../utils/types";
import API from "../api/axios";
import './IdeaDetails.css';

export default function IdeaDetails() {
  const searchParams = useParams();
  const id = searchParams.id;
  const [ idea, setIdea ] = useState<Idea>();
  const [ title, setTitle ] = useState<string>('');
  const [ description, setDescription ] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchIdea() {
      const ideaRes = await API.get(`/ideas/${id}`);
      
      setIdea(ideaRes.data);
    }

    fetchIdea();

  }, [id, idea]);

  function handleUpdate() {
    if (title && description) {
      API.put(`/ideas/${idea?._id}`, {
        title,
        description
      });

      navigate('/ideas');
    }
  }
  return (
    <main className="idea-details-container">
      <form onSubmit={e => {
        e.preventDefault();
        handleUpdate();
      }}>
        <input 
          value={title}
          name="title" 
          type="text" 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Update title" 
        />
        <textarea 
          value={description}
          name="description" 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Update description" 
        ></textarea>
        <button type="submit">Update</button>
      </form>
    </main>
  );
}