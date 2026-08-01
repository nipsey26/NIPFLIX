import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  const password = await bcrypt.hash(
    "Nipsey hussle@413",
    10
  );


  const admin = await prisma.user.upsert({

    where: {
      email: "emmanuelfidelise21@gmail.com",
    },


    update: {

      name: "Emmanuel Fidelis",

      password,

      role: "ADMIN",

    },


    create: {

      name: "Emmanuel Fidelis",

      email: "emmanuelfidelise21@gmail.com",

      password,

      role: "ADMIN",

    },

  });


  console.log(
    "Admin created:",
    admin.email
  );

}


main()

  .catch((error) => {

    console.error(error);

    process.exit(1);

  })

  .finally(async () => {

    await prisma.$disconnect();

  });