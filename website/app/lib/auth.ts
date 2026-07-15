import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";

const secretKey = process.env.AUTH_SECRET;

if (!secretKey) {
  throw new Error("AUTH_SECRET is not defined");
}

const key = new TextEncoder().encode(secretKey);


export async function createSession(userId: string) {

  const token = await new SignJWT({ userId })

    .setProtectedHeader({
      alg: "HS256",
    })

    .setIssuedAt()

    .setExpirationTime("7d")

    .sign(key);


  return token;

}



export async function verifySession(token: string) {

  try {

    const { payload } = await jwtVerify(
      token,
      key
    );


    return payload;


  } catch {

    return null;

  }

}




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