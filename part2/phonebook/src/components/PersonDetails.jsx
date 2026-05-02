const PersonDetails = ({ person }) => {
  return (
    <li key={person.id}>
      {person.name} {person.number}
    </li>
  );
};

export default PersonDetails;
