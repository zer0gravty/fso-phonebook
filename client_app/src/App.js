import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Phonebook from "./components/Phonebook";
import Notification from "./components/Notification";
import phoneService from "./services/phonebookService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [id, setId] = useState(0);
  const [notification, setNotification] = useState({ message: null, type: '' })

  useEffect(() => {
    phoneService.getNumbers().then((currentNumbers) => {
      setPersons(currentNumbers);
      setId(currentNumbers.length);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const exists = persons.find((person) => person.name === newName);
    if (exists) {
      const update = window.confirm(
        `${exists.name} is already added to phonebook. Update person's number?`
      );
      if (update) {
        phoneService
          .updatePerson(exists.id, { ...exists, number: newNumber })
          .then((updatedPerson) => {
            setPersons(persons.filter(person => person !== exists).concat(updatedPerson));
            setNewName("");
            setNewNumber("");
            setNotification({ message: 'Person successfully updated.', type: 'success' });
            setTimeout(() => {
              setNotification({ message: null, type: '' });
            }, 3000);
          })
          .catch((err) => {
            console.error(`Error updating person.\n${err}`);
            setNotification({ message: 'Error updating person. Person not in database.', type: 'error' });
            setTimeout(() => {
              setNotification({ message: null, type: '' });
            }, 3000);
          });
      }
    } else {
      const newPerson = { id: id + 1, name: newName, number: newNumber };
      phoneService
        .addPerson(newPerson)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");
          setId(id + 1);
          setNotification({ message: 'Person successfully added.', type: 'success' });
          setTimeout(() => {
            setNotification({ message: null, type: '' });
          }, 3000);
        })
        .catch((err) => console.error(`Error adding person.\n${err}`));
    }
  };

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const shouldDelete = window.confirm(`Delete ${personToDelete.name}?`);
    if (shouldDelete) {
      phoneService.deletePerson(id).then((deletedPerson) => {
        const updatedPhonebook = persons.filter((person) => person.id !== id);
        setPersons(updatedPhonebook);
        setNotification({ message: 'Person successfully deleted.', type: 'success' });
        setTimeout(() => {
          setNotification({ message: null, type: '' });
        }, 3000);
      }).catch((err) => {
        console.log(`Error deleting person.\n${err}`);
        setPersons(persons.filter((person) => person.id !== personToDelete.id ));
        setNotification({ message: 'Person already removed from database. Refreshing list.', type: 'error' });
        setTimeout(() => {
          setNotification({ message: null, type: '' });
        }, 5000);
      });
    }
  };

  const filteredPeople =
    filterBy !== ""
      ? persons.filter((person) =>
          person.name.toLowerCase().startsWith(filterBy.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter
        filterBy={filterBy}
        handleFilter={(e) => setFilterBy(e.target.value)}
      />
      <h3>Add a new:</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewName={(e) => setNewName(e.target.value)}
        handleNewNumber={(e) => setNewNumber(e.target.value)}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Phonebook
        filteredPeople={filteredPeople}
        deletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
