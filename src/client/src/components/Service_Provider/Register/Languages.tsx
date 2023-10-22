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
        <div className="grid grid-cols-2 gap-6 mb-6 mt-6 md:mt-0">
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
      <div>
        <div className="border-b my-1">
          <ul className="grid grid-cols-[1fr_1fr_2fr] md:grid-cols-3 items-center text-sm font-medium text-muted-foreground">
            <li className="px-4">Language</li>
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
          {languages.map((skill) => {
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

export default Languages;
