import {
  Box,
  Button,
  FormLabel,
  Text,
  Grid,
  Input,
  Textarea,
} from "@chakra-ui/react";
import SkillTable from "../RegisterProviderForm/SkillTable";
import { useEffect, useRef } from "react";
import useUserProfile from "../../hooks/useUserProfile";
import LanguageTable from "../RegisterProviderForm/LanguageTable";
import { useSeller } from "../../hooks/useSeller";
import { ProviderInfoActionTypes } from "../../interface/ProviderInfoReducer";
import z from "zod";
import useUpdateProvider from "../../hooks/Provider/useUpdateProvider";

interface Props {
  username: string;
}

const ServiceProfileSetting = ({ username }: Props) => {
  const { ProviderInfo, ProviderInfoDispatch } = useSeller();
  const { update, isLoading, setIsLoading, setNotification } =
    useUpdateProvider();
  const { data } = useUserProfile(username);
  const descriptionEl = useRef<HTMLTextAreaElement>(null);
  const personalWebsiteEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data) {
      ProviderInfoDispatch({
        type: ProviderInfoActionTypes.SETINITIAL,
        payload: data,
      });
    }
  }, [data]);

  const preUpdateSellerInfo = async () => {
    setIsLoading(true);
    const desc = descriptionEl.current;
    // Validate Description
    if (!desc || desc?.value.length <= 30 || desc.value.length > 600) {
      throw new Error("Description must be 30-600 words long");
    }
    // Validate skills and language
    const invalidSkill = ProviderInfo.skills.find(
      (skill) => skill.name.length === 0
    );
    const invalidLanguage = ProviderInfo.language.find(
      (lang) => lang.name.length === 0
    );
    if (invalidSkill || invalidLanguage) {
      throw new Error("Atleast 1 skill and language required");
    }
    return await update(ProviderInfo);
  };

  return (
    <Box className="flex items-center">
      <form className="min-w-full">
        <Grid
          templateColumns={{ base: "1fr", sm: "1fr 2fr" }}
          gap={20}
          maxW={"full"}
        >
          <Box>
            <FormLabel fontSize="xl" flex={1} margin={0}>
              Description
              <Text color="red.500" display="inline" marginX={1}>
                *
              </Text>
            </FormLabel>
            <Text color="GrayText">Required</Text>
          </Box>
          <Textarea
            onBlur={(event) => {
              ProviderInfoDispatch({
                type: ProviderInfoActionTypes.SETDESCRIPTION,
                payload: event.currentTarget.value,
              });
            }}
            defaultValue={ProviderInfo.description}
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
            ProviderInfo={ProviderInfo}
            ProviderInfoDispatch={ProviderInfoDispatch}
          />
          <Box>
            <FormLabel fontSize="xl" flex={1} margin={0}>
              Languages
              <Text color="red.500" display="inline" marginX={1}>
                *
              </Text>
            </FormLabel>
            <Text color="GrayText">Required</Text>
          </Box>
          <LanguageTable
            ProviderInfo={ProviderInfo}
            ProviderInfoDispatch={ProviderInfoDispatch}
          />
          <FormLabel fontSize="xl">Personal Website</FormLabel>
          <Input
            defaultValue={ProviderInfo.PersonalWebsite || ""}
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
                  return setNotification({
                    title: "Failed to register user",
                    status: "error",
                    description: "Invalid link provided",
                  });
                }
                ProviderInfoDispatch({
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
            isLoading={isLoading}
            onClick={() => {
              Promise.resolve(preUpdateSellerInfo()).catch((error: Error) => {
                setIsLoading(false);
                setNotification({
                  title: "Failed to register user",
                  status: "error",
                  description: error.message,
                });
              });
            }}
          >
            Register
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default ServiceProfileSetting;
