const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.json());

// log server
morgan.token('post-body', (req) => Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : '');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'));

// error handler function; last middleware to load towards end of this file
const errorHandler = (err, _req, res, next) => {
  console.log(`Error: ${err}`);

  if (err.name === 'CastError') {
    res.status(400).json({ error: 'malformed id' });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ error: `${err}` })
  }

  next(err);
};

// serve static files from React build
app.use(express.static('build'));

app.get('/api/persons', (_req, res, next) => {
  Person.find({}).then(people => res.json(people)).catch(err => next(err));
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => person ? res.json(person) : res.status(404).end())
    .catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  });

  newPerson.save().then(payload => res.status(201).json(payload)).catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(_result => res.status(204).end())
    .catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  }
  
  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => res.status(201).json(updatedPerson))
    .catch(err => next(err));
});

app.get('/info', async (_req, res, next) => {
  const date = new Date();
  try {
    const payload = await Person.find({});
    const numOfPeople = await payload?.length || 0;
    res.send(`
      <h1>Phonebook has info for ${numOfPeople} people<h1>
      <p>${date.toString()}</p>
    `);
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
