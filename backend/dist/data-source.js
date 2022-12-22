"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Users_1 = require("./entity/Users");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Garvi36_",
    database: "newdb",
    synchronize: true,
    logging: true,
    entities: [Users_1.Users],
    migrations: [],
    subscribers: [],
});
