"use client";

import usePlayer from "@/app/hooks/usePlayer";
import { Song } from "@/types";
import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import CustomSlider from './CustomSlider'

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currIdx = player.ids.findIndex((ids) => ids === player.activeId);
    const nextSong = player.ids[currIdx + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrev = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currIdx = player.ids.findIndex((ids) => ids === player.activeId);
    const prevSong = player.ids[currIdx - 1];

    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(prevSong);
  };
  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => {
      setIsPlaying(true);
    },
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (isPlaying == true) {
      pause();
    } else {
      play();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div
        className="
      flex md:hidden col-auto w-full justify-end items-center"
      >
        <div
          onClick={handlePlay}
          className="
                h-10
                w-10
                flex
                items-center
                justify-center
                 rounded-full
                 bg-white
                 p-1
                cursor-pointer
                "
        >
          <Icon className="text-black" size={30} />
        </div>
      </div>
      <div className="flex-row gap-x-2 hidden md:flex w-full items-center justify-end">
        <div
          onClick={onPlayNext}
          className="
                h-10
                w-10
                flex
                items-center
                justify-center
                 rounded-full
                 p-1
                cursor-pointer
                "
        >
          <AiFillStepBackward className="text-white" size={30} />
        </div>
        <div
          onClick={handlePlay}
          className="
                h-10
                w-10
                flex
                items-center
                justify-center
                 rounded-full
                 bg-white
                 p-1
                cursor-pointer
                "
        >
          <Icon className="text-black" size={30} />
        </div>
        <div
          onClick={onPlayPrev}
          className="
                h-10
                w-10
                flex
                items-center
                justify-center
                 rounded-full
                 p-1
                cursor-pointer
                "
        >
          <AiFillStepForward className="text-white" size={30} />
        </div>
      </div>
      <div className="hidden md:flex w-full justify-end pr-2 items-center">
        <div className="flex items-center gap-x-2 w-[120px]">
            <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={34} />
            <CustomSlider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};
export default PlayerContent;
