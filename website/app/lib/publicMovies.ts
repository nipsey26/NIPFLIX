export type PublicMovie = {
  id: string;
  title: string;
  overview: string;
  poster: string;
  video: string;
};

export const publicMovies: PublicMovie[] = [
  {
    id: "night-of-the-living-dead",
    title: "Night of the Living Dead (1968)",
    overview:
      "A classic public-domain horror film directed by George A. Romero.",
    poster:
      "https://archive.org/services/img/Night_of_the_Living_Dead",
    video:
      "https://archive.org/download/Night_of_the_Living_Dead/Night_of_the_Living_Dead_512kb.mp4",
  },
  {
    id: "his-girl-friday",
    title: "His Girl Friday",
    overview:
      "A classic public-domain comedy starring Cary Grant.",
    poster:
      "https://archive.org/services/img/hisgirlfriday",
    video:
      "https://archive.org/download/hisgirlfriday_201908/HisGirlFriday.mp4",
  },
];