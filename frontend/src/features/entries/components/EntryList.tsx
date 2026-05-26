import type IEntry from "../../../shared/interfaces/IEntry";
import EntryCard from "./EntryCard";

const TEXTS = {
  empty: "No entries found for this period.",
};

const COLORS = {
  text: {
    secondary: "text-[#6b6b80]",
  },
};

interface Props {
  entries: IEntry[];
  onDuplicate: (entry: IEntry) => void;
  onEdit: (entry: IEntry) => void;
  onRemove: (id: number) => void;
  onRemoveCreditGroup: (creditGroupId: string) => void;
}

const EntryList = ({
  entries,
  onDuplicate,
  onEdit,
  onRemove,
  onRemoveCreditGroup,
}: Props) => {
  if (!entries.length) {
    return <p className={`text-sm ${COLORS.text.secondary}`}>{TEXTS.empty}</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          onDuplicate={onDuplicate}
          onEdit={onEdit}
          onRemove={onRemove}
          onRemoveCreditGroup={onRemoveCreditGroup}
        />
      ))}
    </div>
  );
};

export default EntryList;
