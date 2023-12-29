import React from "react";
import Note from "./Note";

interface NoteListProps {
  notes: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  return (
    <ul className="flex flex-wrap gap-4 mt-8 justify-center bg-white p-4 rounded-lg">
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  );
};

export default NoteList;
