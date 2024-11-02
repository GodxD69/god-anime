import { AnimeEpisodes, AnimeStreamingLinks } from "@/types/anime";
import Artplayer from "artplayer";
import Option from "artplayer/types/option";
import Hls from "hls.js";
import { memo, useCallback } from "react";
import Player from "./player";

interface AniFirePlayerProps extends AnimeStreamingLinks {
  episodes: AnimeEpisodes;
  episodeId: string
}

const AniFirePlayer = ({ episodes, episodeId, ...props }: AniFirePlayerProps) => {
  const playM3u8 = useCallback((video: any, url: string, art: Artplayer) => {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destror();
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      art.hls = hls;
      art.on("destroy", () => hls.destroy());
    } else if (video.onCanPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    } else {
      art.notice.show = "Unsuported playback format :(";
    }
  }, []);

  const options: Option = {
    container: ".artplayer-app",
    url: props.sources[0].url,
    customType: {
      m3u8: playM3u8,
    },
    volume: 1,
    isLive: false,
    muted: false,
    autoplay: false,
    autoOrientation: true,
    pip: true,
    screenshot: false,
    setting: true,
    loop: false,
    flip: true,
    lock: true,
    playbackRate: true,
    fullscreen: true,
    fullscreenWeb: false,
    subtitleOffset: false,
    miniProgressBar: false,
    mutex: false,
    backdrop: true,
    playsInline: true,
    autoPlayback: true,
    airplay: true,
    theme: "#E11D48",
    moreVideoAttr: {
      crossOrigin: "anonymous",
    },
    subtitle: {
      url:
        typeof props.tracks !== "undefined"
          ? props.tracks.find((sub) => sub.label === "English")?.file || ""
          : "",
      type: "vtt",
      style: {
        color: "#fff",
      },
      encoding: "utf-8",
    },
  };

  return (
    <Player
      option={options}
      subtitles={props.tracks}
      intro={props.intro}
      outro={props.outro}
      episodes={episodes}
      episodeId={episodeId}
      className="art-container aspect-video basis-[60%] shrink-0"
    />
  );
};

export default memo(AniFirePlayer);
