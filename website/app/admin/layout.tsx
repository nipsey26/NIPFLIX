import Link from "next/link";
import AdminMobileMenu from "./AdminMobileMenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex">

      {/* DESKTOP SIDEBAR */}

      <aside
        className="
        hidden
        lg:flex
        w-72
        bg-neutral-950
        border-r
        border-white/10
        flex-col
        fixed
        left-0
        top-0
        bottom-0
        "
      >

        <div className="p-8">

          <h1 className="text-red-600 text-5xl font-black">
            NIPFLIX
          </h1>

          <p className="text-gray-500 mt-2">
            Admin Studio
          </p>

        </div>

        <nav className="flex-1 px-6 space-y-2">

          <Link
            href="/admin"
            className="block rounded-2xl px-5 py-4 hover:bg-red-600 transition font-bold"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/admin/movies"
            className="block rounded-2xl px-5 py-4 hover:bg-red-600 transition font-bold"
          >
            🎬 Movies
          </Link>

          <Link
            href="/admin/tv"
            className="block rounded-2xl px-5 py-4 hover:bg-red-600 transition font-bold"
          >
            📺 TV Shows
          </Link>

          <Link
            href="/admin/videos"
            className="block rounded-2xl px-5 py-4 hover:bg-red-600 transition font-bold"
          >
            🎥 Video Library
          </Link>

          <Link
            href="/admin/users"
            className="block rounded-2xl px-5 py-4 hover:bg-red-600 transition font-bold"
          >
            👥 Users
          </Link>

          <Link
            href="/admin/subscriptions"
            className="block rounded-2xl px-5 py-4 hover:bg-red-600 transition font-bold"
          >
            💳 Subscriptions
          </Link>

          <Link
            href="/admin/revenue"
            className="block rounded-2xl px-5 py-4 hover:bg-red-600 transition font-bold"
          >
            💰 Revenue
          </Link>

          <Link
            href="/admin/analytics"
            className="block rounded-2xl px-5 py-4 hover:bg-red-600 transition font-bold"
          >
            📈 Analytics
          </Link>

          <Link
            href="/admin/settings"
            className="block rounded-2xl px-5 py-4 hover:bg-red-600 transition font-bold"
          >
            ⚙️ Settings
          </Link>

        </nav>

        <div className="p-6 border-t border-white/10">

          <Link
            href="/"
            className="
            flex
            items-center
            justify-center
            rounded-2xl
            bg-red-600
            py-4
            font-black
            text-lg
            "
          >
            🏠 Back to NIPFLIX
          </Link>

        </div>

      </aside>

      {/* MOBILE */}

      <div className="lg:hidden fixed top-6 left-6 right-6 z-50 flex justify-between">

        <AdminMobileMenu />

        <Link
          href="/"
          className="
          w-16
          h-16
          bg-red-600
          rounded-2xl
          flex
          items-center
          justify-center
          text-3xl
          "
        >
          🏠
        </Link>

      </div>

      {/* PAGE */}

      <main
        className="
        flex-1
        lg:ml-72
        pt-28
        px-6
        md:px-10
        pb-20
        "
      >
        {children}
      </main>

    </div>
  );
}