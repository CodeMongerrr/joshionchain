import { llmsFull, textResponse } from "@/lib/llms";

/** Everything on the site in plain text, for agents that want the full story. */
export const dynamic = "force-static";

export async function GET() {
  return textResponse(llmsFull());
}
