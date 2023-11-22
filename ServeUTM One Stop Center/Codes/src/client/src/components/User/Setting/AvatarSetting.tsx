import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import useUpdateAvatar from "@/hooks/User/useUpdateAvatar";
import Spinner from "@/components/ui/spinner";

interface Props {
  profileImage: string;
}

const AvatarSetting = ({ profileImage }: Props) => {
  const { update, isLoading, error: uploadErr } = useUpdateAvatar();
  const imageInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const files = event.target.files;
    try {
      if (!files) {
        throw new Error("No file selected.");
      }
      const file = files[0];
      const maxSize = 4 * 1024 * 1024; // 5 MB

      if (files.length < 1) {
        throw new Error("No file selected.");
      }

      if (files.length > 1) {
        throw new Error("Only one file can be uploaded.");
      }

      if (file.size > maxSize) {
        throw new Error(
          `File size exceeds the maximum allowed limit. (${
            maxSize / 1024 / 1024
          } MB)`
        );
      }

      const data = new FormData();
      data.append("image", file);
      update(data);
    } catch (error) {
      // Handle the error here, e.g., display an error message
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    setError(uploadErr);
  }, [uploadErr]);

  return (
    <div className="mt-6 md:mt-0 space-y-6">
      {error.length > 0 ? (
        <Alert className="text-start" variant={"destructive"}>
          <FaExclamation />
          <AlertTitle>Upload Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        ""
      )}
      <div className="flex flex-col lg:flex-row gap-6 p-6 border">
        <Avatar className="w-[4rem] h-[4rem] mx-auto">
          <AvatarImage src={profileImage} className="object-cover" />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-lg font-semibold">Upload a new photo</h1>
          <p className="">Larger image will be resized automatically.</p>
        </div>
        <div className="my-auto">
          <input
            ref={imageInput}
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
          <Button
            className="w-[10rem]"
            onClick={() => {
              if (imageInput.current) {
                imageInput.current.click();
              }
            }}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSetting;
