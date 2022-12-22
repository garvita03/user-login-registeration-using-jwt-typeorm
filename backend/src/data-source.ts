import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "./entity/Users"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "enter password",
    database: "newdb",
    synchronize: true,
    logging: true,
    entities: [Users],
    migrations: [],
    subscribers: [],
})

