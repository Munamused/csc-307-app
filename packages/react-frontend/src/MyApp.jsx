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
    const updated = characters.filter((character, i) => {return i !== index;});
        
    deleteCharacter(person)
    .then(()=>setCharacters(updated))
    .catch((error)=>{
      console.log(error)
    });
  }

  function deleteCharacter(person) {
    const promise = fetch(`http://localhost:8000/users`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
    .then((res)=>{
      if (res.status === 202)
        return res.json(person.id)
      
    })
    .catch((error)=>{
        console.log(error);
    });
    return promise;
  }

  function updateList(person) { 
    postUser(person)
      .then((newPerson) => setCharacters([...characters, newPerson]))
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  async function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person)
    })
    .then((res)=>{
      if (res.status !== 201)
        throw new Error("Not 201, insertion not successful")
      else
        return res.json()
    })
    .catch((error)=>{
        console.log(error);
    });
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
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