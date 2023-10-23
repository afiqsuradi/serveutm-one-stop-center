import { ServiceType } from "@/interface/Service";
import { GigTitleRule } from "@/types/GigRule";

const validator = {
  title: (title: string) => {
    GigTitleRule.parse(title);
  },
  category: (category: ServiceType["category"]) => {
    if (category === "") throw new Error("Please pick atleast 1 category");
  },
  pricePackage: (packages: ServiceType["pricePackage"]) => {
    const invalidPackage = packages.filter((pack) => pack.title.length === 0);
    if (invalidPackage.length > 0 || !(packages.length > 0))
      throw new Error("You should add atleast 1 price pack");
  },
  description: (desc: string) => {
    if (!(desc.length >= 100 && desc.length <= 500)) {
      throw new Error("Description should be 100 - 500 characters.");
    }
  },
  faq: (faq: ServiceType["faq"]) => {
    if (!(faq.length > 0)) {
      throw new Error("Atleast 1 faq is needed");
    }
  },
  images: (images: ServiceType["images"]) => {
    if (images.length === 0) throw new Error("Please upload atleast 1 image");
    if (images.length > 3) throw new Error("Maximum 3 images is allowed");
  },
};

export const validate = [
  (data: ServiceType) => {
    validator.title(data.title);
    validator.category(data.category);
    validator.pricePackage(data.pricePackage);
  },
  (data: ServiceType) => {
    validator.description(data.description);
    validator.faq(data.faq);
  },
  (data: ServiceType) => {
    validator.images(data.images);
  },
];
