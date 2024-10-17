// src/MyApp.jsx
import React, { useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    // const updated = characters.filter((character, i) => {
    //   return i !== index;
    // });
    // setCharacters(updated);
    const person = characters[index]
    const updated = characters.filter((characters, i) => {return i !== index;});
        
    deleteUser(person)
    .then(()=>setCharacters(updated))
    .catch((error)=>{
      console.log(error)
    });
  }

  function deleteUser(person) {
    const promise = fetch(`http://localhost:8000/users/${person.id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
    .then((res)=>{
      if (res.status === 204)
        return res.json(person._id);
    })
    .catch((error)=>{
        console.log(error);
    });
    return promise;
  }

  function updateList(person) { 
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json()
        } else {
          throw new Error('Failed To Add User');
        }
      })
      .then((newPerson) => setCharacters([...characters, newPerson]))
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person)
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["user_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

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