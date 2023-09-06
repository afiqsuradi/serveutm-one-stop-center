import {
  Box,
  Button,
  FormLabel,
  Text,
  Grid,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import SkillTable from "../RegisterProviderForm/SkillTable";
import { useEffect, useRef, useState } from "react";
import useUserProfile, {
  Skill,
  Language,
  UserProfile,
} from "../../hooks/useUserProfile";
import LanguageTable from "../RegisterProviderForm/LanguageTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError } from "axios";
import { ErrorData } from "../../hooks/useLogin";

interface Props {
  username: string;
}

const ServiceProfileSetting = ({ username }: Props) => {
  const privateApiClient = useAxiosPrivate();
  const toast = useToast();
  const { data } = useUserProfile(username);
  const [profile, setProfile] = useState<UserProfile>(data);
  const [skills, setSkills] = useState<Skill[]>(data.skills);
  const [language, setLanguages] = useState<Language[]>(data.language);
  const descriptionEl = useRef<HTMLTextAreaElement>(null);
  const personalWebsiteEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProfile({ ...profile, skills, language });
  }, [skills, language]);

  useEffect(() => {
    setProfile(data);
    setSkills(data.skills);
    setLanguages(data.language);
    if (data.description && descriptionEl.current) {
      descriptionEl.current.value = data.description;
    }
    if (data.PersonalWebsite && personalWebsiteEl.current) {
      personalWebsiteEl.current.value = data.PersonalWebsite;
    }
  }, [data]);

  const updateSellerInfo = () => {
    console.log("send req", profile);
    privateApiClient
      .put("/api/service-provider", JSON.stringify(profile), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(() => {
        toast({
          title: "Profile Updated.",
          description: "Your profile has been successfully updated.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        if ((error as AxiosError<ErrorData>).response) {
          toast({
            title: "Something went wrong",
            description: (error as AxiosError<ErrorData>).response?.data
              .message as string,
            status: "error",
            isClosable: true,
          });
        }
      });
  };

  return (
    <Box className="flex items-center">
      <form className="min-w-full">
        <Grid
          templateColumns={{
            sm: "1fr",
            md: "1fr 2fr",
          }}
          templateRows={{ md: "1fr", sm: "repeat(2, 1fr)" }}
          gap={8}
        >
          <FormLabel fontSize="xl" flex={1}>
            Description
            <Text color="red.500" display="inline" marginX={1}>
              *
            </Text>
          </FormLabel>
          <Textarea
            ref={descriptionEl}
            onBlur={() => {
              if (descriptionEl.current) {
                setProfile({
                  ...profile,
                  description: descriptionEl.current.value,
                });
              }
            }}
            flex={2}
            name="description"
            maxLength={600}
            resize="vertical"
            placeholder="Share a bit about your work experience, cool projects you've completed, and your area of expertise."
          />
          <Box>
            <FormLabel fontSize="l" flex={1} margin={0}>
              Skills
              <Text color="red.500" display="inline" marginX={1}>
                *
              </Text>
            </FormLabel>
            <Text color="GrayText">Required</Text>
          </Box>
          <SkillTable skills={profile.skills} setSkills={setSkills} />
          <FormLabel fontSize="l" flex={1}>
            Languages
            <Text color="red.500" display="inline" marginX={1}>
              *
            </Text>
          </FormLabel>
          <LanguageTable
            languages={profile.language}
            setLanguages={setLanguages}
          />
          <FormLabel fontSize="l" flex={1}>
            Personal Website
          </FormLabel>
          <Input
            onBlur={() => {
              setProfile({
                ...profile,
                PersonalWebsite: personalWebsiteEl.current?.value,
              });
            }}
            ref={personalWebsiteEl}
            type="url"
            id="PersonalWebsite"
            name="PersonalWebsite"
            placeholder="https://www.afiq.com"
          />
          <Button
            gridColumnStart={2}
            variant="base"
            maxW="10em"
            marginLeft="auto"
            onClick={() => {
              updateSellerInfo();
            }}
          >
            Update
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default ServiceProfileSetting;
