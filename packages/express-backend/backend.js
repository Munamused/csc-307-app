// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
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

const idGen = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let i = 0;
  while (i < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    i += 1;
  }
  return result;
}

const addUser = (user) => {
  users['users_list'].push(user);
  return user;
};

const delById = (id) => {
  const index = users["users_list"].findIndex(existingUser => existingUser.id === userId);
  if(index !== -1) {
    const deletedUser = users["users_list"].splice(index, 1)[0];
    return deletedUser;    
  } else {
    return null;
  }
};

app.delete("/users", (req, res) => {
  const id = req.body.id; 
  const result = deleteUserById(id);
  if (result === null) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});

app.post("/users", (req, res) => { // 201
  const userId = idGen(6);
  const userToAdd = {id: userId.toString(), name: req.body.name, job: req.body.job};
  addUser(userToAdd);
  res.status(201).json(userToAdd);
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
