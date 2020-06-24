import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";
import { uuid } from 'uuidv4'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    fetchRepositories()
  }, [])

  async function fetchRepositories() {
    await api.get('repositories').then( ( response ) => {

      const fetchedRepostories = response.data
      setRepositories( fetchedRepostories )

    })
  }

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: uuid(),
      title: 'Novo repositório',
      owner: "Rafael Costa"
    })

    const repository = response.data

    setRepositories([
      ...repositories,
      repository
    ])
  }

  async function handleRemoveRepository(id) {
    const newRepositories = [...repositories]
    const indexRepository = repositories.findIndex( repository => repository.id === id  )

    await api.delete( `repositories/${id}` ).then( () => {
      newRepositories.splice(indexRepository, 1)
      setRepositories(newRepositories)
    })

  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map( ({ id, title }) => (
          <li key={ id }>
            { title }

            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        )) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
