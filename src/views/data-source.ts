import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource ({
    type :"mysql",
    host :"localhost",
    username: 'root',
    password:'123456',
    database: 'dbtest',
    synchronize: true,
    logging: false,
    entities:["dist/src/model/*.js"],
});