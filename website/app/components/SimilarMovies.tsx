import MovieCard from "./MovieCard";

export default function SimilarMovies({

movies,

}:{

movies:any[];

}){

return(

<section className="py-12">

<h2 className="text-3xl font-black mb-8">

Similar Movies

</h2>

<div className="grid grid-cols-2 md:grid-cols-5 gap-6">

{movies.map(movie=>(

<MovieCard

key={movie.id}

movie={movie}

/>

))}

</div>

</section>

);

}