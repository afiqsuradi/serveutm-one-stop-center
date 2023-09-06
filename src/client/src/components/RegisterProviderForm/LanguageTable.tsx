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
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import wikipediaLanguages from "../../constants/languages";
import { Language, languageLevel } from "../../hooks/useUserProfile";

interface Props {
  languages: Language[];
  setLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
}

const LanguageTable = ({ languages, setLanguages }: Props) => {
  const langName = useRef<HTMLSelectElement>(null);
  const levelName = useRef<HTMLSelectElement>(null);

  const addNewLanguage = () => {
    if (langName.current?.value && levelName.current?.value) {
      const name = langName.current?.value;
      const level = levelName.current?.value;
      setLanguages(
        (prevLangs: Language[]) => [...prevLangs, { name, level }] as Language[]
      );
    }
  };
  const [open, setOpen] = useState(false);
  return (
    <Box>
      {!open ? (
        ""
      ) : (
        <Box display="flex" justifyContent="space-between" gap={3} paddingY="3">
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
      <TableContainer flex={2}>
        <Table variant="striped" size="lg" border="1px solid gray">
          <Thead>
            <Tr display="flex" alignItems="center">
              <Th flex={1}>Language</Th>
              <Th flex={1}>Level</Th>
              <Th display="flex" justifyContent="space-around" flex={1}>
                {!open ? (
                  <Button
                    variant="base"
                    minW="80%"
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
            {languages.map((language) => {
              return (
                <Tr display="flex" alignItems="center">
                  <Td flex={1}>{language.name}</Td>
                  <Td flex={1}>{language.level}</Td>
                  <Td flex={1} display="flex" justifyContent="center" gap="4em">
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
                        setLanguages((prevLangs: Language[]) => {
                          return prevLangs.filter(
                            (langData) => !(langData.name === language.name)
                          );
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
