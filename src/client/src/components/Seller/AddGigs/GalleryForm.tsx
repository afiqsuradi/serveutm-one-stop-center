import { Box, Input, Text, useToast } from "@chakra-ui/react";
import AddGigWrapper from "../AddGigWrapper";
import { BsFillImageFill } from "react-icons/bs";
import { ServiceType } from "../../../pages/Seller/AddGig";
import { useEffect, useRef, useState } from "react";
import ImagePreview from "./ImagePreview";

interface Props {
  serviceData: ServiceType | undefined;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const createPreview = (files: FileList) => {
  return Array.from(files).map((file) => {
    return URL.createObjectURL(file);
  });
};

const fillImagesPrev = (images: string[], newImages: string[]) => {
  let count = 0;
  return images.map((img) => {
    if (!(img.length > 0)) {
      count++;
      if (newImages[count - 1]) {
        return newImages[count - 1];
      }
      return img;
    } else {
      return img;
    }
  });
};

const GalleryForm = ({ serviceData, setServiceData }: Props) => {
  const toast = useToast();
  const [error, setError] = useState("");
  const [selectedImagesPrev, setSelectedImagesPrev] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const imageRefs = useRef<HTMLInputElement>(null);

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const occupiedLink = selectedImagesPrev.filter((img) => {
      return img !== "";
    });
    if (!selectedFiles) return;
    if (selectedFiles.length > 3 - occupiedLink.length)
      return setError("You can only upload up to 3 images");
    const imagesArray = createPreview(selectedFiles);
    const newSelectedImagesPrev = fillImagesPrev(
      selectedImagesPrev,
      imagesArray
    );
    setSelectedImagesPrev((_) => newSelectedImagesPrev);
  };
  const triggerInput = () => {
    if (imageRefs.current) {
      imageRefs.current.click();
    }
  };

  const deleteFile = (id: number) => {
    const updatedImages = selectedImagesPrev.map((img, i) => {
      if (i == id) {
        return "";
      } else {
        return img;
      }
    });
    URL.revokeObjectURL(selectedImagesPrev[id]);
    setSelectedImagesPrev(updatedImages);
  };

  useEffect(() => {
    if (selectedImagesPrev) {
      const images = selectedImagesPrev.filter((img) => img.length > 0);
      if (images && images.length > 0) {
        setServiceData((prev) => {
          return { ...prev, images: images };
        });
      }
    }
  }, [selectedImagesPrev]);

  useEffect(() => {
    if (serviceData) {
      const data = serviceData.images.filter((img) => img.length > 0);
      if (data.length > 0) {
        if (data.length !== 3) {
          for (let index = data.length; index < 3; index++) {
            data.push("");
          }
        }
        setSelectedImagesPrev(data);
      }
    }
  }, []);

  useEffect(() => {
    if (error.length > 0) {
      if (error) {
        toast({
          title: `${error}`,
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
    }
    setError("");
  }, [error]);

  return (
    <AddGigWrapper title="Gallery">
      <Text>Upload image for your gig's thumbnail</Text>
      <Box className="md:col-span-2 my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-w-full justify-between">
        <Input
          ref={imageRefs}
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          hidden
          multiple
        />
        {selectedImagesPrev.map((img, i) => {
          if (img.length === 0) {
            return (
              <Box
                key={i}
                className="border-2 p-8 flex flex-col justify-center items-center text-center aspect-video flex-1"
              >
                <BsFillImageFill className="text-[4rem] opacity-40" />
                <Text>
                  <span
                    className="block text-[#bb76f3] underline hover:text-[#9469e4] hover:cursor-pointer"
                    onClick={() => {
                      triggerInput();
                    }}
                  >
                    Click here
                  </span>
                  to upload your photo
                </Text>
              </Box>
            );
          } else {
            return (
              <ImagePreview key={i} url={img} handleClick={deleteFile} id={i} />
            );
          }
        })}
      </Box>
    </AddGigWrapper>
  );
};

export default GalleryForm;
