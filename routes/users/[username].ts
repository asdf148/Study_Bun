import { Context } from "@kapsonfire/bun-bakery";

export async function GET(ctx: Context) {
  console.log(ctx.request.url);
  ctx.sendAsJson({ message: "hello " + ctx.params.username + "!" });
}
