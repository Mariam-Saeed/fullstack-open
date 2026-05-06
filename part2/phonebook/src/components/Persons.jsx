import PersonDetails from "./PersonDetails";

const Persons = ({ persons, handleDelete }) => {
  return persons.map((person) => (
    <PersonDetails
      key={person.id}
      person={person}
      handleDelete={handleDelete}
    />
  ));
};

export default Persons;
