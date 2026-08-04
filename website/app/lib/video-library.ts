// Demo video library for NIPFLIX

export const videoLibrary = [
  {
    slot: 1,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trailerUrl: "",
  },
  {
    slot: 2,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    trailerUrl: "",
  },
  {
    slot: 3,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    trailerUrl: "",
  },
  {
    slot: 4,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trailerUrl: "",
  },
  {
    slot: 5,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    trailerUrl: "",
  },

  ...Array.from({ length: 2995 }, (_, index) => ({
    slot: index + 6,
    videoUrl: "",
    trailerUrl: "",
  })),
];