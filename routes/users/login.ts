import { Context } from "@kapsonfire/bun-bakery";
import { usersService } from "../..";
import { LoginDTO } from "../../dto/login.dto";

export async function POST(ctx: Context) {
  const userData: LoginDTO = await ctx.request.json();
  const result: Boolean = await usersService.login(userData);

  result
    ? ctx.sendAsJson({ Message: "Login Success" })
    : ctx.sendAsJson({ Message: "Login Fail" });
}
