import { videoLibrary } from "@/app/lib/video-library";

export default function VideoLibraryPage() {
  return (
    <main className="space-y-10">

      <div>

        <p className="text-red-500 uppercase tracking-[0.4em] font-black">
          NIPFLIX STUDIO
        </p>

        <h1 className="text-6xl font-black mt-4">
          Video Library
        </h1>

        <p className="text-gray-400 mt-4 text-xl">
          Manage every streaming video connected to NIPFLIX.
        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-red-600 rounded-3xl p-6">
          <p>Total Slots</p>
          <h2 className="text-5xl font-black mt-3">
            {videoLibrary.length}
          </h2>
        </div>

        <div className="bg-green-600 rounded-3xl p-6">
          <p>Used</p>
          <h2 className="text-5xl font-black mt-3">
            {
              videoLibrary.filter(
                (v) => v.videoUrl
              ).length
            }
          </h2>
        </div>

        <div className="bg-yellow-500 text-black rounded-3xl p-6">
          <p>Empty</p>
          <h2 className="text-5xl font-black mt-3">
            {
              videoLibrary.filter(
                (v) => !v.videoUrl
              ).length
            }
          </h2>
        </div>

        <div className="bg-blue-600 rounded-3xl p-6">
          <p>Provider</p>
          <h2 className="text-3xl font-black mt-4">
            Bunny Stream
          </h2>
        </div>

      </div>

      <div className="rounded-3xl bg-neutral-950 border border-white/10 overflow-hidden">

        <table className="w-full">

          <thead className="bg-neutral-900">

            <tr>

              <th className="text-left p-5">
                Slot
              </th>

              <th className="text-left p-5">
                Video
              </th>

              <th className="text-left p-5">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {videoLibrary
              .slice(0, 50)
              .map((video) => (

                <tr
                  key={video.slot}
                  className="border-t border-white/10"
                >

                  <td className="p-5 font-black">
                    #{video.slot}
                  </td>

                  <td className="p-5 text-gray-400">
                    {video.videoUrl || "Empty"}
                  </td>

                  <td className="p-5">

                    {video.videoUrl ? (

                      <span className="text-green-400 font-bold">
                        Connected
                      </span>

                    ) : (

                      <span className="text-yellow-400 font-bold">
                        Available
                      </span>

                    )}

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}