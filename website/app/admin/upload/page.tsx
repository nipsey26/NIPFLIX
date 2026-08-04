import Link from "next/link";

export default function UploadPage() {

  return (

    <main className="
    min-h-screen
    bg-black
    text-white
    p-10
    ">

      <h1 className="
      text-5xl
      font-black
      ">
        MP4 Movie Import
      </h1>


      <p className="
      text-gray-400
      mt-5
      text-xl
      ">
        Use Add Movie to paste your direct MP4 video URL.
      </p>


      <Link
        href="/admin/movies/new"
        className="
        inline-block
        mt-8
        bg-red-600
        px-8
        py-4
        rounded-xl
        font-black
        "
      >
        Add Movie
      </Link>


    </main>

  );

}