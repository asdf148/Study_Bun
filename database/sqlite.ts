import { Database } from "bun:sqlite";

export const db = new Database("mydb.sqlite");

export function SyncDB() {
  db.run("DROP TABLE IF EXISTS comments;");
  db.run("DROP TABLE IF EXISTS posts;");
  db.run("DROP TABLE IF EXISTS users;");

  db.run(
    `CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      salt TEXT NOT NULL
    );`
  );

  db.run(
    `CREATE TABLE posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT NOT NULL,
      title TEXT,
      content TEXT,
      user_id INTEGER,
      CONSTRAINT userId_fk FOREIGN KEY(user_id)
      REFERENCES user(id)
    );`
  );

  db.run(
    `CREATE TABLE comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      post_id INTEGER,
      CONSTRAINT userId_fk FOREIGN KEY(user_id)
      REFERENCES users(id)
      CONSTRAINT postId_fk FOREIGN KEY(post_id)
      REFERENCES posts(id)
    );`
  );
}
