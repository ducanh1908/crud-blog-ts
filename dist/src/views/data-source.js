"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    username: 'root',
    password: '123456',
    database: 'dbtest',
    synchronize: true,
    logging: false,
    entities: ["dist/src/model/*.js"],
});
