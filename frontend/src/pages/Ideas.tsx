import { useEffect, useState } from "react";
import API from "../api/axios";


type Idea = {
  _id: string;
  title: string;
  description: string;
}

export default function Ideas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function fetchIdeas() {
    const res = await API.get('/ideas');
    setIdeas(res.data);
  };

  async function createIdea() {
    await API.post('/ideas', { title, description });

    fetchIdeas();
  }

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div>
      <h2>Ideas</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="button" onClick={createIdea}>Add Idea</button>

      <ul>
        {
          ideas.map((idea) => (
            <li key={idea._id}>{idea.title}</li>
          ))
        }
      </ul>
    </div>
  );
}