import { NextResponse } from "next/server";

const DEMO_EMAIL = "eve.holt@reqres.in";
const DEMO_PASSWORD = "cityslicka";
const DEMO_TOKEN = "QpwL5tke4Pnpja7X4";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.email === DEMO_EMAIL && body.password === DEMO_PASSWORD) {
    return NextResponse.json({ token: DEMO_TOKEN });
  }

  return NextResponse.json(
    { error: "user not found" },
    { status: 401 }
  );
}
