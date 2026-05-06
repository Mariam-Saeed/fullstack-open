import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personsService.getAll().then((data) => setPersons(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find(
      (person) => person.name === newName.trim(),
    );
    if (existingPerson) {
      // alert(`${newName} is already added to phonebook`);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number to a new one?`,
        )
      ) {
        personsService
          .updatePerson(existingPerson.id, {
            ...existingPerson,
            number: newNumber,
          })
          .then((data) => {
            setPersons(
              persons.map((person) => (person.id === data.id ? data : person)),
            );
            setNewName("");
            setNewNumber("");
          });
      }
      return;
    }
    const newNameObject = {
      name: newName.trim(),
      number: newNumber,
      id: String(persons.length + 1),
    };
    personsService.create(newNameObject).then((data) => {
      setPersons(persons.concat(data));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
        .deletePerson(id)
        .then((data) =>
          setPersons(persons.filter((person) => person.id !== data.id)),
        );
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
