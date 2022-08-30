import { Context } from "@kapsonfire/bun-bakery";
import { db } from "../../database/sqlite";
import { JoinDTO } from "../../dto/join.dto";
import { UserRepository } from "../../repository/users.repository";
import { UsersService } from "../../service/users.service";

const usersService: UsersService = new UsersService(new UserRepository(db));

export async function POST(ctx: Context) {
  const userData: JoinDTO = await ctx.request.json();
  const result: Boolean = usersService.join(userData);

  result
    ? ctx.sendAsJson({ Message: "Join Success" })
    : ctx.sendAsJson({ Message: "Join Fail" });
}
