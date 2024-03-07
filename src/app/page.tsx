import AddNote from "./components/AddNote";
import NoteList from "./components/NoteList";

async function getData() {
  const res = await fetch("https://add-notes-wheat.vercel.app/api/post", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Home = async () => {
  const notes = await getData();

  return (
    <main>
      <AddNote />
      <section>
        <NoteList notes={notes} />
      </section>
    </main>
  );
};

export default Home;
