const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = new express();

app.use(express.json());
app.use(cors());

const projects = [];

function validateId(req, res, next) {
  const { id } = req.params;
  if (!isUuid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  next();
}

function logRequests(req, res, next) {
  const { method, url } = req;
  const msg = `[${method.toUpperCase()}] ${url}`;
  console.time(msg);
  next();
  console.timeEnd(msg);
}

app.use(logRequests);
app.use('/projects/:id', validateId);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.get('/projects', (req, res) => {
  const { title, owner } = req.query;

  const result =
    title || owner
      ? projects.filter((project) => project.title.includes(title) || project.owner.includes(owner))
      : projects;
  return res.json(result);
});

app.post('/projects', (req, res) => {
  const { title, owner } = req.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return res.json(project);
});

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex((project) => project.id === id);

  if (index < 0) {
    return res.status(404).json({ error: 'Project not found' });
  }

  projects[index] = {
    ...projects[index],
    ...req.body
  };

  return res.json(projects[index]);
});

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex((project) => project.id === id);

  if (index < 0) {
    return res.status(404).json({ error: 'Project not found' });
  }

  projects.splice(index, 1);
  return res.send();
});

app.listen(process.env.PORT || 3333, () => {
  console.log('♌ Back-end runing');
});
