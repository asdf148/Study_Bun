import { Router } from "@kapsonfire/bun-bakery";
import { db, SyncDB } from "./database/sqlite";
import { UserRepository } from "./repository/users.repository";
import { UsersService } from "./service/users.service";
import { Encryption } from "./util/encryption";

SyncDB();

export const usersService: UsersService = new UsersService(
  new UserRepository(db),
  new Encryption()
);

new Router({
  port: 3000,
  assetsPath: import.meta.dir + "/assets/",
  routesPath: import.meta.dir + "/routes/",
});

console.log("server is running on http://localhost:3000");
