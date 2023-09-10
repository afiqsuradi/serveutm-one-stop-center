import {
  Box,
  Button,
  IconButton,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { Dispatch, useEffect, useRef, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import wikipediaLanguages from "../../constants/languages";
import { UserProfile, languageLevel } from "../../interface/ProviderInfo";
import {
  ProviderInfoAction,
  ProviderInfoActionTypes,
} from "../../interface/ProviderInfoReducer";

interface Props {
  ProviderInfo: UserProfile;
  ProviderInfoDispatch: Dispatch<ProviderInfoAction>;
}

const LanguageTable = ({ ProviderInfo, ProviderInfoDispatch }: Props) => {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const [error, setError] = useState("");
  const langName = useRef<HTMLSelectElement>(null);
  const levelName = useRef<HTMLSelectElement>(null);

  const addNewLanguage = () => {
    if (langName.current?.value && levelName.current?.value) {
      const name = langName.current?.value || "";
      const level = levelName.current?.value;
      const exist = ProviderInfo.language.find((lang) => lang.name === name);
      if (!exist) {
        const newLevel =
          languageLevel.find((lev) => lev === level) || languageLevel[0];

        //Find dupe
        const dupe = ProviderInfo.language.find((lang) => lang.name === name);
        if (dupe === undefined) {
          //fix language input
          const newLang = ProviderInfo.language.filter(
            (lang) => lang.name.length > 0
          );
          newLang.push({ name, level: newLevel });
          ProviderInfoDispatch({
            type: ProviderInfoActionTypes.SETLANGUAGES,
            payload: newLang,
          });
        } else {
          return setError("Language already added");
        }
      }
    }
  };
  useEffect(() => {
    if (!(error.length === 0)) {
      toast({
        title: "Invalid Skill Name",
        description: `${error}`,
        status: "error",
        isClosable: true,
      });
      setError("");
    }
  }, [error]);
  return (
    <Box overflowX="scroll" whiteSpace="nowrap">
      {!open ? (
        ""
      ) : (
        <Box
          display="flex"
          justifyContent="space-between"
          gap={3}
          paddingY="3"
          maxW={"full"}
        >
          <Select ref={langName}>
            {wikipediaLanguages.map((language) => {
              return (
                <option key={language.code} value={language.name}>
                  {language.name}
                </option>
              );
            })}
          </Select>
          <Select ref={levelName}>
            {languageLevel.map((level) => {
              return (
                <option key={level} value={level}>
                  {level}
                </option>
              );
            })}
          </Select>
        </Box>
      )}
      <TableContainer>
        <Table variant="striped" size="lg" border="1px solid gray">
          <Thead>
            <Tr display="flex" alignItems="center">
              <Th flex={1} p={{ base: "0.4em", sm: "1.5rem" }}>
                Language
              </Th>
              <Th flex={1} p={{ base: "0.4em", sm: "1.5rem" }}>
                Level
              </Th>
              <Th
                display="flex"
                justifyContent="space-around"
                flexDirection={{ base: "column", sm: "row" }}
                flex={1}
                p={{ sm: "0.4em", base: "1rem" }}
              >
                {!open ? (
                  <Button
                    variant="base"
                    minW="10em"
                    marginRight="auto"
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    Add New
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="base"
                      minW="35%"
                      onClick={() => {
                        addNewLanguage();
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      minW="35%"
                      variant="danger"
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {ProviderInfo.language.map((language) => {
              if (!(language.name.length > 0)) return "";
              return (
                <Tr display="flex" alignItems="center">
                  <Td flex={1} p={{ base: "0.4em", sm: "1.5rem" }}>
                    {language.name}
                  </Td>
                  <Td flex={1} p={{ base: "0.4em", sm: "1.5rem" }}>
                    {language.level}
                  </Td>
                  <Td
                    p={{ base: "0.4em", sm: "1.5rem" }}
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    flexDirection={{ base: "column", sm: "row" }}
                    gap={{ base: "0.5em", sm: "4em" }}
                  >
                    <IconButton
                      variant="base"
                      aria-label="Edit"
                      onClick={() => {
                        const languageNameEl = langName.current;
                        const levelNameEl = levelName.current;

                        if (languageNameEl && levelNameEl) {
                          languageNameEl.value = language.name;
                          levelNameEl.value = language.level;
                        }
                      }}
                      icon={<MdEdit />}
                    />
                    <IconButton
                      variant="danger"
                      aria-label="Delete"
                      onClick={() => {
                        const newLanguage = ProviderInfo.language.filter(
                          (lang) => {
                            return lang.name !== language.name;
                          }
                        );
                        ProviderInfoDispatch({
                          type: ProviderInfoActionTypes.SETLANGUAGES,
                          payload: newLanguage,
                        });
                      }}
                      icon={<MdDelete />}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LanguageTable;
