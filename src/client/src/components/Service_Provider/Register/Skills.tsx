import { Button } from "@/components/ui/button";
import RegisterFormWrapper from "./RegisterFormWrapper";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <div className="grid grid-cols-2 gap-6 mb-6">
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
      <Table>
        <TableCaption className="text-destructive">{error}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Skill</TableHead>
            <TableHead>Level</TableHead>
            <TableHead className="py-2">
              <div className="flex justify-end gap-2">
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
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((skill) => {
            return (
              <TableRow key={skill.name}>
                <TableCell className="font-medium">{skill.name}</TableCell>
                <TableCell>{skill.level}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </RegisterFormWrapper>
  );
};

export default Skills;
