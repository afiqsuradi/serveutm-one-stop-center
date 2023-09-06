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
import { useEffect, useRef, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Skill, skillLevel } from "../../hooks/useUserProfile";

interface Props {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}

const SkillTable = ({ skills, setSkills }: Props) => {
  const [error, setError] = useState("");
  const toast = useToast();
  const skillName = useRef<HTMLInputElement>(null);
  const levelName = useRef<HTMLSelectElement>(null);

  const addNewSkill = () => {
    if (skillName.current?.value && levelName.current?.value) {
      const name = skillName.current?.value;
      const level = levelName.current?.value;
      if (!(name.length >= 4 && name.length <= 30))
        return setError("Skill name should be only 4 to 32 characters");
      setSkills(
        (prevSkills: Skill[]) => [...prevSkills, { name, level }] as Skill[]
      );
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
    <Box>
      {!open ? (
        ""
      ) : (
        <Box display="flex" justifyContent="space-between" gap={3} paddingY="3">
          <Input placeholder="Skill Name" ref={skillName} />
          <Select ref={levelName}>
            {skillLevel.map((level) => {
              return <option value={level}>{level}</option>;
            })}
          </Select>
        </Box>
      )}
      <TableContainer flex={2}>
        <Table variant="striped" size="lg" border="1px solid gray">
          <Thead>
            <Tr display="flex" alignItems="center">
              <Th flex={1}>Skill</Th>
              <Th flex={1}>Level</Th>
              <Th flex={1} display="flex" justifyContent="space-around">
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
            {skills.map((skill) => {
              return (
                <Tr display="flex" alignItems="center">
                  <Td flex={1}>{skill.name}</Td>
                  <Td flex={1}>{skill.level}</Td>
                  <Td flex={1} display="flex" justifyContent="center" gap="4em">
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
                        setSkills((prevSkills: Skill[]) => {
                          return prevSkills.filter(
                            (skillData) => !(skillData.name === skill.name)
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

export default SkillTable;
