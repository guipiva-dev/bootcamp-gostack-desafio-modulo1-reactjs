import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories',{
      title: `Novo Repositório ${Date.now()}`,
      url: "https://github.com/guipiva-dev/bootcamp-gostack-desafio-modulo1-nodejs",
      techs: ["tech1", "tech2"]
    });

    const repository = response.data;

    setRepositories([ ...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const index = repositories.findIndex(repository => repository.id === id);

    if(index >= 0) {
      setRepositories([...repositories.slice(0, index), ...repositories.slice(index + 1)]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => (
        <li key={repository.id}>{repository.title}
        <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
