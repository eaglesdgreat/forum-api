import { ApolloServer } from "apollo-server-express";
// import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { GqlContext } from "./types/interfaces";
import Redis from "ioredis";
import authRoutes from "./routes/auth.routes"
import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import cors from "cors";
import { dataSource } from "./datasource";
import express from "express";
import schema from "./graphql/schemasMap";
import session from "express-session";
import threadItemRoutes from "./routes/thread.items.routes"
import threadRoutes from "./routes/thread.routes"

declare module 'express-session' {
  export interface SessionData {
    userId: string;
    loadedCount: number;
  }
}

require("dotenv").config();

const main = async () => {
  const app = express();
  // const router = express.Router();

  // Configuration to allow cookie session to work on apollo studio
  app.set("trust proxy", process.env.NODE_ENV !== "production");
  app.set("Access-Control-Allow-Origin", process.env.GRAPHQL_CLIENT_URL);
  app.set("Access-Control-Allow-Credentials", true);

  // app.use(
    // cors({
      // credentials: true,
      // origin: process.env.CLIENT_URL,
    // })
  // );

  // database initialization
  await dataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
    });
  
  // Redis session storage
  const redis = new Redis({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  });

  const RedisStore = connectRedis(session);
  const redisStore = new RedisStore({ client: redis as any });

  // Middleware
  app.use(bodyParser.json());

  app.use(
    session({
      store: redisStore,
      name:process.env.COOKIE_NAME,
      // sameSite: "Strict",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        // path: "/",
        sameSite: "none",
        httpOnly: true,
        secure: true, // if true, studio works, postman doesn't; if false its the other way around
        maxAge: 1000 * 60 * 60 * 24,
      }
    } as any)
  );

  // mount routes
  // router.get("/", (req, res) => {
  //   if (!req.session!.userId) {
  //     req.session!.userId = req.query.userId as string;
  //     console.log("user id is set");
  //     req.session!.loadedCount = 0;
  //   } else {
  //     req.session!.loadedCount = Number(req.session!.loadedCount) + 1;
  //   }
  // }
  app.use("/", authRoutes);
  app.use("/", threadRoutes);
  app.use("/", threadItemRoutes);

  const apolloServer = new ApolloServer({
    schema,
    context: ({req, res}: GqlContext) => ({req, res}),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
    // cors: false,
    cors: {
      credentials: true,
      origin: process.env.GRAPHQL_CLIENT_URL,
    }
  });

  app.listen({ port: process.env.SERVER_PORT }, () => {
    console.log(`Server ready at http://localhost:${process.env.SERVER_PORT}${apolloServer.graphqlPath}`);
  });
}

main();
