import React from 'react';

const list = (props) => {
  console.log('rendering the list...');

  return (
    <ul>
      {props.items.map((item) => (
        <li key={item.id} onClick={props.onClick.bind(this, item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default list;
