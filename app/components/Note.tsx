"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface NoteProps {
  note: {
    id: string;
    title: string;
    description: string;
  };
}

const Note: React.FC<NoteProps> = ({ note }) => {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(note);

  const editForm = () => {
    setVisibility((visibility) => !visibility);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .patch(`/api/post/${note.id}`, noteToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        router.refresh();
        setVisibility((visibility) => !visibility);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNoteToEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeleteNote = (id: string) => {
    axios
      .delete(`/api/post/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        router.refresh();
      });
  };

  return (
    <div>
      <li
        className="card w-80 bg-base-100 text-primary-content shadow-2xl border p-4"
        key={note.id}
      >
        <div className="card-body ">
          <h2 className="card-title font-bold ">{note.title}</h2>
          <p className="mb-3 text-gray-500">{note.description}</p>
        </div>
        <div className="pt-5">
          <button
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={(e) => editForm()}
          >
            Edit
          </button>

          <button
            onClick={() => handleDeleteNote(note.id)}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Delete
          </button>

          {visibility && (
            <div>
              <h2 className="text-center">Update Note</h2>
              <form
                onSubmit={handleEditSubmit}
                className="p-4 bg-warning mt-1 rounded-lg flex-col"
              >
                <div>
                  <input
                    value={noteToEdit.title || ""}
                    onChange={handleChange}
                    className="p-4 w-full outline-none"
                    type="text"
                    id="title"
                  />
                </div>
                <div>
                  <input
                    value={noteToEdit.description || ""}
                    onChange={handleChange}
                    name="description"
                    className="p-4 w-full mt-3 outline-none"
                    type="text"
                    id="description"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-sm mr-3 bg-lime-700 mt-2 p-2 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() => setVisibility((visibility) => !visibility)}
                  className="btn btn-sm mr-3 bg-rose-600 mt-2 p-2 rounded-md"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </li>
    </div>
  );
};

export default Note;
