import { useEffect, useRef, useState } from "react";
import useServiceProviderProfile, {
  LanguageType,
  SkillType,
} from "../../hooks/Users/useServiceProviderProfile";
import SkillsTable from "../../partials/ServiceProvider/SkillsTable";
import LanguagesTable from "../../partials/ServiceProvider/LanguagesTable";
import useUpdateServiceProvider from "../../hooks/Users/useUpdateServiceProvider";
import { toast } from "react-toastify";

const EditServiceProviderSettings = ({ username }: { username: string }) => {
  const [error, setError] = useState("");
  const { updateServiceProvider } = useUpdateServiceProvider(username);
  const [isLoading, setIsLoading] = useState(false);
  const { response, success } = useServiceProviderProfile(username);
  const [skills, setSkills] = useState<SkillType[]>();
  const [languages, setLanguages] = useState<LanguageType[]>();
  const [description, setDescription] = useState<string>();
  const [personalWebsite, setPersonalWebsite] = useState<string>();
  const descriptionEl = useRef<HTMLTextAreaElement>(null);
  const personalWebsiteEl = useRef<HTMLInputElement>(null);

  const updateDescription = (desc: string) => {
    setDescription(desc);
  };

  const updatePersonalWebsite = (url: string) => {
    setPersonalWebsite(url);
  };

  const updateSellerInfo = async () => {
    setIsLoading(true);
    // Validate Description
    if (!description || description.length <= 30 || description.length > 600) {
      throw new Error("Description must be 30-600 words long");
    }
    if (skills && languages) {
      // Validate skills and language
      const invalidSkill = skills.find((skill) => skill.name.length === 0);
      const invalidLanguage = languages.find((lang) => lang.name.length === 0);
      if (
        invalidSkill ||
        invalidLanguage ||
        skills.length === 0 ||
        languages.length === 0
      ) {
        throw new Error("Atleast 1 skill and language required");
      }
      return await updateServiceProvider({
        description,
        language: languages,
        skills,
        PersonalWebsite: personalWebsite,
      });
    } else {
      throw new Error("Atleast 1 skill and language required");
    }
  };

  const handleInfoUpdate = async () => {
    try {
      await updateSellerInfo();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (response) {
      setSkills(response.skills);
      setLanguages(response.language);
      setDescription(response.description);
    }
  }, [response]);

  useEffect(() => {
    if (!(error.length === 0))
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        progress: undefined,
        theme: "colored",
      });
    return () => {
      setError("");
    };
  }, [error]);
  if (!success) return "";
  return (
    <article className="card w-full bg-white text-black shadow-xl dark:bg-[#1D283A] dark:text-white mx-auto">
      <div className="card-body">
        <h2 className="card-title mb-8">Edit Service Provider Information</h2>
        <div className="grid sm:grid-cols-2 sm:gap-12">
          <h3 className="text-xl">Description</h3>
          <textarea
            ref={descriptionEl}
            onBlur={(event) => updateDescription(event.currentTarget.value)}
            className="textarea textarea-bordered text-white"
            defaultValue={response?.description}
            placeholder="Bio"
          ></textarea>
          <h3 className="text-xl">Skills</h3>
          {skills && <SkillsTable skills={skills} setSkills={setSkills} />}
          <h3 className="text-xl">Languages</h3>
          {languages && (
            <LanguagesTable languages={languages} setLanguages={setLanguages} />
          )}
          <h3 className="text-xl">Personal Website</h3>
          <input
            ref={personalWebsiteEl}
            type="text"
            name="PersonalWebsite"
            placeholder="Website Url"
            id="PersonalWebsite"
            className="input input-bordered min-w-full"
            defaultValue={response?.PersonalWebsite || ""}
            onBlur={(event) => updatePersonalWebsite(event.currentTarget.value)}
          />
          <button
            type="button"
            className="btn btn-primary w-24 col-start-2 justify-self-end"
            onClick={() => void handleInfoUpdate()}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default EditServiceProviderSettings;
