import { Context } from "@kapsonfire/bun-bakery";
import { usersService } from "../..";
import { JoinDTO } from "../../dto/join.dto";

export async function POST(ctx: Context) {
  const userData: JoinDTO = await ctx.request.json();
  const result: Boolean = await usersService.join(userData);

  result
    ? ctx.sendAsJson({ Message: "Join Success" })
    : ctx.sendAsJson({ Message: "Join Fail" });
}
