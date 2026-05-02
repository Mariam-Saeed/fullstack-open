import PersonDetails from "./PersonDetails";

const Persons = ({ persons }) => {
  return persons.map((person) => (
    <PersonDetails key={person.id} person={person} />
  ));
};

export default Persons;
