const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.json());

// log server
morgan.token('post-body', (req) => Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : '');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'));

// serve static files from React build
app.use(express.static('build'));

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => res.json(people));
});

app.get('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  Person.findById(id).then(person => res.json(person));
});

app.post('/api/persons', (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).send({ error: 'Malformed body in request.' });
  }

  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  });

  newPerson.save().then(payload => res.status(201).json(payload));
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
