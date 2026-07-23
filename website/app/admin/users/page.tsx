"use client";

import { useEffect, useState } from "react";

type User = {

  id:string;

  name:string;

  email:string;

  createdAt:string;

  profiles:any[];

  myList:any[];

  watchProgress:any[];

};


export default function AdminUsersPage(){


  const [users,setUsers] =
    useState<User[]>([]);


  const [search,setSearch] =
    useState("");


  const [loading,setLoading] =
    useState(true);




  async function loadUsers(){

    try{

      const response =
        await fetch("/api/admin/users");


      const data =
        await response.json();


      if(Array.isArray(data)){

        setUsers(data);

      }


    }finally{

      setLoading(false);

    }

  }





  useEffect(()=>{

    loadUsers();

  },[]);







  const filteredUsers = users.filter(user =>

    user.name
    .toLowerCase()
    .includes(search.toLowerCase())

    ||

    user.email
    .toLowerCase()
    .includes(search.toLowerCase())

  );






  return (

    <main className="space-y-10">



      <section
        className="
        rounded-3xl
        bg-neutral-950
        border
        border-white/10
        p-10
        "
      >

        <p className="
        text-red-500
        tracking-[0.4em]
        font-black
        ">

          NIPFLIX USERS

        </p>


        <h1 className="
        text-6xl
        font-black
        mt-4
        ">

          User Management

        </h1>


        <p className="
        text-gray-400
        text-xl
        mt-4
        ">

          Monitor accounts, profiles and viewing activity.

        </p>


      </section>






      <section
        className="
        grid
        md:grid-cols-3
        gap-5
        "
      >


        <Stat
          title="Total Users"
          value={users.length}
          color="bg-blue-600"
        />


        <Stat
          title="Profiles Created"
          value={
            users.reduce(
              (total,user)=>
              total + user.profiles.length,
              0
            )
          }
          color="bg-green-600"
        />


        <Stat
          title="Watch Activity"
          value={
            users.reduce(
              (total,user)=>
              total + user.watchProgress.length,
              0
            )
          }
          color="bg-red-600"
        />


      </section>







      <input

        placeholder="Search users by name or email..."

        value={search}

        onChange={
          e=>setSearch(e.target.value)
        }

        className="
        w-full
        bg-neutral-950
        border
        border-white/10
        rounded-2xl
        px-6
        py-5
        text-lg
        "

      />







      {loading ? (

        <p className="text-xl font-black">
          Loading users...
        </p>

      ) : (


        <section
          className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
          "
        >


          {filteredUsers.map(user=>(


            <div

              key={user.id}

              className="
              bg-neutral-950
              border
              border-white/10
              rounded-3xl
              p-7
              "

            >


              <div
                className="
                w-20
                h-20
                rounded-full
                bg-red-600
                flex
                items-center
                justify-center
                text-4xl
                font-black
                "
              >

                {user.name?.charAt(0) || "U"}

              </div>





              <h2 className="
              text-3xl
              font-black
              mt-6
              ">

                {user.name}

              </h2>


              <p className="
              text-gray-400
              mt-2
              ">

                {user.email}

              </p>





              <div
                className="
                grid
                grid-cols-3
                gap-3
                mt-8
                "
              >


                <Box
                  title="Profiles"
                  value={user.profiles.length}
                />


                <Box
                  title="List"
                  value={user.myList.length}
                />


                <Box
                  title="Watching"
                  value={user.watchProgress.length}
                />


              </div>





              <div className="
              mt-6
              text-sm
              text-gray-500
              ">

                Joined:

                {" "}

                {new Date(
                  user.createdAt
                ).toLocaleDateString()}


              </div>



              <button

                className="
                mt-6
                w-full
                bg-red-600
                rounded-xl
                py-3
                font-black
                "

              >

                Manage User

              </button>


            </div>


          ))}


        </section>


      )}



    </main>

  );

}







function Stat({

title,
value,
color

}:{
title:string;
value:number;
color:string;
}){


return (

<div className={`
rounded-3xl
p-6
${color}
`}>

<p>
{title}
</p>

<h2 className="
text-5xl
font-black
mt-3
">

{value}

</h2>

</div>

);

}







function Box({

title,
value

}:{
title:string;
value:number;
}){


return (

<div
className="
bg-black
rounded-xl
p-4
text-center
"
>

<p className="
text-2xl
font-black
">

{value}

</p>


<span className="
text-xs
text-gray-500
">

{title}

</span>


</div>

);

}