import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import type { Idea } from "../utils/types";
import './Ideas.css';

export default function Ideas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const navigate = useNavigate();


  async function fetchIdeas() {
    const res = await API.get('/ideas');
    setIdeas(res.data);
  };

  async function createIdea() {
    if (title && description) {
      await API.post('/ideas', { title, description });
      
      setTitle('');
      setDescription('');
      
      fetchIdeas();
    }
  }

  useEffect(() => {
    fetchIdeas();
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  async function deleteIdea(id: string) {
    await API.delete(`/ideas/${id}`);
    setIdeas(prevIdeas => prevIdeas.filter(idea => idea._id !== id));
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) navigate('/');
  });

  return (
    <main className="ideas-container">
      <form className="create-idea-form" onSubmit={e => {
        e.preventDefault();
        createIdea();
      }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Idea</button>

      </form>
      <ul className="ideas-list">
        {
          ideas.map((idea) => (
            <li key={idea._id} className="idea-container">
              <Link className="idea" to={`/ideas/${idea._id}`}>{idea.title}</Link>
              <div className="btns">
                <button type="button" onClick={() => navigate(`/ideas/${idea._id}`)}>Edit</button>
                <button type="button" onClick={() => deleteIdea(idea._id)}>Delete</button>
              </div>
            </li>
          ))
        }
      </ul>

      <button className="logout-btn" type="button" onClick={handleLogout}>Log out</button>
    </main>
  );
}