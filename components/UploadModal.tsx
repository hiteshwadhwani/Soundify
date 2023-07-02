import useUploadModal from "@/app/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { useContext, useState } from "react";
import Button from "./Button";
import { UserContext } from "@/app/hooks/useUser";
import { toast } from "react-hot-toast";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { error } from "console";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const { isOpen, onOpen, onClose } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(UserContext);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const onChange = (open: boolean) => {
    if (!open) {
      return onClose();
    }
  };

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !context?.user) {
        setIsLoading(false);
        return toast.error("Missing Fields");
      }

      const uniqueID = uniqid();

      //upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Not able to upload song");
      }
      //upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Not able to upload image");
      }

      // create a record
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: context.user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song uploaded");
      reset();
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Upload Song"
      description="Upload your favourite songs"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          type="text"
          disabled={isLoading}
          placeholder="Song Title"
          {...register("title", { required: true })}
        />
        <Input
          id="author"
          type="text"
          disabled={isLoading}
          placeholder="Author Name"
          {...register("author", { required: true })}
        />
        <div>
          <div>Select a song</div>
          <div>
            <Input
              type="file"
              placeholder="file"
              disabled={isLoading}
              accept=".mp3"
              id="song"
              {...register("song", { required: true })}
            />
          </div>
        </div>
        <div>
          <div>Select an image</div>
          <div>
            <Input
              id="image"
              type="file"
              placeholder="image"
              disabled={isLoading}
              {...register("image", { required: true })}
              accept="image/*"
            />
          </div>
        </div>
        <Button disabled={isLoading} type="submit">
          create
        </Button>
      </form>
    </Modal>
  );
};
export default UploadModal;
