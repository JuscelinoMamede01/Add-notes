"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddNote = () => {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);

  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/api/post", inputs)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInputs({});
        router.refresh();
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <section className="bg-white mt-6 p-4 rounded-lg">
      <form
        className="flex flex-col gap-4 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <h1 className=" pb-3 text-center font-extrabold text-5xl">
          Add New Note
        </h1>

        <input
          type="text"
          placeholder="Title"
          name="title"
          className="input input-bordered input-sm w-full max-w-md m-auto border px-4"
          value={inputs.title || ""}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Description"
          name="description"
          className="input input-bordered input-sm w-full max-w-md m-auto border px-4"
          value={inputs.description || ""}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-20"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddNote;
