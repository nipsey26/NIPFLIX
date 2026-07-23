"use client";

type Props = {
  title: string;
  backdrop: string;
  description: string;
  year?: number;
  category?: string;
};

export default function MovieDetailsHero({
  title,
  backdrop,
  description,
  year,
  category,
}: Props) {
  return (
    <section className="relative h-[75vh] w-full overflow-hidden">

      <img
        src={backdrop}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      <div className="absolute bottom-20 left-8 md:left-20 max-w-2xl">

        <h1 className="text-5xl md:text-7xl font-black mb-6">
          {title}
        </h1>

        <div className="flex gap-4 text-gray-300 mb-5">
          {year && <span>{year}</span>}
          {category && <span>{category}</span>}
        </div>

        <p className="text-lg text-gray-200 leading-8">
          {description}
        </p>

      </div>

    </section>
  );
}