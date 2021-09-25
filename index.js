const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

morgan.token('post-body', (req) => Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : '');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'));

let data = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (req, res) => {
  res.json(data);
});

app.get('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const person = data.find((person) => person.id === id);
  person
    ? res.json(person)
    : res.status(404).json({ message: `Person not found with id of ${id}` });
});

app.post('/api/persons', (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).send({ error: 'Malformed body in request.' });
  }

  const personExists = data
    .map((person) => person.name)
    .includes(req.body.name);
  
  if (personExists) {
    return res.status(400).send({ error: 'Name must be unique' });
  }

  const newPerson = {
    name: req.body.name,
    number: req.body.number,
    id: Math.ceil(Math.random() * 10000),
  };

  data.push(newPerson);
  res.status(201).json(newPerson);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const person = data.find((person) => person.id === id);
  if (person) {
    data = data.filter((person) => person.id !== id);
    res.status(204).end();
  } else {
    res
      .status(400)
      .json({ message: `Unable to delete person with id of ${id}` });
  }
});

app.get('/info', (req, res) => {
  const date = new Date();
  res.send(`
    <h1>Phonebook as info for ${data.length} people<h1>
    <p>${date.toString()}</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
