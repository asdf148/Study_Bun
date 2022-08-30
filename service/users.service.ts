import { UserModel } from "../database/models/user.model";
import { JoinDTO } from "../dto/join.dto";
import { UserRepository } from "../repository/users.repository";
// import { hash } from "bcrypt";
import { getHashes } from "crypto";
import { hash } from "bun";

export class UsersService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public join(userData: JoinDTO): Boolean {
    userData.password = String(hash(userData.password, 12));
    return this.userRepository.create(
      new UserModel({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      })
    );
  }
}
