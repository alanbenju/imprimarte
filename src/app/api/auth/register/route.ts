import { NextRequest } from "next/server";
import { register } from "../../users/controllers/auth.controller";

export async function POST(req: NextRequest) {
  return register(req);
} 