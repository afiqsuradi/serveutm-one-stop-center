import AddGigFormWrapper from "@/components/Gigs/AddGig/AddGigFormWrapper";
import { useGig } from "@/hooks/Gigs/useGig";
import { BsFillImageFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";
import ImagePreview from "./ImagePreview";
const MAX_IMAGES_SIZE = 3;
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 5 MB
const Gallery = () => {
  const [error, setError] = useState("");
  const { service, setService } = useGig();
  const imageRefs = useRef<HTMLInputElement>(null);

  const resizeArr = (arr: string[], size: number) => {
    const updatedImages = arr.slice(0, size).map((item) => item || "");
    while (updatedImages.length < MAX_IMAGES_SIZE) {
      updatedImages.push("");
    }
    return updatedImages;
  };

  const createPreview = (file: File) => {
    return URL.createObjectURL(file);
  };

  const deletePreview = (blobUrl: string) => {
    return URL.revokeObjectURL(blobUrl);
  };

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const occupiedImage = service.images.filter((img) => img.length > 0);
    const files = event.target.files;
    try {
      if (!files) throw new Error("No file selected.");

      if (files.length < 1) throw new Error("No file selected.");

      if (files.length > MAX_IMAGES_SIZE)
        throw new Error(`Only ${MAX_IMAGES_SIZE} file can be uploaded.`);
      if (files.length > service.images.length - occupiedImage.length) {
        throw new Error(
          `Only ${
            service.images.length - occupiedImage.length
          } more file can be uploaded.`
        );
      }
      const updatedFileList: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size <= MAX_FILE_SIZE) {
          updatedFileList.push(file);
        } else {
          throw new Error(
            `One of your file exceed the maximum allowed filesize ( ${
              MAX_FILE_SIZE / 1024 / 1024
            } MB)`
          );
        }
      }

      const blobUrls: string[] = updatedFileList
        .map((file) => createPreview(file))
        .concat(occupiedImage);
      if (blobUrls.length < 3) {
        const final = resizeArr(blobUrls, MAX_IMAGES_SIZE);
        return setService((prev) => {
          return { ...prev, images: final };
        });
      }
      return setService((prev) => {
        return { ...prev, images: blobUrls };
      });
      console.info(blobUrls);
    } catch (error) {
      // Handle the error here, e.g., display an error message
      setError((error as Error).message);
    }
  };

  const onDelete = (id: number) => {
    const newImages = service.images.map((img, idx) => (idx === id ? "" : img));
    deletePreview(service.images[id]);
    setService((prev) => {
      return { ...prev, images: newImages };
    });
  };

  //   Trim data
  useEffect(() => {
    if (service.images.length < 3) {
      const updatedImages = resizeArr(service.images, MAX_IMAGES_SIZE);

      setService({ ...service, images: updatedImages });
    }
  }, [service.images]);

  useEffect;

  return (
    <AddGigFormWrapper title="Gallery">
      <div className="col-start-1 col-span-2">
        {error && (
          <Alert className="text-start" variant={"destructive"}>
            <FaExclamation />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <div className="col-start-1 col-span-2 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <input
          ref={imageRefs}
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          hidden
          multiple
        />
        {service.images.map((image, idx) => {
          if (!(image.length > 0)) {
            return (
              <div
                key={idx}
                className="border-2 p-8 flex flex-col justify-center items-center text-center aspect-video flex-1"
              >
                <BsFillImageFill className="text-[4rem] opacity-40" />
                <h2>
                  <span
                    className="block text-success hover:text-success/70 underline hover:cursor-pointer"
                    onClick={() => {
                      if (imageRefs.current) {
                        imageRefs.current.click();
                      }
                    }}
                  >
                    Click here
                  </span>
                  to upload your photo
                </h2>
              </div>
            );
          } else {
            return (
              <ImagePreview
                url={image}
                handleClick={onDelete}
                id={idx}
                key={idx}
              />
            );
          }
        })}
      </div>
    </AddGigFormWrapper>
  );
};

export default Gallery;
