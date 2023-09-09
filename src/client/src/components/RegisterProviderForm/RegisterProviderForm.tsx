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
import { useEffect, useRef } from "react";
import LanguageTable from "./LanguageTable";
import SuccessOverlay from "./SuccessOverlay";
import useRegisterProvider from "../../hooks/Provider/useRegisterProvider";
import z from "zod";
import useProviderReducer, {
  ProviderInfoActionTypes,
} from "../../hooks/Provider/useProviderReducer";

const RegisterProviderForm = () => {
  const { success, error, register, setError, loading, setLoading } =
    useRegisterProvider();
  const toast = useToast();
  const { providerInfo, providerInfoDispatch } = useProviderReducer();
  const descriptionEl = useRef<HTMLTextAreaElement>(null);
  const personalWebsiteEl = useRef<HTMLInputElement>(null);

  const preRegisterProvider = async () => {
    setLoading(true);
    const desc = descriptionEl.current;
    // Validate Description
    if (!desc || desc?.value.length <= 30 || desc.value.length > 600) {
      throw new Error("Description must be 30-600 words long");
    }
    // Validate skills and language
    const invalidSkill = providerInfo.skills.find(
      (skill) => skill.name.length === 0
    );
    const invalidLanguage = providerInfo.language.find(
      (lang) => lang.name.length === 0
    );
    if (invalidSkill || invalidLanguage) {
      throw new Error("Atleast 1 skill and language required");
    }
    return await register(providerInfo);
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
  }, [error]);

  return (
    <>
      <SuccessOverlay isOpen={success} />
      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
        gap={20}
        maxW={"full"}
      >
        <FormLabel fontSize="xl">
          Description
          <Text color="red.500" display="inline" marginX={1}>
            *
          </Text>
        </FormLabel>
        <Textarea
          onBlur={(event) => {
            providerInfoDispatch({
              type: ProviderInfoActionTypes.SETDESCRIPTION,
              payload: event.currentTarget.value,
            });
          }}
          ref={descriptionEl}
          maxWidth={"full"}
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
        <SkillTable
          ProviderInfo={providerInfo}
          ProviderInfoDispatch={providerInfoDispatch}
        />
        <FormLabel fontSize="xl">
          Languages
          <Text color="red.500" display="inline" marginX={1}>
            *
          </Text>
        </FormLabel>
        <LanguageTable
          ProviderInfo={providerInfo}
          ProviderInfoDispatch={providerInfoDispatch}
        />
        <FormLabel>Personal Website</FormLabel>
        <Input
          onBlur={(event) => {
            // Validate url
            if (
              event.currentTarget.value &&
              event.currentTarget.value.length > 0
            ) {
              const urlSchema = z.string().url();
              const urlValidation = urlSchema.safeParse(
                event.currentTarget.value
              );
              if (!urlValidation.success) {
                return setError({
                  title: "Failed to register user",
                  description: "Invalid link provided",
                });
              }
              providerInfoDispatch({
                type: ProviderInfoActionTypes.SETWEBSITE,
                payload: urlValidation.data,
              });
            }
          }}
          ref={personalWebsiteEl}
          type="url"
          id="PersonalWebsite"
          name="PersonalWebsite"
          placeholder="https://www.afiq.com"
        />
        <Button
          gridColumnStart={{ sm: 2, base: 1 }}
          variant="base"
          maxW="10em"
          marginLeft="auto"
          isLoading={loading}
          onClick={() => {
            Promise.resolve(preRegisterProvider()).catch((error: Error) => {
              setLoading(false);
              setError({
                title: "Failed to register user",
                description: error.message,
              });
            });
          }}
        >
          Register
        </Button>
      </Grid>
    </>
  );
};

export default RegisterProviderForm;
