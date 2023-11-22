import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  SkillLevel,
  SkillLevelType,
  SkillType,
} from "../../hooks/Users/useServiceProviderProfile";

interface Props {
  skills: SkillType[];
  setSkills: React.Dispatch<React.SetStateAction<SkillType[] | undefined>>;
}

const SkillsTable = ({ skills, setSkills }: Props) => {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");
  const skillName = useRef<HTMLInputElement>(null);
  const levelName = useRef<HTMLSelectElement>(null);

  const addNewSkill = () => {
    if (skillName.current?.value && levelName.current?.value) {
      const name = skillName.current?.value;
      const level = levelName.current?.value as SkillLevelType;
      if (!(name.length >= 4 && name.length <= 30))
        return setError("Skill name should be only 4 to 32 characters");
      //   // Find duplicate
      const dupe = skills.find((skill) => skill.name === name);
      if (dupe === undefined) {
        setSkills([...skills, { name, level }]);
      } else {
        return setError("Skill name already added");
      }
    }
  };

  const deleteSkill = (name: string) => {
    const newSkill = skills.filter((skill) => skill.name != name);
    setSkills(newSkill);
  };

  const editSkill = (name: string, level: SkillLevelType) => {
    setOpen(true);
    if (skillName.current && levelName.current) {
      skillName.current.value = name;
      levelName.current.value = level;
    }
  };

  const toggleOptionOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!(error.length === 0)) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        progress: undefined,
        theme: "colored",
      });
    }
    return () => {
      setError("");
    };
  }, [error]);
  return (
    <div className="overflow-x-auto">
      <div
        className={`grid sm:grid-cols-2 gap-4 sm:gap-8 ${open ? "" : "hidden"}`}
      >
        <input
          ref={skillName}
          type="text"
          name="name"
          placeholder="Skill Name"
          id="name"
          className="input input-bordered min-w-full"
        />
        <select ref={levelName} className="select select-bordered w-full">
          {SkillLevel.map((level) => (
            <option key={level}>{level}</option>
          ))}
        </select>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Skill</th>
            <th>Level</th>
            <th>
              {open ? (
                <>
                  <button
                    className="btn btn-primary btn-sm m-1 w-24"
                    onClick={addNewSkill}
                  >
                    Save
                  </button>
                  <button
                    className="btn bg-red-700 hover:bg-red-800 btn-sm m-1 w-24 text-white"
                    onClick={toggleOptionOpen}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary w-24"
                  onClick={toggleOptionOpen}
                >
                  Add New
                </button>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {skills.map((skill) => (
            <tr key={skill.name}>
              <td>{skill.name}</td>
              <td>{skill.level}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm m-1 w-24"
                  onClick={() => {
                    editSkill(skill.name, skill.level);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn bg-red-700 hover:bg-red-800 btn-sm m-1 w-24 text-white"
                  onClick={() => {
                    deleteSkill(skill.name);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillsTable;
