import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";
import { verifySession } from "@/app/lib/auth";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const session = cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }

  const payload = await verifySession(session);

  if (!payload?.userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId as string,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return user;
}