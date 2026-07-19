import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";


const handler = NextAuth({

  providers:[


    CredentialsProvider({

      name:"Credentials",


      credentials:{

        email:{
          label:"Email",
          type:"email"
        },


        password:{
          label:"Password",
          type:"password"
        }

      },



      async authorize(credentials){


        if(
          !credentials?.email ||
          !credentials?.password
        ){

          return null;

        }



        const user =
          await prisma.user.findUnique({

            where:{
              email:
              credentials.email
            }

          });




        if(!user){

          return null;

        }





        const passwordMatch =
          await bcrypt.compare(

            credentials.password,

            user.password

          );




        if(!passwordMatch){

          return null;

        }





        return {

          id:user.id,

          name:user.name,

          email:user.email

        };


      }


    })

  ],





  session:{

    strategy:"jwt"

  },





  pages:{

    signIn:"/login"

  },


});



export {
  handler as GET,
  handler as POST
};