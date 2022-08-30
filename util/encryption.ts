import { randomBytes, pbkdf2 } from "node:crypto";

export class Encryption {
  private async createSalt(): Promise<string> {
    return new Promise((resolve, reject) => {
      randomBytes(64, (err, buf) => {
        if (err) reject(err);
        resolve(buf.toString("base64"));
      });
    });
  }

  public async createHashedPassword(
    plainPassword: string
  ): Promise<{ password: string; salt: string }> {
    return new Promise(async (resolve, rejects) => {
      const salt = await this.createSalt();
      pbkdf2(plainPassword, salt, 9999, 64, "sha512", (err, key) => {
        if (err) rejects(err);
        resolve({ password: key.toString("base64"), salt });
      });
    });
  }

  public async makePasswordHashed(
    salt: string,
    plainPassword: string
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      pbkdf2(plainPassword, salt, 9999, 64, "sha512", (err, key) => {
        if (err) reject(err);
        resolve(key.toString("base64"));
      });
    });
  }
}
