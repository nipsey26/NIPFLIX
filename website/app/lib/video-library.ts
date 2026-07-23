// 3000-slot video library for NIPFLIX

export const videoLibrary = Array.from(
  { length: 3000 },
  (_, index) => ({
    slot: index + 1,

    videoUrl: "",

    trailerUrl: "",
  })
);