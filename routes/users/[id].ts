import { Context } from "@kapsonfire/bun-bakery";
import { db } from "../../database/sqlite";
import { UserRepository } from "../../repository/users.repository";
import { UsersService } from "../../service/users.service";
import { Encryption } from "../../util/encryption";

const usersService: UsersService = new UsersService(
  new UserRepository(db),
  new Encryption()
);

export async function GET(ctx: Context) {
  const a = usersService.findOneUserById(Number(ctx.params.id));
  console.log(a);

  ctx.sendAsJson({ message: "failed?" });
}
