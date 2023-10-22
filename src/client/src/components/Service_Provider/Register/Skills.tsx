import { Button } from "@/components/ui/button";
import RegisterFormWrapper from "./RegisterFormWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { ProviderInfo, Skill, skillLevel } from "@/interface/Provider";
import { Input } from "@/components/ui/input";
import { providerSkillsRule } from "@/types/providerInfoDataRule";
import { ZodError } from "zod";

interface Props {
  skills: ProviderInfo["skills"];
  setProviderInfo: React.Dispatch<React.SetStateAction<ProviderInfo>>;
}

const Skills = ({ skills, setProviderInfo }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [level, setLevel] = useState<(typeof skillLevel)[number] | null>(null);
  const [skillName, setSkillName] = useState("");

  const onChangeLevel = (value: (typeof skillLevel)[number]) => {
    if (!skillLevel.includes(value))
      return setError("Please pick your skill level.");
    setLevel(value);
  };

  const onChangeName = (value: string) => {
    setSkillName(() => value);
  };

  const onSubmit = () => {
    setError("");
    if (!level) {
      return setError("Please select skill level");
    }
    addNewSkill({
      name: skillName,
      level: level,
    });
  };

  const addNewSkill = (value: Skill) => {
    setError("");
    const duplicate = skills.filter((skill) => skill.name === value.name);
    if (duplicate.length > 0) return setError("Skill name must be unique");
    try {
      providerSkillsRule.parse(value);
      setProviderInfo((prev) => {
        return { ...prev, skills: [...prev.skills, value] };
      });

      setError("");
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.issues[0].message);
      }
    }
  };

  const deleteSkill = (value: Skill) => {
    const newSkill = skills.filter((skill) => skill.name !== value.name);
    setProviderInfo((prev) => {
      return { ...prev, skills: newSkill };
    });
  };

  const editSkill = (value: Skill) => {
    setIsOpen(true);
    setLevel(value.level);
    setSkillName(value.name);
  };

  return (
    <RegisterFormWrapper title="Skills" key="skills">
      {isOpen ? (
        <div className="grid grid-cols-2 gap-6 mb-6 mt-6 md:mt-0">
          <Input
            type="text"
            placeholder="Skill Name"
            defaultValue={skillName}
            onChange={(e) => onChangeName(e.target.value)}
          />
          <Select
            onValueChange={onChangeLevel}
            defaultValue={level ? level : undefined}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Your Level" />
            </SelectTrigger>
            <SelectContent>
              {skillLevel.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        ""
      )}
      <div>
        <div className="border-b my-1">
          <ul className="grid grid-cols-[1fr_1fr_2fr] md:grid-cols-3 items-center text-sm font-medium text-muted-foreground">
            <li className="px-4">Skill</li>
            <li className="px-4">Level</li>
            <li className="py-2">
              <div className="flex justify-center gap-2">
                {isOpen ? (
                  <>
                    <Button className="w-[70px]" onClick={onSubmit}>
                      Save
                    </Button>
                    <Button
                      variant={"destructive"}
                      className="w-[70px]"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button className="w-[147px]" onClick={() => setIsOpen(true)}>
                    Add New
                  </Button>
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className="[&_ul:last-child]:border-0">
          {skills.map((skill) => {
            return (
              <ul
                key={skill.name}
                className="grid grid-cols-[1fr_1fr_2fr] md:grid-cols-3 text-sm font-medium py-2 hover:bg-muted/50 border-b"
              >
                <li className="font-medium px-4">{skill.name}</li>
                <li className="px-4">{skill.level}</li>
                <li>
                  <div className="flex justify-center gap-2">
                    <Button
                      className="w-[70px]"
                      onClick={() => {
                        editSkill(skill);
                        deleteSkill(skill);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="w-[70px]"
                      variant={"destructive"}
                      onClick={() => deleteSkill(skill)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
        <p className="text-destructive text-sm py-1">{error}</p>
      </div>
    </RegisterFormWrapper>
  );
};

export default Skills;
