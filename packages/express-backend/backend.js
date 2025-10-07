// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

//modify this function
const addUser = (user) => {
  //Generates a random number
  const max = 1000000;
  let user_id = String(Math.floor(Math.random() * max));
  //Create a set to hold the user ids
  const user_ids = new Set(users.users_list.map(u => String(u.id)));
  //Iterate through the ids until a valid one is found
  while(user_ids.has(user_id)){
    user_id = String(Math.floor(Math.random() * max));
  }
  //Then assign the id to the user
  user.id = user_id;
  console.log("The newly added user is " + user.name + " and the id is " + user.id);
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).location(`/users/${userToAdd.id}`).json(userToAdd);
});

app.delete("/users/:id", (req, res) => {
  const userToDeleteId = req.params.id;
  const index = users.users_list.findIndex(u => String(u.id) === String(userToDeleteId));
  if(index === -1){
    return res.status(404).send("Resource not found");
  }
  users.users_list.splice(index, 1);
  return res.status(204).end();
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

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
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

