type Person={

id:number;

name:string;

profile_path:string;

};

export default function MovieCast({

cast,

}:{

cast:Person[];

}){

return(

<section className="py-10">

<h2 className="text-3xl font-black mb-8">

Cast

</h2>

<div className="flex gap-5 overflow-x-auto">

{cast.map(actor=>(

<div
key={actor.id}
className="min-w-[140px]"
>

<img

src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}

className="rounded-xl w-full h-44 object-cover"

/>

<p className="mt-3 font-bold">

{actor.name}

</p>

</div>

))}

</div>

</section>

);

}