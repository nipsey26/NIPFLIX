import { getCurrentUser } from "@/app/lib/auth";

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Unauthorized",
      status: 401,
    };
  }

  if (user.role !== "ADMIN") {
    return {
      error: "Forbidden",
      status: 403,
    };
  }

  return {
    user,
  };
}