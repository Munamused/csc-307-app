// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap556",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id
);

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByJob = (job) => {
  return users["users_list"].filter(
    (user) => user["job"] === job
  );
};

const findUserbyNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const delById = (id) => {
  const isId = (user) => user["id"] === id;
  const idx = users["users_list"].findIndex(isId);
  return users["users_list"].splice(idx, 1);
};

app.delete('/users/:id', (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    delById(id);
    res.send("DELETE Request Called");
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});
  
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job != undefined){
    let result = findUserbyNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else if (job != undefined) {
    let result = findUserByJob(job);
    result = { users_list: result };
    res.send(result); 
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
