// backend.js
import express from "express";
import cors from "cors";
import user_services from "./user_services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

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

app.delete("/users/:id", (req, res) => {
  const id = req.params.id; 
  console.log("Deleting user with ID:", id); // Debugging line
  user_services.deleteUserById(id).then((result) => {
      res.status(204).send(result);
  })
  .catch((error) => {
    res.status(404).send("User Not Found")
  });
});

app.post("/users", async(req, res) => { // 201
  const userId = idGen(6);
  const userToAdd = {id: userId, name: req.body.name, job: req.body.job};
  user_services.addUser(userToAdd).then((result) => 
    res.status(201).send(result));
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});
  
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  user_services.getUsers(name, job)
  .then((result) => {
    if (result) {
      const users = {user_list: result}
      res.send(users)
    } else {
      res.send([]);
    }
  })
  .catch((error) => {
    res.status(404).send("Users Not Found")
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  user_services.findUserById(id)
      .then((result) => {
        if (result) {
          res.send(result);
        } else {
          res.status(404).send(`Not Found: ${id}`);
        }
      })
      .catch((error) => {
        res.status(500).send(error.name);
      });
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
