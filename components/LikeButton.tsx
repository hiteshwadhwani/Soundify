"use client";

import useAuthModal from "@/app/hooks/useAuth";
import { UserContext } from "@/app/hooks/useUser";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface LikeButton {
  songId: string;
}

const LikeButton: React.FC<LikeButton> = ({ songId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const user = useContext(UserContext)?.user;
  const supabaseClient = useSessionContext().supabaseClient;
  const router = useRouter();
  const useAuth = useAuthModal();

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [songId, user?.id, supabaseClient]);

  const handleLike = async () => {
    if (!user) {
      return useAuth.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    //   router.refresh();
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
      }
    //   router.refresh();
    }
  };

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <button>
      <Icon
        onClick={handleLike}
        size={25}
        color={isLiked ? "22cc5e" : "white"}
      />
    </button>
  );
};
export default LikeButton;
