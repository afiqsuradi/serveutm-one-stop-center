import ServiceImagesCarousel from "@/components/Gigs/ServiceImagesCarousel";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ROUTES from "@/constant/routes";
import useService from "@/hooks/Gigs/useService";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GigDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useService(id ? id : "");

  if (!data) return;
  return (
    <div className="container md:flex md:justify-between py-12 relative">
      <section className="md:w-[60%]">
        <div className="space-y-2 mb-6">
          <h1 className="text-3xl font-semibold">I will {data.title}</h1>
          <p>{data.category}</p>
          <div className="flex items-center">
            <Avatar className="w-[4rem] h-[4rem]">
              <AvatarImage
                src={data.owner?.profileImage}
                className="object-cover"
              />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
            <Separator orientation="vertical" className="mx-4 h-[3rem]" />
            <div className="flex flex-col justify-center">
              <h2
                className="hover:underline hover:cursor-pointer transition-all"
                onClick={() =>
                  navigate(
                    `${ROUTES.USER_PROFILE}?username=${data.owner?.username}`
                  )
                }
              >
                {data.owner?.name}
              </h2>
              <p>@{data.owner?.username}</p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <ServiceImagesCarousel showChild={true} images={data.images} />
        </div>
        <Separator className="my-6" />
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-xl underline">About Gig</h2>
            <p>{data.description}</p>
          </div>
          <div className="space-y-6">
            <h2 className="text-xl underline">
              Frequently Asked Question (FAQs)
            </h2>
            <div>
              <Accordion type="single" collapsible className="w-full">
                {data.faq.map((faq, idx) => {
                  return (
                    <AccordionItem value={faq.question} key={idx}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      <section className="md:w-[30%] md:sticky md:top-24 h-full">
        <Tabs
          defaultValue={data.pricePackage[0].title}
          className="md:w-[250px] lg:w-[400px]"
        >
          <TabsList className="grid grid-cols-3 h-auto">
            {data.pricePackage.map((pack) => {
              return (
                <TabsTrigger
                  key={pack.title}
                  value={pack.title}
                  className="break-all whitespace-normal"
                >
                  {pack.title}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {data.pricePackage.map((pack) => {
            return (
              <TabsContent value={pack.title} key={pack.title}>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <p>{pack.title}</p>
                      <p className="font-light text-lg">RM {pack.price}</p>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 break-words">
                    {pack.description}
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </section>
    </div>
  );
};

export default GigDetail;
