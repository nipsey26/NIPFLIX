"use client";

import { useEffect, useState } from "react";


type Revenue = {

  totalRevenue:number;

  monthlyRevenue:number;

  subscribers:number;

  activeSubscriptions:number;

  recentPayments:any[];

};



export default function RevenuePage(){


const [data,setData] =
useState<Revenue|null>(null);


const [loading,setLoading] =
useState(true);





async function loadRevenue(){


const response =
await fetch("/api/admin/revenue");


const result =
await response.json();


setData(result);


setLoading(false);


}




useEffect(()=>{

loadRevenue();

},[]);





if(loading){

return (

<div className="
text-2xl
font-black
">

Loading revenue...

</div>

);

}







return (

<section className="
space-y-10
">



<div>

<h1 className="
text-5xl
font-black
">

Revenue

</h1>


<p className="
text-gray-400
mt-3
">

Track NIPFLIX earnings and subscriptions.

</p>

</div>







<div className="
grid
grid-cols-2
md:grid-cols-4
gap-6
">



<Card

title="Total Revenue"

value={`$${data?.totalRevenue || 0}`}

/>


<Card

title="This Month"

value={`$${data?.monthlyRevenue || 0}`}

/>


<Card

title="Subscribers"

value={data?.subscribers || 0}

/>


<Card

title="Active Plans"

value={data?.activeSubscriptions || 0}

/>



</div>








<section className="
bg-neutral-950
border
border-white/10
rounded-3xl
p-8
">


<h2 className="
text-3xl
font-black
">

Recent Payments

</h2>



<div className="
mt-6
space-y-4
">


{

data?.recentPayments.map(
(payment:any)=>(


<div

key={payment.id}

className="
bg-black
rounded-xl
p-5
flex
justify-between
"

>

<span>

{payment.email}

</span>


<span className="
font-black
">

${payment.amount}

</span>


</div>


)

)

}



</div>


</section>





</section>

);

}







function Card({

title,

value

}:{

title:string;

value:any;

}){


return (

<div className="
bg-neutral-950
border
border-white/10
rounded-3xl
p-6
">


<p className="
text-gray-400
">

{title}

</p>


<h2 className="
text-4xl
font-black
mt-3
">

{value}

</h2>


</div>

);


}