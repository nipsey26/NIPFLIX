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


    const totalUsers = await prisma.user.count();


    const totalMovies = await prisma.movie.count();


    const totalViews = await prisma.movie.aggregate({
      _sum: {
        views: true,
      },
    });


    const estimatedRevenue =
      (totalViews._sum.views ?? 0) * 0.02;



    const recentMovies = await prisma.movie.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        title: true,
        views: true,
        createdAt: true,
      },
    });



    return NextResponse.json({

      totalRevenue: estimatedRevenue.toFixed(2),

      monthlyRevenue: estimatedRevenue.toFixed(2),

      subscribers: totalUsers,

      activeSubscriptions: totalUsers,

      recentPayments: recentMovies.map((movie) => ({
        id: movie.id,
        email: movie.title,
        amount: (movie.views * 0.02).toFixed(2),
        createdAt: movie.createdAt,
      })),

      totalUsers,

      totalMovies,

      totalViews: totalViews._sum.views ?? 0,

    });



  } catch (error) {

    console.error(error);


    return NextResponse.json(
      {
        error: "Failed to load revenue.",
      },
      {
        status: 500,
      }
    );

  }

}