import { NoteType } from "../lib/fns/notesTable";

let url = "https://bjpf2y2ss9.execute-api.us-east-1.amazonaws.com/notes";

export const getNotes = async () => {
  const result = await fetch(url);
  return await result.json();
};

export const saveNote = async (note: NoteType) => {
  await fetch(url),
    {
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" },
      method: "POST",
      mode: "cors",
    };
};
