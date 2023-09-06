import {
  Box,
  Button,
  FormLabel,
  Grid,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import SkillTable from "./SkillTable";
import { useEffect, useRef, useState } from "react";
import LanguageTable from "./LanguageTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError } from "axios";
import { ErrorData } from "../../hooks/useLogin";
import SuccessOverlay from "./SuccessOverlay";
import { Skill, Language } from "../../hooks/useUserProfile";

interface ProviderFormError {
  title: string;
  description: string;
}

const RegisterProviderForm = () => {
  const privateApiClient = useAxiosPrivate();
  const toast = useToast();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<ProviderFormError>();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const descriptionEl = useRef<HTMLTextAreaElement>(null);
  const personalWebsiteEl = useRef<HTMLInputElement>(null);

  const registerProvider = () => {
    setLoading(true);
    const desc = descriptionEl.current;
    const web = personalWebsiteEl.current;
    if (!desc || desc?.value.length <= 30 || desc.value.length > 600)
      return setError({
        title: "Failed to register user",
        description: "Description must be 30-600 words long",
      });
    if (skills.length === 0 || languages.length === 0) {
      return setError({
        title: "Failed to register user",
        description: "Atleast 1 skill and language required",
      });
    }

    privateApiClient
      .post(
        "/api/service-provider/register",
        JSON.stringify({
          language: languages,
          skills: skills,
          description: desc.value,
          PersonalWebsite: web?.value,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(() => setSuccess(true))
      .catch((error) => {
        if ((error as AxiosError<ErrorData>).response) {
          return setError({
            title: "Something went wrong",
            description: (error as AxiosError<ErrorData>).response?.data
              .message as string,
          });
        }
        return setError({
          title: "Network Error",
          description: "Couldn't connect to the server",
        });
      });
  };

  useEffect(() => {
    if (error?.title && error.description) {
      toast({
        title: error.title,
        description: error.description,
        status: "error",
        isClosable: true,
      });
      setError({ title: "", description: "" });
    }
  }, [error, toast]);

  return (
    <>
      <SuccessOverlay isOpen={success} />
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
          flex={2}
          name="description"
          maxLength={600}
          resize="vertical"
          placeholder="Share a bit about your work experience, cool projects you've completed, and your area of expertise."
        />
        <Box>
          <FormLabel fontSize="xl" flex={1} margin={0}>
            Skills
            <Text color="red.500" display="inline" marginX={1}>
              *
            </Text>
          </FormLabel>
          <Text color="GrayText">Required</Text>
        </Box>
        <SkillTable skills={skills} setSkills={setSkills} />
        <FormLabel fontSize="xl" flex={1}>
          Languages
          <Text color="red.500" display="inline" marginX={1}>
            *
          </Text>
        </FormLabel>
        <LanguageTable languages={languages} setLanguages={setLanguages} />
        <FormLabel>Personal Website</FormLabel>
        <Input
          ref={personalWebsiteEl}
          type="url"
          id="PersonalWebsite"
          name="PersonalWebsite"
          placeholder="https://www.afiq.com"
        />
        <Button
          disabled={!loading}
          gridColumnStart={2}
          variant="base"
          maxW="10em"
          marginLeft="auto"
          onClick={() => {
            registerProvider();
          }}
        >
          Register
        </Button>
      </Grid>
    </>
  );
};

export default RegisterProviderForm;
