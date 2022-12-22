import express, { Request, Response} from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Users } from "./entity/Users";
import jwt from "jsonwebtoken";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source Initialized");
  })
  .catch((err) => {
    console.log("Error during Data source initialization", err);
  });

const app = express();
app.use(express.json());

//Get list of all users
app.get("/users", async (req: Request, res: Response) => {
  const users = await AppDataSource.getRepository(Users).find();
  res.json(users);
});

//Register a user in DB
app.post("/auth/register", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  if (!username || !password || !name) {
    return res.send('Please fill complete details');
  } const users = AppDataSource.getRepository(Users);
  const userExists = await users.findOneBy({username: username});
  if (userExists) {
    return res.send('The user already exists');
  } else {
    const user = users.create(req.body);
    const result = await users.save(user);
    return res.send('User registered');
  }
});

//Login to the database
app.post("/auth/login", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const users = AppDataSource.getRepository(Users);
  const userValid = await users.findOneBy({username: username});
  if (!userValid) {
    return res.send("Invalid username");
  } else {
    if (userValid.password !== password) {
      return res.send("Incorrect password");
    } else {
      const token = jwt.sign(username, "This-Is-The-SECRET-Key");
      res.send({token : token});
      console.log(token);
    }
  }
});

//Function - validate a token, return username
const validate = (req: Request) => {
  let token = req.headers.authorization!.split(" ")[1];
  token = token.split("").slice(1, token.length-1).join('');
  console.log(token, typeof token);
  try {
    const verify = jwt.verify(token, "This-Is-The-SECRET-Key");
    
  console.log('verify: ', verify)
  return verify;
  } catch (err){
    console.log('Unable to verify token')
  }
};

//Login window
app.get("/login/me", (req: Request, res: Response) => {
  const verify = validate(req);
  if (verify) {
    res.send(`Hello, ${verify}! Welcome back!`);
  } else {
    res.sendStatus(401);
  }
});

//Update the name field of a user
app.post("/auth/update", async (req: Request, res: Response) => {
  const verify = validate(req);
  if (!verify) {
    res.sendStatus(401);
  } else {
    const userUsername = verify;
    const newName = req.body.name;
    console.log('new name is: ', newName)
    await AppDataSource.createQueryBuilder()
      .update(Users)
      .set({ name: newName })
      .where("username = :userUsername", { userUsername: userUsername })
      .execute();
    console.log("User updated!");
    res.status(200).send("User has been updated");
  }
});
app.listen(5000, ()=>{console.log('Listening at 5000')});
