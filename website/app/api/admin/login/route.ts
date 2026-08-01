import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;


    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }


    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });


    if (!user) {
      return NextResponse.json(
        {
          error: "Admin account not found",
        },
        {
          status: 404,
        }
      );
    }


    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Access denied",
        },
        {
          status: 403,
        }
      );
    }


    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );


    if (!passwordMatch) {
      return NextResponse.json(
        {
          error: "Incorrect password",
        },
        {
          status: 401,
        }
      );
    }


    const session = await createSession(user.id);


    const response = NextResponse.json({
      message: "Admin login successful",
      admin: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });


    response.cookies.set(
      "session",
      session,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      }
    );


    return response;


  } catch (error) {

    console.error(error);


    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );

  }
}