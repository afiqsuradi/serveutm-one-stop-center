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
import { Language, ProviderInfo, languageLevel } from "@/interface/Provider";
import { providerLanguageRule } from "@/types/providerInfoDataRule";
import { ZodError } from "zod";
import wikipediaLanguages from "@/constant/languages";

interface Props {
  languages: ProviderInfo["language"];
  setProviderInfo: React.Dispatch<React.SetStateAction<ProviderInfo>>;
}

const Languages = ({ languages, setProviderInfo }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [level, setLevel] = useState<(typeof languageLevel)[number] | null>(
    null
  );
  const [languageName, setLanguageName] = useState("");

  const onChangeLevel = (value: (typeof languageLevel)[number]) => {
    if (!languageLevel.includes(value))
      return setError("Please pick your skill level.");
    setLevel(value);
  };

  const onSubmit = () => {
    setError("");
    if (!(languageName.length > 0)) {
      return setError("Please a language");
    }
    if (!level) {
      return setError("Please select language level");
    }
    addNewSkill({
      name: languageName,
      level: level,
    });
  };

  const addNewSkill = (value: Language) => {
    setError("");
    const duplicate = languages.filter((lang) => lang.name === value.name);
    if (duplicate.length > 0) return setError("Language name must be unique");
    try {
      providerLanguageRule.parse(value);
      setProviderInfo((prev) => {
        return { ...prev, language: [...prev.language, value] };
      });

      setError("");
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.issues[0].message);
      }
    }
  };

  const deleteSkill = (value: Language) => {
    const newSkill = languages.filter((lang) => lang.name !== value.name);
    setProviderInfo((prev) => {
      return { ...prev, language: newSkill };
    });
  };

  const editSkill = (value: Language) => {
    setIsOpen(true);
    setLevel(value.level);
    setLanguageName(value.name);
  };
  return (
    <RegisterFormWrapper title="Languages" key="language">
      {isOpen ? (
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Select
            onValueChange={setLanguageName}
            defaultValue={languageName ? languageName : undefined}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Your Language" />
            </SelectTrigger>
            <SelectContent className="overflow-y-scroll max-h-[10rem]">
              {wikipediaLanguages.map((lang) => (
                <SelectItem key={lang.code} value={lang.name}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={onChangeLevel}
            defaultValue={level ? level : undefined}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Your Level" />
            </SelectTrigger>
            <SelectContent>
              {languageLevel.map((level) => (
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
            <TableHead>Language</TableHead>
            <TableHead>Level</TableHead>
            <TableHead className="py-2 md:space-x-2 space-y-2 md:space-y-0">
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
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {languages.map((skill) => {
            return (
              <TableRow key={skill.name}>
                <TableCell className="font-medium">{skill.name}</TableCell>
                <TableCell>{skill.level}</TableCell>
                <TableCell className="md:space-x-2 space-y-2 md:space-y-0">
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </RegisterFormWrapper>
  );
};

export default Languages;
