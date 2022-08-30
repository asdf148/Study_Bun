import Database from "bun:sqlite";
import { UserModel } from "../database/models/user.model";

export class UserRepository {
  private readonly db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public create(user: UserModel): Boolean {
    try {
      this.db.run(
        `insert into users values(null, ${user.name}, ${user.email}, ${user.password})`
      );

      return true;
    } catch (error) {
      console.log(`%c${error}`, "color:red;");
      return false;
    }
  }
}
