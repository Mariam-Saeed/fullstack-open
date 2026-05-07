const Error = ({ error }) => {
  if (error === null) {
    return null;
  }
  return <p className="error"> {error} </p>;
};

export default Error;
