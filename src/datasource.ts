import { DataSource, DataSourceOptions } from "typeorm";
require("dotenv").config();

const config: DataSourceOptions = {
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_ACCOUNT,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: Boolean(process.env.PG_SYNCHRONIZE),
  logging: Boolean(process.env.PG_LOGGING),
  entities: [String(process.env.PG_ENTITIES)],
  // cli: {
  //   entitiesDir: String(process.env.PG_ENTITIES_DIR),
  // },
};

export const dataSource = new DataSource(config);