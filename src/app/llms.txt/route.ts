import { llmsIndex, textResponse } from "@/lib/llms";

/** llms.txt, the short index for AI agents. Generated from src/data. */
export const dynamic = "force-static";

export async function GET() {
  return textResponse(llmsIndex());
}
