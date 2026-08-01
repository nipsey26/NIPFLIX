import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin";


export async function GET() {

  try {

    const admin = await requireAdmin();

    if ("error" in admin) {
      return NextResponse.json(
        {
          error: admin.error,
        },
        {
          status: admin.status,
        }
      );
    }


    let settings =
      await prisma.siteSettings.findFirst();



    if (!settings) {

      settings =
        await prisma.siteSettings.create({
          data: {}
        });

    }



    return NextResponse.json(settings);



  } catch(error) {

    console.error(error);


    return NextResponse.json(
      {
        error: "Could not load settings"
      },
      {
        status: 500
      }
    );

  }

}



export async function PATCH(
  request: Request
) {

  try {

    const admin = await requireAdmin();

    if ("error" in admin) {
      return NextResponse.json(
        {
          error: admin.error,
        },
        {
          status: admin.status,
        }
      );
    }


    const body =
      await request.json();



    const existing =
      await prisma.siteSettings.findFirst();



    const settings = existing

      ? await prisma.siteSettings.update({

          where: {
            id: existing.id
          },

          data: body

        })

      : await prisma.siteSettings.create({

          data: body

        });



    return NextResponse.json(settings);



  } catch(error) {

    console.error(error);


    return NextResponse.json(
      {
        error: "Could not update settings"
      },
      {
        status: 500
      }
    );

  }

}