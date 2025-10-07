// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";


function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {

    const target = characters[index];

    if(!target){
      return; 
    }

    const promise = fetch(`Http://localhost:8000/users/${target.id}`, {method: "DELETE"})

    .then((res) => {
      if(res.status === 404){
        throw new Error(`Delete failed (${res.status})`);
      }
      else if(res.status === 204){
        const updated = characters.filter((character, i) => {
        return i !== index;
        });
        setCharacters(updated);
      }
      else{
        throw new Error(`Delete failed (${res.status})`);
      }
    })
    .catch((error) => {
        console.log(error);
    })
  }

  function updateList(person) { 
    postUser(person)
    .then((res) => {
      if(res.status === 201){
        return res.json();
      }
      else{
        throw new Error("Couldn't add new user");
      }})
    .then((json) => setCharacters([...characters, json]))
    .catch((error) => {
        console.log(error);
    })
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
  );
}

export default MyApp;