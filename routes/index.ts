import { Context } from "@kapsonfire/bun-bakery";

export async function GET(ctx: Context) {
  ctx.sendAsJson({ Message: "Hello World!" });
}
