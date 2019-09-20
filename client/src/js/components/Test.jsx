import React from 'react';
import AddCircleMembers from './AddCircleMembers';

const Test = () => {
  const [field, setField] = React.useState([]);
  return <AddCircleMembers field={field} setField={setField} />;
};

export default Test;
