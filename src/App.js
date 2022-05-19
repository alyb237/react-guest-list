import './App.css';
import React, { useState } from 'react';

function App() {
  const [first, setFirst] = useState();
  const [last, setLast] = useState();

  return (
    <div>
      <label>
        First name
        <br />
        <input
          value={first}
          onChange={(event) => {
            setFirst(event.currentTarget.value);
            // console.log(first);
          }}
        />
      </label>
      <label>
        <br />
        Last name
        <br />
        <input
          value={last}
          onChange={(event) => {
            setLast(event.currentTarget.value);
            //console.log(last);
          }}
        />
      </label>
    </div>
  );
}

export default App;
