import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  LanguageLevel,
  LanguageLevelType,
  LanguageType,
} from "../../hooks/Users/useServiceProviderProfile";
import wikipediaLanguages from "../../constants/languages";

interface Props {
  languages: LanguageType[];
  setLanguages: React.Dispatch<
    React.SetStateAction<LanguageType[] | undefined>
  >;
}

const LanguagesTable = ({ languages, setLanguages }: Props) => {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");
  const languageName = useRef<HTMLSelectElement>(null);
  const levelName = useRef<HTMLSelectElement>(null);

  const addNewLanguage = () => {
    if (languageName.current?.value && levelName.current?.value) {
      const name = languageName.current?.value;
      const level = levelName.current?.value as LanguageLevelType;
      if (!(name.length >= 4 && name.length <= 30))
        return setError("Skill name should be only 4 to 32 characters");
      //   // Find duplicate
      const dupe = languages.find((language) => language.name === name);
      if (dupe === undefined) {
        setLanguages([...languages, { name, level }]);
      } else {
        return setError("Skill name already added");
      }
    }
  };

  const deleteLanguage = (name: string) => {
    const newLanguage = languages.filter((language) => language.name != name);
    setLanguages(newLanguage);
  };

  const editLanguage = (name: string, level: LanguageLevelType) => {
    setOpen(true);
    if (languageName.current && levelName.current) {
      languageName.current.value = name;
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
        <select ref={languageName} className="select select-bordered w-full">
          {wikipediaLanguages.map((lang) => (
            <option key={lang.code}>{lang.name}</option>
          ))}
        </select>
        <select ref={levelName} className="select select-bordered w-full">
          {LanguageLevel.map((level) => (
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
                    onClick={addNewLanguage}
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
          {languages.map((language) => (
            <tr key={language.name}>
              <td>{language.name}</td>
              <td>{language.level}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm m-1 w-24"
                  onClick={() => {
                    editLanguage(language.name, language.level);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn bg-red-700 hover:bg-red-800 btn-sm m-1 w-24 text-white"
                  onClick={() => {
                    deleteLanguage(language.name);
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

export default LanguagesTable;
