import afiq from "@/assets/teams/afiq.png";
import aliff from "@/assets/teams/aliff.jpg";
import danish from "@/assets/teams/danish.jpg";
import hazeem from "@/assets/teams/hazeem.jpg";
import irfan from "@/assets/teams/irfan.png";
import naza from "@/assets/teams/naza.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const teams = [
  {
    image: afiq,
    name: "Aiman Afiq",
    role: "Project Leader",
  },
  {
    image: irfan,
    name: "Irfan Afnan",
    role: "Documentation Leader",
  },
  {
    image: naza,
    name: "Muhammad Nazarudeen",
    role: "Programmer",
  },
  {
    image: aliff,
    name: "Aliff Imran",
    role: "Documentation",
  },
  {
    image: hazeem,
    name: "Muhammad Hazeem",
    role: "Documentation",
  },
  {
    image: danish,
    name: "Danish Danial",
    role: "Programmer",
  },
];

const TeamCard = () => {
  return (
    <div className="py-12">
      <div className="sm:max-w-[60%]">
        <h1 className="font-bold text-3xl text-foreground">Our team</h1>
        <p className="mt-6 text-foreground/80">
          Meet the dedicated and talented individuals who make up our
          exceptional team. Together, we strive to exceed expectations and drive
          success for our clients.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 mt-12">
        {teams.map((team) => (
          <div className="flex justify-center items-center flex-col">
            <Avatar className="w-[6rem] h-auto z-0">
              <AvatarImage src={team.image} className="object-cover" />
              <AvatarFallback>AVATAR</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg mt-6 text-foreground">
              {team.name}
            </h3>
            <p className="font-thin text-foreground">{team.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
