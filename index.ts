import { Router } from "@kapsonfire/bun-bakery";
import { SyncDB } from "./database/sqlite";

SyncDB();

new Router({
  port: 3000,
  assetsPath: import.meta.dir + "/assets/",
  routesPath: import.meta.dir + "/routes/",
});

console.log("server is running on http://localhost:3000");
