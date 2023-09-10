import {
  Box,
  Button,
  IconButton,
  Input,
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
import { UserProfile, skillLevel } from "../../interface/ProviderInfo";
import {
  ProviderInfoAction,
  ProviderInfoActionTypes,
} from "../../interface/ProviderInfoReducer";

interface Props {
  ProviderInfo: UserProfile;
  ProviderInfoDispatch: Dispatch<ProviderInfoAction>;
}

const SkillTable = ({ ProviderInfo, ProviderInfoDispatch }: Props) => {
  const [error, setError] = useState("");
  const toast = useToast();
  const skillName = useRef<HTMLInputElement>(null);
  const levelName = useRef<HTMLSelectElement>(null);

  const addNewSkill = () => {
    if (skillName.current?.value && levelName.current?.value) {
      const name = skillName.current?.value;
      const level =
        skillLevel.find((lev) => lev === levelName.current?.value) ||
        skillLevel[0];
      if (!(name.length >= 4 && name.length <= 30))
        return setError("Skill name should be only 4 to 32 characters");
      // Find duplicate
      const dupe = ProviderInfo.skills.find((skill) => skill.name === name);
      if (dupe === undefined) {
        const skill = ProviderInfo.skills.filter((sk) => sk.name.length > 0);
        skill.push({ name, level });
        ProviderInfoDispatch({
          type: ProviderInfoActionTypes.SETSKILL,
          payload: skill,
        });
      } else {
        return setError("Skill name already added");
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
  const [open, setOpen] = useState(false);
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
          <Input placeholder="Skill Name" ref={skillName} flex={1} />
          <Select ref={levelName} flex={1}>
            {skillLevel.map((level) => {
              return <option value={level}>{level}</option>;
            })}
          </Select>
        </Box>
      )}
      <TableContainer>
        <Table variant="striped" size="lg" border="1px solid gray">
          <Thead>
            <Tr display="flex" alignItems="center">
              <Th flex={1}>Skill</Th>
              <Th flex={1}>Level</Th>
              <Th
                flex={1}
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-around"
              >
                {!open ? (
                  <Button
                    marginRight="auto"
                    variant="base"
                    minW="10em"
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
                        addNewSkill();
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
            {ProviderInfo.skills.map((skill) => {
              if (!(skill.name.length > 0)) return "";
              return (
                <Tr display="flex" alignItems="center">
                  <Td flex={1}>{skill.name}</Td>
                  <Td flex={1}>{skill.level}</Td>
                  <Td
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
                        const skillNameEl = skillName.current;
                        const levelNameEl = levelName.current;

                        if (skillNameEl && levelNameEl) {
                          skillNameEl.value = skill.name;
                          levelNameEl.value = skill.level;
                        }
                      }}
                      icon={<MdEdit />}
                    />
                    <IconButton
                      variant="danger"
                      aria-label="Delete"
                      onClick={() => {
                        const newSkill = ProviderInfo.skills.filter(
                          (skills) => {
                            return skills.name !== skill.name;
                          }
                        );
                        ProviderInfoDispatch({
                          type: ProviderInfoActionTypes.SETSKILL,
                          payload: newSkill,
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

export default SkillTable;
