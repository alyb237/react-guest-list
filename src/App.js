import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [guest, setGuest] = useState([]);
  const [isAttending, setIsAttending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = 'http://localhost:4000';

  // Creates array and fetches data
  useEffect(() => {
    // console.log('trigger on first render');

    const fetchGuests = async () => {
      const response = await fetch(`${baseUrl}/guests`);

      if (!response.ok) {
        throw new Error('Data could not be fetched!');
      } else {
        const guestsData = await response.json();
        console.log(guestsData);
        setGuest(guestsData);
        setIsLoading(false);
      }
      fetchGuests().catch(() => {
        console.log('fetch fails');
      });
    };
  }, []);

  // POST function - Add user - send data to server
  async function createUser(firstName, lastName) {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();
    console.log(createdGuest);
    setFirst('');
    setLast('');
    setGuest((add) => [...add, createdGuest]);
    setIsAttending(true);
    // console.log(guest);
  }

  async function deleteGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deleteAGuest = await response.json();
    console.log(deleteAGuest);
    setIsAttending(!isAttending);
    setGuest(() => guest.filter((guests) => guests.id !== id));
    console.log(setGuest);
  }

  return (
    <div data-test-id="guest">
      <label>
        First name
        <br />
        <input
          value={first}
          onChange={(event) => {
            setFirst(event.currentTarget.value);
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
          }}
          onKeyPress={(event) => {
            setLast(event.currentTarget.value);
            if (event.key === 'enter') {
              createUser(first, last).catch(() => {
                console.log('fetch fails');
              });
            }
          }}
        />
      </label>
      <br />
      <button
        onClick={() => {
          createUser(first, last).catch(() => {
            console.error('fetch fails');
          });
        }}
      >
        Add guest
      </button>
      <div data-test-id="guest">
        <ul>
          {guest.map((guests) => {
            return (
              <div key={guests.id}>
                <li>
                  {guests.firstName} {guests.lastName}
                  <input
                    type="checkbox"
                    checked={guests.isAttending}
                    onChange={(event) => {
                      setIsAttending(event.currentTarget.checked);
                    }}
                  />{' '}
                  {isAttending ? '😺' : '⛔'}
                  <button onClick={() => deleteGuest(guests.id)}>
                    Remove guest
                  </button>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
