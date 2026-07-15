import Image from "next/image";
import Link from "next/link";


export default function ContinueWatching({
  items,
}: {
  items: any[];
}) {


  if (!items || items.length === 0) {
    return null;
  }



  return (

    <section className="px-8 pb-10">


      <h2 className="text-3xl font-bold mb-5">
        Continue Watching
      </h2>



      <div className="flex gap-5 overflow-x-auto">


        {items.map((item) => (

          <Link

            key={item.id}

            href={
              item.mediaType === "movie"
                ? `/movie/${item.mediaId}`
                : `/tv/${item.mediaId}`
            }

            className="min-w-[192px] group"

          >


            <div className="relative">


              <Image

                src={
                  item.posterPath
                    ? `https://image.tmdb.org/t/p/w500${item.posterPath}`
                    : "/images/logo.png"
                }

                alt={item.title}

                width={192}

                height={288}

                className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"

              />



              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700">

                <div

                  className="h-full bg-red-600"

                  style={{
                    width: `${item.progress}%`,
                  }}

                />

              </div>


            </div>




            <h3 className="mt-3 font-bold">

              {item.title}

            </h3>



          </Link>

        ))}


      </div>


    </section>

  );

}