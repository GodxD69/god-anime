"use client";

import { getAnimeHomePage } from "@/api/anime";
import {
  AnimeSpotlightCarousel,
  TrendingCarousel,
} from "@/components/home/carousel";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["ANIME_HOME_PAGE"],
    queryFn: () => getAnimeHomePage(),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Is loading...</p>;

  if (!data) return <p>Something went wrong!</p>;

  return (
    <div className="w-full h-auto">
      <div className="">
        <AnimeSpotlightCarousel spotlightAnimes={data.spotlightAnimes} />
      </div>

      <div className="wrapper-container px-4 my-6">
        <h2 className="text-3xl font-semibold text-primary">Trending</h2>

        <div className="">
          <TrendingCarousel animes={data.trendingAnimes} />
        </div>
      </div>
    </div>
  );
}
