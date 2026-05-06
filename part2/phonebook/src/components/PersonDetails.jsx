const PersonDetails = ({ person, handleDelete }) => {
  return (
    <>
      <li key={person.id}>
        {person.name} {person.number}
      </li>
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </>
  );
};

export default PersonDetails;
