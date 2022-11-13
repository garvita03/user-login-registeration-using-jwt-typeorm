import express, { Request, Response} from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Users } from "./entity/Users";
import jwt, { JwtPayload } from "jsonwebtoken";

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
app.post("/register", async (req: Request, res: Response) => {
  const user = AppDataSource.getRepository(Users).create(req.body);
  const result = await AppDataSource.getRepository(Users).save(user);
  return res.send(result);
});

//Login to the database
app.post("/login", (req: Request, res: Response) => {
  const username = req.body.username;
  const token = jwt.sign(username, "This-Is-The-SECRET-Key");
  res.send(token);
});

//Function - validate a token, return username
const validate = (req: Request) => {
  let token = req.headers.authorization!.split(" ")[1];
  const verify = jwt.verify(token, "This-Is-The-SECRET-Key");
  return verify;
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
app.post("/update", async (req: Request, res: Response) => {
  const verify = validate(req);
  if (!verify) {
    res.sendStatus(401);
  } else {
    const userUsername = verify;
    const newName = req.body.name;
    await AppDataSource.createQueryBuilder()
      .update(Users)
      .set({ name: newName })
      .where("username = :userUsername", { userUsername: userUsername })
      .execute();
    console.log("User updated!");
    res.status(200).send("User has been updated");
  }
});
app.listen(3000);
