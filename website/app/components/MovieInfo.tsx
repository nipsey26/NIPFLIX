type Props = {

  overview:string;

  year?:number;

  category?:string;

};

export default function MovieInfo({

overview,

year,

category,

}:Props){

return(

<section className="py-10">

<h2 className="text-3xl font-black mb-6">
About
</h2>

<div className="space-y-4 text-gray-300">

<p>{overview}</p>

<p>
<strong>Year:</strong> {year}
</p>

<p>
<strong>Category:</strong> {category}
</p>

</div>

</section>

);

}