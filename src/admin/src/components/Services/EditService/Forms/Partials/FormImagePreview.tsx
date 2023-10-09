interface Props {
  id: number;
  url: string;
  handleClick: (id: number) => void;
}

const FormImagePreview = ({ url, handleClick, id }: Props) => {
  return (
    <div className="relative">
      <img src={url} className="aspect-video w-full" />
      <div className="min-w-full flex justify-center items-center py-4">
        <button
          onClick={() => handleClick(id)}
          type="button"
          className="btn bg-red-700 hover:bg-red-800 text-white m-1  btn-sm w-[8rem]"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FormImagePreview;
