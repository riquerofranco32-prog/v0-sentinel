import { NextRequest, NextResponse } from "next/server";
import { resolveAgentMarkdown } from "@/lib/agent-markdown";

// ponytail: agents send `Accept: text/markdown` to get a lightweight,
// LLM-friendly body instead of the full HTML/RSC payload. Intercepting in
// proxy (formerly middleware) means every route (including unknown paths)
// gets a correct Markdown response + status without touching each page
// component.
export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/markdown")) {
    return NextResponse.next();
  }

  const { status, body } = resolveAgentMarkdown(request.nextUrl.pathname);

  return new NextResponse(body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
};
