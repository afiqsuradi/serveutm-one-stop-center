import useGetProvider from "@/hooks/Service_Provider/useGetProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface Props {
  username: string;
}

const ProviderInfo = ({ username }: Props) => {
  const { data, isLoading } = useGetProvider(username);
  if (!data || isLoading) {
    return;
  }
  return (
    <Card className="w-full h-max md:w-[350px]">
      <CardContent>
        <article>
          <h3 className="font-bold py-4">Description</h3>
          <p className="font-light text-sm text-foreground/80">
            {data.description}
          </p>
        </article>
        <Separator className="mt-4" />
        <article>
          <h3 className="font-bold py-4">Languages</h3>
          <div className="font-light text-sm text-foreground/80 grid grid-cols-[1fr_4px_1fr] gap-2 w-fit">
            {data.language.map((lang, idx) => {
              return (
                <>
                  <p
                    className="text-background-foreground font-semibold"
                    key={`${idx}_1`}
                  >
                    {lang.name}
                  </p>
                  <p key={`${idx}_2`}>-</p>
                  <p className="text-background-foreground/80" key={`${idx}_3`}>
                    {lang.level}
                  </p>
                </>
              );
            })}
          </div>
        </article>
        <Separator className="mt-4" />
        <article>
          <h3 className="font-bold py-4">Skills</h3>
          <div className="font-light text-sm text-foreground/80 grid grid-cols-[1fr_4px_1fr] gap-2 w-fit">
            <div className="grid gap-4 grid-flow-col auto-cols-max">
              {data.skills.map((skill, idx) => {
                return (
                  <TooltipProvider key={idx}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button className="min-w-[5rem] max-w-[10rem]">
                          {skill.name}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{skill.level}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          </div>
        </article>
        {data.PersonalWebsite ? (
          <>
            <Separator className="mt-4" />
            <article>
              <h3 className="font-bold py-4">Personal Website</h3>
              <a
                href={data.PersonalWebsite}
                className="font-light text-sm text-foreground/80 hover:cursor-pointer hover:underline"
              >
                {data.PersonalWebsite}
              </a>
            </article>
          </>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
};

export default ProviderInfo;
