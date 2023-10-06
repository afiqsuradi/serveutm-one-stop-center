import { ServiceType } from "../../../pages/Seller/AddGig";
import bgImage from "../../../assets/relax.svg";
import { Heading, Image, Text } from "@chakra-ui/react";
interface Props {
  serviceData: ServiceType | undefined;
}

const PublishGigs = ({ serviceData }: Props) => {
  return (
    <div className="border-2 max-w-[85%] mx-auto px-10">
      <div className="flex justify-center items-center flex-col py-20">
        <Image src={bgImage} className="w-[16rem]" />
        <Heading className="mt-10">You're almost there!</Heading>
        <Text className="my-4">
          Let’s publish your Gig and get you ready to start selling.
        </Text>
      </div>
    </div>
  );
};

export default PublishGigs;
