import { useRef } from "react";
import useProfile from "../../hooks/useProfile";
import useUploadImage from "../../hooks/useUploadImage";
import { useAuth } from "../../hooks/useAuth";

const ProfilePhoto = ({ username }: { username: string }) => {
  const { Auth } = useAuth();
  const imageInput = useRef<HTMLInputElement>(null);
  const { uploadProfile } = useUploadImage();
  const { response } = useProfile(username, [Auth.accessToken]);
  return (
    <div className="card card-side shadow-xl bg-white text-black dark:bg-[#1D283A] dark:text-white flex-wrap md:flex-nowrap justify-center min-w-full">
      <figure>
        <div className="avatar items-center">
          <div className="w-24 h-24 rounded-full mx-4 my-4 md:my-1">
            <img src={response?.profileImage} />
          </div>
        </div>
      </figure>
      <div className="card-body flex-row gap-8 items-center  flex-wrap md:flex-nowrap justify-center">
        <div>
          <h2 className="card-title">Upload a new photo</h2>
          <p>Larger image will be resized automatically.</p>
        </div>
        <div>
          <input
            ref={imageInput}
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={(event) => {
              if (event.target.files) {
                void uploadProfile(event.target.files);
              }
            }}
            hidden
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              if (imageInput.current) {
                imageInput.current.click();
              }
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;
