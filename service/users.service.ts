import { UserModel } from "../database/models/user.model";
import { JoinDTO } from "../dto/join.dto";
import { LoginDTO } from "../dto/login.dto";
import { UserRepository } from "../repository/users.repository";
import { Encryption } from "../util/encryption";
import * as jwt from "jsonwebtoken";

export class UsersService {
  private readonly userRepository: UserRepository;
  private readonly encryption: Encryption;

  constructor(userRepository: UserRepository, encryption: Encryption) {
    this.userRepository = userRepository;
    this.encryption = encryption;
  }

  public findOneUserById(user_id: number) {
    return this.userRepository.findOneById(user_id);
  }

  public async join(userData: JoinDTO): Promise<Boolean> {
    const { password, salt } = await this.encryption.createHashedPassword(
      userData.password
    );

    return this.userRepository.create(
      new UserModel({
        name: userData.name,
        email: userData.email,
        password: password,
        salt: salt,
      })
    );
  }

  public async login(userData: LoginDTO): Promise<string | null> {
    const user: UserModel | null = this.userRepository.findOneByEmail(
      userData.email
    );
    if (!user) {
      return null;
    }
    const hashedPassword: string = await this.encryption.makePasswordHashed(
      user.salt,
      userData.password
    );
    return user.password == hashedPassword
      ? jwt.sign({ id: user.id, email: user.email }, "privateKey", {
          expiresIn: "1h",
        })
      : null;
  }
}
