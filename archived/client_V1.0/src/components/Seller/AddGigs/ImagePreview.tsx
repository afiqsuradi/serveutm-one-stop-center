import { Button, Image } from "@chakra-ui/react";

interface Props {
  id: number;
  url: string;
  handleClick: (id: number) => void;
}

const ImagePreview = ({ url, handleClick, id }: Props) => {
  return (
    <div className="relative">
      <Image src={url} className="aspect-video w-full" />
      <div className="min-w-full flex justify-center items-center py-4">
        <Button
          variant="danger"
          className="w-[6rem]"
          onClick={() => handleClick(id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;
