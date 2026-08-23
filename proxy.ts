import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { previewHostnameNeedsNoindex } from "@/src/security/preview-host";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get("host") ?? "";

  if (previewHostnameNeedsNoindex(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|webp|svg|ico|css|js)$).*)",
  ],
};
