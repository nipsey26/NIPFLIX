import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function proxy(
  request: NextRequest
) {

  const { pathname } =
    request.nextUrl;


  const response =
    NextResponse.next();



  response.headers.set(
    "x-pathname",
    pathname
  );



  const publicRoutes = [

    "/login",

    "/register",

    "/api",

    "/_next",

    "/favicon.ico",

  ];



  const isPublic =
    publicRoutes.some(
      (route) =>
        pathname.startsWith(route)
    );



  if (isPublic) {

    return response;

  }





  if (
    pathname.startsWith("/admin")
  ) {


    const session =
      request.cookies.get(
        "session"
      )?.value;



    if (!session) {

      return NextResponse.redirect(

        new URL(
          "/login",
          request.url
        )

      );

    }

  }





  return response;

}




export const config = {

  matcher: [

    "/((?!_next/static|_next/image|favicon.ico).*)",

  ],

};