import Database from "bun:sqlite";
import { UserModel } from "../database/models/user.model";

export class UserRepository {
  private readonly db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public findOneById(user_id: number): UserModel | null {
    try {
      return this.db.query(`select * from users where id = ${user_id}`).get();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public findOneByEmail(email: string): UserModel | null {
    try {
      return this.db
        .query(`select * from users where email = "${email}"`)
        .get();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public create(user: UserModel): Boolean {
    try {
      this.db.run(
        `insert into users values(null, "${user.name}", "${user.email}", "${user.password}", "${user.salt}")`
      );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
