import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  notes: string;
  setNotes: (notes: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const NotesForm = ({ notes, setNotes, setIsOpen }: Props) => {
  const onNoteChane = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const onDelete = () => {
    setNotes("");
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        onChange={onNoteChane}
        defaultValue={notes}
        className="resize-none"
        rows={8}
        placeholder="Leave a notes to your service provider"
      />
      <Button variant={"destructive"} className="w-full" onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
};

export default NotesForm;
