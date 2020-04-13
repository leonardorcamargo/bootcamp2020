import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';
import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    api.get('projects').then(res => setProjects(res.data))
  }, []);

  async function handleAddProject() {
    const res = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Leonardo Camargo'
    });

    const project = res.data;
    setProjects([
      ...projects,
      project
    ])
  }
  
  return (
    <>
      <Header title='Projects' />
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type='button' onClick={handleAddProject}>Novo projeto</button>
    </>
  );
}

export default App;
