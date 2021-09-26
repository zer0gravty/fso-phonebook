import React from "react";

const Phonebook = ({ filteredPeople, deletePerson }) => {
  return (
    <div>
      {filteredPeople.map((person) => {
        return (
          <li key={person.name}>
            {person.name} {person.number}
            <button type="button" onClick={() => deletePerson(person.id)}>
              delete
            </button>
          </li>
        );
      })}
    </div>
  );
};

export default Phonebook;
