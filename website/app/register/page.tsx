"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function RegisterPage(){


const router =
useRouter();



const [form,setForm] =
useState({

name:"",

email:"",

password:""

});



const [message,setMessage] =
useState("");





async function register(){


const res =
await fetch(

"/api/register",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify(form)

}

);



const data =
await res.json();





if(res.ok){


router.push("/login");


}else{


setMessage(
data.error
);


}


}







return (

<main className="
min-h-screen
bg-black
text-white
flex
items-center
justify-center
p-6
">


<div className="
bg-neutral-900
p-8
rounded-xl
w-full
max-w-md
">


<h1 className="
text-4xl
font-black
mb-6
">

Create NIPFLIX Account

</h1>





<input

placeholder="Name"

className="
w-full
bg-black
p-3
rounded-lg
mb-4
"

onChange={
e=>
setForm({

...form,

name:e.target.value

})
}

/>





<input

placeholder="Email"

className="
w-full
bg-black
p-3
rounded-lg
mb-4
"

onChange={
e=>
setForm({

...form,

email:e.target.value

})
}

/>






<input

placeholder="Password"

type="password"

className="
w-full
bg-black
p-3
rounded-lg
mb-4
"

onChange={
e=>
setForm({

...form,

password:e.target.value

})
}

/>







<button

onClick={register}

className="
bg-red-600
w-full
py-3
rounded-lg
font-black
"

>

Create Account

</button>





<p className="
text-red-400
mt-4
">

{message}

</p>





<Link

href="/login"

className="
block
mt-5
text-gray-300
"

>

Already have an account? Login

</Link>



</div>


</main>

);


}