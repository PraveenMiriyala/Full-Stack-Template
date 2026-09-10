import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      message: "Access granted to protected endpoint!",
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      },
      timestamp: new Date().toISOString(),
    },
  });
}
