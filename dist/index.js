"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const data_source_1 = require("./data-source");
const Users_1 = require("./entity/Users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source Initialized");
})
    .catch((err) => {
    console.log("Error during Data source initialization", err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Get list of all users
app.get("/users", async (req, res) => {
    const users = await data_source_1.AppDataSource.getRepository(Users_1.Users).find();
    res.json(users);
});
//Register a user in DB
app.post("/register", async (req, res) => {
    const user = data_source_1.AppDataSource.getRepository(Users_1.Users).create(req.body);
    const result = await data_source_1.AppDataSource.getRepository(Users_1.Users).save(user);
    return res.send(result);
});
//Login to the database
app.post("/login", (req, res) => {
    const username = req.body.username;
    const token = jsonwebtoken_1.default.sign(username, "This-Is-The-SECRET-Key");
    res.send(token);
});
//Function - validate a token, return username
const validate = (req) => {
    let token = req.headers.authorization.split(" ")[1];
    const verify = jsonwebtoken_1.default.verify(token, "This-Is-The-SECRET-Key");
    return verify;
};
//Login window
app.get("/login/me", (req, res) => {
    const verify = validate(req);
    if (verify) {
        res.send(`Hello, ${verify}! Welcome back!`);
    }
    else {
        res.sendStatus(401);
    }
});
//Update the name field of a user
app.post("/update", async (req, res) => {
    const verify = validate(req);
    if (!verify) {
        res.sendStatus(401);
    }
    else {
        const userUsername = verify;
        const newName = req.body.name;
        await data_source_1.AppDataSource.createQueryBuilder()
            .update(Users_1.Users)
            .set({ name: newName })
            .where("username = :userUsername", { userUsername: userUsername })
            .execute();
        console.log("User updated!");
        res.status(200).send("User has been updated");
    }
});
app.listen(3000);
